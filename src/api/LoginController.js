import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import User from '../model/user'
import { checkCode } from '../common/Utlis'


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
      if (user && user.password === body.password) {
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
}

export default new LoginController()