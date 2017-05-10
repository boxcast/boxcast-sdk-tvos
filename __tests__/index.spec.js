const { BoxCastData, BoxCastPlayerMetrics } = require('../src');

describe('BoxCast Public Modules', function () {
  it('should be an amazing module', function () {
    expect(BoxCastData).toBeTruthy();
    expect(BoxCastPlayerMetrics).toBeTruthy();
  });
});
