import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import User from '../model/user'
import { checkCode } from '../common/Utlis'
import bcrypt from 'bcrypt'

class LoginController {
  constructor(){}

  async forget (ctx) {
    const body = ctx.request.body
    console.log('body: ', body)
    try {
      let result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Jolly'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }

  async login (ctx) {

    // 接受用户数据
    let body = ctx.request.body,
    sid = body.sid,
    code = body.code
    
    // 验证图片验证码的时效、正确性
    let result = await checkCode(sid, code);
    if (result) {
      
      // 验证用户账号密码是否正确
      let checkUserPassword = false;
      let user = await User.findOne({ username: body.username }); // mongoDB查库
      if (user && bcrypt.compare(body.password, user.password)) {
        checkUserPassword = true;
      }
      
      if (checkUserPassword) {
        console.log('Hello Login');

        // 验证成功返回token
        let token = jsonwebtoken.sign({_id: 'jolly'}, config.JWT_SECRET, {
          expiresIn: '1d'
        });
        ctx.body = {
          code: 200,
          token
        };
      } else {
        
        //用户名、密码验证失败，返回提示
        ctx.body = {
          code: 404,
          msg: '用户名或密码错误'
        };
      }
    } else {
      
      // 图片验证码验证失败
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确，请检查！'
      };
    }
  }
  
  async reg (ctx) {
    // 接受客户端数据
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    let msg = {}
    // 验证图片验证码的时效性、正确性
    let result = await checkCode(sid, code)
    let check = true
    if (result) {
      // username 是否被注册
      let user1 = await User.findOne({ username: body.username })
      if (user1 && user1.username) {
        msg.username = ['此邮箱已经注册，可以通过邮箱找回密码'] // validation 的报错方式
        check = false
      }
      // name 是否被注册
      let user2 = await User.findOne({ name: body.name })
      if (user2 && user1.name) {
        msg.name = ['此昵称已经被注册，请修改']
        check = false
      }
      // 未被使用，写入数据库
      if (check) {
        body.password = await bcrypt.hash(body.password, 5) // 盐
        let user = new User({
          username: body.username,
          name: body.name,
          password: body.password,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        let result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      msg.code = ['验证码已经失效，请重新获取！']
    }
    ctx.body = {
      code: 500,
      msg: msg
    }
  }
}

export default new LoginController()