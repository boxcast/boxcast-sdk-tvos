import './_mock';
import BoxCastPlayerMetrics from '../src/BoxCastPlayerMetrics';
import Promise from 'bluebird';

describe('BoxCastPlayerMetrics', function () {
  var broadcast = {id: 1000};
  var view = {status: 'live', playlist: 'http://cdn.example.com/all.m3u8'};
  var metrics = new BoxCastPlayerMetrics(broadcast, view);
  metrics._fetch = jest.fn();
  metrics._fetch.mockReturnValue(new Promise((res, rej) => res({}))); 
  var player = jest.fn();

  it('should default to hitting production metrics server', function() {
    expect(metrics._baseUrl).toBe('https://metrics.boxcast.com/');
  });

  it('should restore the viewer ID from localStorage and generate a new view ID for each instance', function() {
    var metrics2 = new BoxCastPlayerMetrics(broadcast, view);
    expect(metrics._viewerId).toBe(metrics2._viewerId);
    expect(metrics._viewId).not.toBe(metrics2._viewId);
  });
});
