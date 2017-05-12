
describe('BoxCast SDK for tvOS', function () {
  it('should export data, player, metrics and vendor classes', function () {
  	const { BoxCastData, BoxCastPlayer, BoxCastPlayerMetrics, vendor } = require('../src');
    expect(BoxCastData).toBeTruthy();
    expect(BoxCastPlayer).toBeTruthy();
    expect(BoxCastPlayerMetrics).toBeTruthy();
    expect(vendor.Promise).toBeTruthy();
    expect(vendor.fetch).toBeTruthy();
  });
});
