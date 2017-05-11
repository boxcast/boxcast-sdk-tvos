import BoxCastData from '../src/BoxCastData';
import Promise from 'bluebird';

describe('BoxCastData', function () {
  var api = new BoxCastData();

  beforeEach(function() {
  	api._fetch = jest.fn();
  })

  function mockFetch(result) {
  	api._fetch.mockReturnValue(new Promise((res, rej) => res({json: () => result})));	
  }

  it('should default to hitting production api', function() {
    expect(api._apibaseurl).toBe('https://api.boxcast.com/');
  });

  it('should search for live broadcasts', function(done) {
  	mockFetch([{id: 1000}]);
  	api.getLiveBroadcasts('channel1000').then((result) => {
	  expect(result.length).toBe(1);
	  expect(result[0].id).toBe(1000);
	  done();
  	}).catch(done);
  });

  it('should search for archived broadcasts', function(done) {
  	mockFetch([{id: 1000}]);
  	api.getArchivedBroadcasts('channel1000').then((result) => {
	  expect(result.length).toBe(1);
	  expect(result[0].id).toBe(1000);
	  done();
  	}).catch(done);
  });

  it('should search for broadcast and fix legacy preview urls', function(done) {
  	mockFetch([{id: 1000, preview: '//example.org/img.png'}]);
  	api.getBroadcast('b1000').then((result) => {
	  expect(result.id).toBe(1000);
	  expect(result.preview).toBe('http://example.org/img.png');
	  done();
  	}).catch(done);
  });
});
