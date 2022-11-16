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

  async resetPassword(to: string, resetPin: string): Promise<void> {
    const htmlForm = `
        <div>
          <h1>Восстановление пароля</h1>
          <p>Пин код для восстановления пароля для почты: ${to}</p>
          <p>${resetPin}</p>
        </div>
      `;

    const subject = `Восстановление пароля на сайте: ${process.env.CLIENT_URL}`;

    await this.sendMail(to, subject, htmlForm);
  }

  async changePassword(to: string, resetPin: string): Promise<void> {
    const htmlForm = `
        <div>
          <h1>Изменение пароля</h1>
          <p>Пин код для изменения пароля для почты: ${to}</p>
          <p>${resetPin}</p>
        </div>
      `;

    const subject = `Изменение пароля на сайте: ${process.env.CLIENT_URL}`;

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
