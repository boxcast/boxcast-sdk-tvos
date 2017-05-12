/*
 BoxCastPlayer.js
 BoxCast tvOS/TVML SDK

 Copyright (c) 2017 BoxCast. All rights reserved.
*/

import BoxCastPlayerMetrics from './BoxCastPlayerMetrics';
import BoxCastData from './BoxCastData';

export default class BoxCastPlayer {
	constructor(broadcast, options={}) {
		this._broadcast = broadcast;
		this._options = options;
		this._api = new BoxCastData(options);
	}

	present() {
		return this._api.getBroadcastView(this._broadcast.id).then((view) => {
			if (!view.playlist) {
				throw `This broadcast is unavailable for viewing. The status is ${view.status}`;
			}
		    var player = new Player(),
		        playlist = new Playlist(),
		        mediaItem = new MediaItem("video", view.playlist);
		    player.playlist = playlist;
		    player.playlist.push(mediaItem);

		    var metrics = new BoxCastPlayerMetrics(broadcast, view, this._options);
		    metrics.attach(player);

		    player.present();

		    return player;
		});
	}
}