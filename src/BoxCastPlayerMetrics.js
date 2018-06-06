/*
 BoxCastPlayerMetrics.js
 BoxCast tvOS/TVML SDK

 Copyright (c) 2017 BoxCast. All rights reserved.
*/

import fetch from './fetch';

const DEFAULT_METRICSBASEURL = 'https://metrics.boxcast.com/';
const DEFAULT_HOSTNAME = 'BoxCast.tv for AppleTV';

export default class BoxCastPlayerMetrics {
  constructor(broadcast, broadcastView, options = {}) {
    this._broadcast = broadcast;
    this._broadcastView = broadcastView;
    this._baseUrl = options.METRICSBASEURL || DEFAULT_METRICSBASEURL;
    this._hostName = options.HOSTNAME || DEFAULT_HOSTNAME;
    this._viewId = this.getUniqueViewID();
    this._viewerId = this.getViewerID();
    this._currentPosition = 0;
    this._duration = 0;
    this._lastPlayTime = null;
    this._fetch = fetch;
  }

  attach(player) {
    // since the playhead position is not accessible as a property of the player, use the
    // timeDidChange event once a second to keep the current position.
    player.addEventListener("timeDidChange", (event) => {
      this._currentPosition = event.time;
    }, {interval: 1});

    // Post the setup action. We don't browser info per-se, but we use the Device information.
    this.postAction("setup", {
      user_agent: `BoxCastTV/${Device.appVersion} (tvOS; ${Device.appIdentifier} ${Device.appVersion}; ${Device.model}; ${Device.productType}; ${Device.systemVersion}; ${Device.vendorIdentifier})`,
      platform: 'tvOS',
      browser_name: 'tvOS',
      os: 'tvOS',
      browser_version: Device.systemVersion,
      model: Device.model,
      product_type: Device.productType,
      system_version: Device.systemVersion,
      vendor_identifier: Device.vendorIdentifier,
      player_version: Device.appVersion,
      host: this._hostName,
      language: '',
      remote_ip: '',
    });

    // Use the stateDidChange event to track play and pause.
    player.addEventListener("stateDidChange", (event) => {
      var action = null;
      if (event.state === "playing") {
        action = "play";
        this._lastPlayTime = Date.now() / 1000.0;
      } else if ((event.state === "paused") || (event.state === "loading") || (event.state === "end")) {
        if ((event.state === "paused") || (event.state === "end")) {
          action = "pause";
        } else if (event.state === "loading") {
          action = "buffer";
        }
        if (this._lastPlayTime) {
          this._duration += (Date.now() / 1000.0) - this._lastPlayTime;
        }
        this._lastPlayTime = null;
      }
      if (action) {
        this.postAction(action);
      }
    });

    // Use the requestSeekToTime event to track seek events.
    player.addEventListener("requestSeekToTime", (event) => {
      this.postAction("seek", {offset: event.requestedTime});
    });

    // Bind another timeDidChange handler to log time events every 60 seconds.
    player.addEventListener("timeDidChange", (event) => {
      this.postAction("time", {position: event.time});
    }, {interval: 60});

    // Use the mediaItemDidChange event with reason === 1 (playedToEndOfMediaItem) to log the
    // complete event.
    player.addEventListener("mediaItemDidChange", (event) => {
      if (event.reason === 1) {
        if (this._lastPlayTime) {
          this._duration += (Date.now() / 1000.0) - this._lastPlayTime;
        }
        this._lastPlayTime = null;
        this.postAction("complete");
      }
    });
  }

  getViewerID() {
    var viewerId = localStorage.getItem("viewer-id");
    if (!viewerId) {
      viewerId = this.getUniqueViewID();
      localStorage.setItem("viewer-id", viewerId);
    }
    return viewerId;
  }

  getUniqueViewID() {
    var r = function(n) {
      var text = "",
        possible = "0123456789ABCDEF";
      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };
    return r(8) + "-" + r(4) + "-" + r(4) + "-" + r(4) + "-" + r(12);
  }

  postAction(action, data) {
    var duration = this._duration;
    if (this._lastPlayTime) {
      duration += (Date.now() / 1000.0) - this._lastPlayTime;
    }
    var s = this._broadcastView.status;
    var isLive = s.indexOf('live')>=0 || s.indexOf('stalled')>=0 || s.indexOf('prepared')>=0;
    var mergedData = {
      is_live: isLive,
      account_id: this._broadcast.account_id,
      broadcast_id: this._broadcast.id,
      channel_id: this._broadcast.channel_id,
      view_id: this._viewId,
      viewer_id: this._viewerId,
      position: this._currentPosition,
      duration: duration,
      timestamp: (new Date()).toISOString()
    };
    if (data) {
      Object.getOwnPropertyNames(data).forEach((p) => { mergedData[p] = data[p]; });
    }
    this.postMetrics(action, mergedData);
  }

  postMetrics(action, data) {
    var postData = {action: action};
    Object.getOwnPropertyNames(data).forEach((p) => {
      postData[p] = data[p];
    });
    return this._fetch(`${this._baseUrl}player/interaction`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
  }
}

