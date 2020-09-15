// const Koa = require('koa');
import Koa from 'koa'
const path = require('path');
const helmet = require('koa-helmet');//安全headers
const Static = require('koa-static');
const router = require('./router/router');

const app = new Koa();

app.use(helmet());
app.use(router());
// app.use(static(__dirname));//访问根目录下所有文件
app.use(Static(path.join(__dirname, './static')));//访问static目录


app.listen(3000);
