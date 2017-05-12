/*
 BoxCastPlayerMetrics.js
 BoxCast tvOS/TVML SDK

 Copyright (c) 2017 BoxCast. All rights reserved.
*/
import './polyfill';
import Promise from 'bluebird';
import fetch from './fetch';

export const BoxCastData = require('./BoxCastData').default;
export const BoxCastPlayer = require('./BoxCastPlayer').default;
export const BoxCastPlayerMetrics = require('./BoxCastPlayerMetrics').default;
export const vendor = {
  Promise,
  fetch
};