import mongoose from '../config/DBhelper'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String }
})

const UserModels = mongoose.model('users', UserSchema)

export default UserModels
