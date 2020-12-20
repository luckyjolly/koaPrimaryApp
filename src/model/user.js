import mongoose from '../config/DBhelper'

let Schema = mongoose.Schema // 对于mongoose，一切都是从schema中推导出来的，schema 定义数据结构、

let UserSchema = new Schema({
  'username': { type: String },
  'name': {type: String},
  'password': { type: String }
})

let UserModel = mongoose.model('users', UserSchema) // modle 创建和连接集合

export default UserModel
