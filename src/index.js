// const Koa = require('koa');
import Koa from 'koa'
const path = require('path');
const helmet = require('koa-helmet');//安全headers
const Static = require('koa-static');
import router from './router/router'
import KoaJson from 'koa-json'
import koaBody from 'koa-body'
import KoaCompose from 'koa-compose'
import Cors from '@koa/cors'
import koaCompress from 'koa-compress'

const app = new Koa();
const isDevMode = process.env.NODE_ENV === 'production' ? false : true;

// app.use(helmet());
// app.use(static(__dirname));//访问根目录下所有文件
// app.use(Static(path.join(__dirname, './static')));//访问static目录

const middleware = KoaCompose([
  koaBody(),
  Cors(),
  KoaJson({pretty: false, param: 'pretty'}),
  helmet(),
  Static(path.join(__dirname, './static'))
]);

if(!isDevMode){
  koaCompress(koaCompress());//压缩koa的中间件
}

app.use(middleware);
app.use(router());

app.listen(3000);
