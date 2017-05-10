/*
 BoxCastData.js
 BoxCast tvOS/TVML SDK

 Copyright (c) 2017 BoxCast. All rights reserved.
*/
import fetch from './fetch';
import { textToQuery } from './search-query';

const DEFAULT_APIBASEURL = 'https://api.boxcast.com/';


export default class BoxCastData {

  constructor(options) {
    this._apibaseurl = options.APIBASEURL || DEFAULT_APIBASEURL;
  }

  findBroadcasts(channelId, query) {
    // Need to clean up the text querystring into something that would
    // make sense for the user based on the API's query DSL.
    query = textToQuery(query);
    return fetch(`${this._options.APIBASEURL}channels/${channelId}/broadcasts?q=${encodeURIComponent(query)}&s=-starts_at&l=100&p=0`)
              .then(parseJSON)
              .then((bs) => bs.map(fixBroadcast));
  }

  getLiveBroadcasts(channelId) {
    return this.findBroadcasts(channelId, 'timeframe:current');
  }

  getArchivedBroadcasts(channelId) {
    return this.findBroadcasts(channelId, 'timeframe:past');
  }

  getBroadcast(broadcastId) {
    return fetch(`${this._apibaseurl}broadcasts/${broadcastId}`)
            .then(parseJSON)
            .then(fixBroadcast);
  }

  getBroadcastView(broadcastId) {
    return fetch(`${this._options.APIBASEURL}broadcasts/${broadcastId}/view`).then(parseJSON);
  }
}


function parseJSON(response) {
  return response.json();
}

function fixBroadcast(broadcast) {
  broadcast.preview = ensureHttpOnProtocolRelativeUrl(broadcast.preview || '').replace(/ /g, '%20');
  return broadcast;
}

// if a url is passed as a protocol-relative url (e.g. "//uploads.boxcast.com/foo.jpg"), make
// sure to preprend a protocol.
function ensureHttpOnProtocolRelativeUrl(url) {
  if (url.startsWith('//')) {
    url = 'http:' + url;
  }
  return url;
}

