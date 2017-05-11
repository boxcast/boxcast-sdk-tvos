# boxcast-sdk-tvos
BoxCast SDK for tvOS/TVML video playback

## Installation

```
npm install boxcast-sdk-tvos
```

## Usage

Import module and initialize constants
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

When ready to play a broadcast...
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

The SDK also exposes vendor libraries (Bluebird Promise polyfill, fetch polyfill) for your use as needed
```
import { vendor } from 'boxcast-sdk-tvos';
const { Promise, fetch } = vendor;
```

## Changelog

* v1.0.0: Initial version
