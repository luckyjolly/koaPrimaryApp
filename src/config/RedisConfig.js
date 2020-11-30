import redis from 'redis'
import { promisify, promisifyAll } from 'bluebird'
import config from './index'
import { cli } from 'webpack';

const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  password: config.REDIS.password,
  detect_buffer: true,
  retry_startegy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted'); // 重启次数用尽
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000); // 返回数字，代表在多少毫秒后尝试
  }
}

const client = promisifyAll(redis.createClient(options))

client.on('error', err => {
  console.log('Redis Client Error: ', err)
})

const setValue = (key, value, time) => {
  if (!value && value !== 0) {
    return;
  }
  if (typeof value === 'object') {// 存为hash
    Object.keys(value).forEach(item => {

      // hash的结构：key,field,value,以下是将hash表key中的域field设置为value[item]
      client.hset(key, item, value[item], redis.print) // redis.print打印redis返回的日志
    })
  } else {
    if (time) {
      client.set(key, value, 'EX', time) // 设置过期时间
    } else {
      client.set(key, value)
    }
  }
}

// node >= v8
// const { promisify } = require('util')
// const getAsync = promisify(client.get).bind(client)

const getValue = key => {
  return client.getAsync(key)
}

const getHValue = key => {

  // return promisify(client.hgetall).bind(client)(key)
  return client.hgetallAsync(key)
}

const delValue = key => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successful')
    } else {
      console.log('delete redis key error:' + err)
    }
  })
}

export {
  setValue,
  getValue,
  getHValue,
  delValue
}
