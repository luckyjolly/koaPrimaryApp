import send from '../config/MailConfig'
import moment from 'moment'

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

  // async login (ctx) {
  //   let body = ctx.request.body,
  //       sid = body.sid,
  //       code = body.code
    

  // }
}

export default new LoginController()