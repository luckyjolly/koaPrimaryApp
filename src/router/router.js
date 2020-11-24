const combineRouters = require('koa-combine-routers')

import publicRouter from './publicRouter'
import loginRouter from './loginRouter'

module.exports = combineRouters(publicRouter, loginRouter)