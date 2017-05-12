/*
 BoxCastPlayerMetrics.js
 BoxCast tvOS/TVML SDK

 Copyright (c) 2017 BoxCast. All rights reserved.
*/
import './polyfill';

import Promise from 'bluebird';
import fetch from './fetch';

module.exports = {
	BoxCastData: require('./BoxCastData'),
	BoxCastPlayer: require('./BoxCastPlayer'),
	BoxCastPlayerMetrics: require('./BoxCastPlayerMetrics'),
	vendor: {
		Promise,
		fetch
	}
};