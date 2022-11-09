import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { UserDto } from '../dtos/user-dto';

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

  async sendActivationMail(to: string, activationLink: string): Promise<void> {
    const link = `${process.env.API_URL}/api/auth/activate/${activationLink}`;
    const htmlForm = `
        <div>
          <h1>Активация электронной почты</h1>
          <p>Используйте эту уникальную ссылку, чтобы подтвердить свой адрес электронной почты ${to} .</p>
          <a href="${link}">${link}</a>
        </div>
      `;

    const subject = `Активация аккаунта на сайте: ${process.env.CLIENT_URL}`;

    await this.sendMail(to, subject, htmlForm);
  }

  async resetPassword(to: string, resetLink: string): Promise<void> {
    const link = `${process.env.API_URL}/api/user/reset/${resetLink}`;
    const htmlForm = `
        <div>
          <h1>Восстановление пароля</h1>
          <p>Используйте эту уникальную ссылку, чтобы восстановить свой пароль для данной электронной почты ${to} .</p>
          <a href="${link}">${link}</a>
        </div>
      `;

    const subject = `Восстановление пароля на сайте: ${process.env.CLIENT_URL}`;

    await this.sendMail(to, subject, htmlForm);
  }

  async sendMail(to, subject, html): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject,
      text: '',
      html,
    });
  }
}

export default new MailService();
