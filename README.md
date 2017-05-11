# boxcast-sdk-tvos
The BoxCast SDK for tvOS/TVML video playback allows you to develop your own tvOS TVML applications to watch content from your (BoxCast)[https://www.boxcast.com] account.

## Installation

```
npm install boxcast-sdk-tvos --save
```

## Usage

Import the module and initialize constants
```
import { BoxCastData, BoxCastPlayerMetrics } from 'boxcast-sdk-tvos';

const YOUR_CHANNEL_ID = ' TODO: fill in from dashboard ';
const YOUR_APP_NAME = ' TODO: unique identifier used for analytics ';
```

List broadcasts that are currently live...
```
var api = new BoxCastData();
api.getLiveBroadcasts(YOUR_CHANNEL_ID).then((broadcasts) => {
    ... 
    // for each broadcast in broadcasts, note the
    // broadcast.id, broadcast.name, broadcast.description, broadcast.preview
});
```

... or VOD
```
api.getArchivedBroadcasts(YOUR_CHANNEL_ID).then((broadcasts) => {
    ...
    // for each broadcast in broadcasts, note the
    // broadcast.id, broadcast.name, broadcast.description, broadcast.preview
});
```

When ready to watch a broadcast, grab the "view" that will contain a playlist for live or on-demand content.  Note: the `view.playlist` will not exist for future content or for broadcasts that were missed.
```
api.getBroadcastView(broadcast.id).then((view) => {
    var player = new Player(),
        playlist = new Playlist(),
        mediaItem = new MediaItem("video", view.playlist);
    player.playlist = playlist;
    player.playlist.push(mediaItem);

    var metrics = new BoxCastPlayerMetrics(broadcast, view, {HOSTNAME: YOUR_APP_NAME});
    metrics.attach(player);

    player.present();
});
```

The SDK also exposes vendor libraries (Bluebird Promise polyfill, fetch polyfill) for your use as needed.
```
import { vendor } from 'boxcast-sdk-tvos';
const { Promise, fetch } = vendor;
```

## Known Limitations

* This SDK is for viewing and querying of broadcasts on accounts that do not protect their content with geoblocking, passwords, pay-per-view ticketing, host restrictions or other authentication means.  The BoxCast API will reject requests for such content, so you should be prepared to handle errors using the `.catch((err) => { ... })` method of the data promises.

## Changelog

* v1.0.0: Initial version
