import svgCaptcha from 'svg-captcha'
import { setValue } from '../config/RedisConfig'

class PublicController {
  constructor() {}

  /**
   * 生成验证码
   * @param {Objeck} ctx 
   */
  async getCaptcha(ctx) {
    let body = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4,// 验证码长度
      ignoreChars: '0o1il',// 验证码字符中排除
      color: true,// 验证码的字符是否有颜色
      noise: Math.floor(Math.random() * 5),// 干扰线条的数量
      width: 150,
      height: 38
    });
    console.log('newCaptcha: ', newCaptcha);
    setValue(body.sid, newCaptcha.text, 10 * 60)
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    };
  }
}

export default new PublicController();
