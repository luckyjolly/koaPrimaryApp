import  nodemailer from 'nodemailer'

// 由nodemailer官网例子改造
async function send (sendInfo) {

  // 没有真实测试账号时，使用ethereal.email创建一个测试用SMTP协议的邮件服务号
  // let testAccount = await nodemailer.createTestAccount()

  // SMTP 邮件发送服务器
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,// 默认false，使用true则使用tls连接连接到邮件服务，465可以设置为true，587、25保持false就行
    auth: {
      user: '860194716@qq.com',
      pass: 'wyyhklwiyyhsbajc' // qq邮箱生成的授权码。qq邮箱 设置=》账号=》POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务，开启POP3/SMTP服务
    }
  })
  // 以上host port设置，参考 https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=369 中 Foxmail 的设置部分

  let url = 'http://www.imooc.com'
  
  let info = transporter.sendMail({
    from: '"认证邮件" <860194716@qq.com>', // sender address
    to: sendInfo.email, // list of receivers
    subject: sendInfo.user !== '' ? `你好开发者，${sendInfo.user}！《慕课网前端全栈实践》注册码`: '《慕课网前端全栈实践》注册码',
    text: `您在《慕课网前端全栈实践》课程中注册，您的邀请码是${sendInfo.code},邀请码的过期时间: ${sendInfo.expire}`,
    html: `
        <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Imooc社区——欢迎来到官方社区</div>
        <div style="padding: 25px">
          <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${
      sendInfo.expire
    }之前重置您的密码：</div>
          <a href="${url}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>
          <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>
    `,
  })

  return 'Message Id: s%', info.messageId 
}

export default send
