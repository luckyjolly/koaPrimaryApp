import { getValue } from '../config/RedisConfig'

let checkCode = async (key, value) => {
  const redisData = await getValue(key)
  if (redisData) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true
    }
  }
  return
}

export {
  checkCode
}