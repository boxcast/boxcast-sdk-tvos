
describe('BoxCast SDK for tvOS', function () {
  it('should export data, metrics and vendor classes', function () {
  	const { BoxCastData, BoxCastPlayerMetrics, vendor } = require('../src');
    expect(BoxCastData).toBeTruthy();
    expect(BoxCastPlayerMetrics).toBeTruthy();
    expect(vendor.Promise).toBeTruthy();
    expect(vendor.fetch).toBeTruthy();
  });
});
