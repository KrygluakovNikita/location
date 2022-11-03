import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    } as SMTPTransport.Options);
  }
  async sendActivationMail(to: string, link: string) {
    const htmlForm = `
              <div>
      <h1>Активация электронной почты</h1>
      <p>Используйте эту уникальную ссылку, чтобы подтвердить свой адрес электронной почты ${to} .</p>
      <a href="${link}">${link}</a>
    </div>
      `;

    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to: to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: '',
      html: htmlForm,
    });
  }
}

export default new MailService();
