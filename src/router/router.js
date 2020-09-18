const combineRouters = require('koa-combine-routers');

import publicRouter from './publicRouter';

module.exports = combineRouters(publicRouter);