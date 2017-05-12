import './_mock';
import BoxCastPlayer from '../src/BoxCastPlayer';
import Promise from 'bluebird';

describe('BoxCastPlayer', function () {
  // Mock TVML built-ins
  global.Player = jest.fn();
  global.Playlist = jest.fn();
  global.MediaItem = jest.fn();

  var broadcast = {id: 1000};
  var player = new BoxCastPlayer(broadcast, {HOSTNAME: 'My App for tvOS'});
  player._api = {getBroadcastView: jest.fn()};

  it('should reject the request if the playlist is not availble', function() {
    player._api.getBroadcastView.mockReturnValue(new Promise((res, rej) => res({json: () => {playlist: ''}})));
    return expect(player.present()).rejects.toMatch('broadcast is unavailable');
  });

  it('should initialize a player if the playlist is available', function() {
    player._api.getBroadcastView.mockReturnValue(new Promise((res, rej) => res({json: () => {playlist: 'http://cdn.example.com/all.m3u8'}})));
    return expect(player.present()).rejects.toMatch('broadcast is unavailable');
  });
});
