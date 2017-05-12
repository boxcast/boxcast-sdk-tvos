import { BoxCastData, BoxCastPlayer, BoxCastPlayerMetrics, vendor } from '../src';

describe('BoxCast SDK for tvOS', function () {
  it('should export data, player, metrics and vendor classes', function () {
    expect(BoxCastData).toBeTruthy();
    expect(BoxCastPlayer).toBeTruthy();
    expect(BoxCastPlayerMetrics).toBeTruthy();
    expect(vendor.Promise).toBeTruthy();
    expect(vendor.fetch).toBeTruthy();
  });
});
