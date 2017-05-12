<a href="https://www.boxcast.com" target="_blank"><img src="https://www.boxcast.com/hs-fs/hub/484866/file-2483746126-png/Logos/NewBoxCastLogo.png?t=1494524438771" height="25"></a>&nbsp;<a href="https://developer.apple.com/go/?id=apple-tv-markup-language-reference" target="_blank"><img src="https://developer.apple.com/library/content/Resources/1260/Images/apple_developer_header_2x.png" height="25"></a>

[![Build Status](https://travis-ci.org/boxcast/boxcast-sdk-tvos.svg?branch=master)](https://travis-ci.org/boxcast/boxcast-sdk-tvos)&nbsp;[![npm version](https://badge.fury.io/js/boxcast-sdk-tvos.svg)](https://badge.fury.io/js/boxcast-sdk-tvos)

# boxcast-sdk-tvos

The [BoxCast](https://www.boxcast.com) SDK for tvOS/TVML video playback allows you to develop your own tvOS TVML applications to watch content from your BoxCast account.

The SDK provides a set of [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-based methods for querying data from your account and a method of attaching to a native [tvOS Player](https://developer.apple.com/reference/tvmljs/player) in order to provide viewer analytics back to your BoxCast account.

## Installation

```
npm install boxcast-sdk-tvos --save
```

## Usage

Import the module and initialize constants.
```javascript
const { BoxCastData, BoxCastPlayer } = require('boxcast-sdk-tvos');

const YOUR_CHANNEL_ID = ' TODO: fill in from dashboard ';
const YOUR_APP_NAME = ' TODO: unique identifier used for analytics ';
```

List broadcasts that are currently live...
```javascript
var api = new BoxCastData();
api.getLiveBroadcasts(YOUR_CHANNEL_ID).then((broadcasts) => {
    ... 
    // for each broadcast in broadcasts, note the
    // broadcast.id, broadcast.name, broadcast.description, broadcast.preview
});
```

... or VOD.
```javascript
api.getArchivedBroadcasts(YOUR_CHANNEL_ID).then((broadcasts) => {
    ...
    // for each broadcast in broadcasts, note the
    // broadcast.id, broadcast.name, broadcast.description, broadcast.preview
});
```

When ready to watch a broadcast, simply initialize a player for the broadcast and call the `present`
method, which will request the playlist from the BoxCast API and present a native tvOS player if available.
```javascript
var player = new BoxCastPlayer(broadcast, {HOSTNAME: YOUR_APP_NAME});
player.present()
    .then((tvOSPlayerInstance) => { ... })
    .catch((errorMessage) => { ... });
```

The SDK also exposes vendor libraries (Bluebird Promise polyfill, fetch polyfill) for your use as needed.
```javascript
import { vendor } from 'boxcast-sdk-tvos';
const { Promise, fetch } = vendor;
```

## Known Limitations

* This SDK is for viewing and querying of broadcasts on accounts that do not protect their content with pay-per-view ticketing, host restrictions, geoblocking, passwords, or other authentication means.  The BoxCast API will reject requests for such content, so you should be prepared to handle errors using the `.catch((err) => { ... })` method of the data promises.

## Changelog

* v1.0.0: Initial version
* v1.1.0: Add shortcut for initializing Player for broadcast with metrics service already attached
