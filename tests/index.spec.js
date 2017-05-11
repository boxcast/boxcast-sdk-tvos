
describe('BoxCast SDK for tvOS', function () {
  it('should export data and metrics classes', function () {
  	const { BoxCastData, BoxCastPlayerMetrics } = require('../src');
    expect(BoxCastData).toBeTruthy();
    expect(BoxCastPlayerMetrics).toBeTruthy();
  });
});
