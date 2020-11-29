import User from './test'

// 增
const user = {
  name: 'Jolly',
  age: 29,
  email: '860194716@qq.com'
}

const insertMethods = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result)
}

// 查
const findMethods = async () => {
  const result = await User.find()
  console.log(result)
}

// 改
const updateMotheds = async () => {
  const result = await User.updateOne({ name: 'Jolly' }, {
    email: 'imooc@imooc.com'
  })
  console.log(result)
}

// 删
const deleteMotheds = async () => {
  const result = await User.deleteMany({ name: 'Jolly' })
  console.log(result)
}

deleteMotheds()
