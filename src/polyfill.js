/*
 polyfill.js
 BoxCast tvOS/TVML SDK

 Copyright (c) 2017 BoxCast. All rights reserved.
*/
if (!String.prototype.encodeHTML) {
  String.prototype.encodeHTML = function () {
    return this.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&apos;');
  };
}

if (!Array.prototype.equals) {
  Array.prototype.equals = function(other) {
    if (this === other) return true;
    if (other == null) return false;
    if (this.length != other.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < this.length; ++i) {
      if (this[i] !== other[i]) return false;
    }
    return true;
  };
}