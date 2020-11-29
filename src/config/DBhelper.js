import mongoose from 'mongoose'
import config from './index'

console.log('config: ', config);
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + config.DB_URL)
})

mongoose.connection.on('error', () => {
  console.log('Mongoose connection error: ' + err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

export default mongoose