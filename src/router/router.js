const combineRouters = require('koa-combine-routers');

import demoRouter from './demoRouter';

module.exports = combineRouters(demoRouter);