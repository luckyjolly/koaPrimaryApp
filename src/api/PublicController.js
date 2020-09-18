import svgCaptcha from 'svg-captcha'

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      size: 4,// 验证码长度
      ignoreChars: '0o1il',// 验证码字符中排除
      color: true,// 验证码的字符是否有颜色
      noise: Math.floor(Math.random() * 5),// 干扰线条的数量
      width: 150,
      height: 50
    });
    console.log('newCaptcha: ', newCaptcha);
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    };
  }
}

export default new PublicController();