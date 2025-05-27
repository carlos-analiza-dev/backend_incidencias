import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailConfirm(email: string, newPassword: string) {
    if (!email) throw new BadRequestException('No se proporcionó un correo');

    const resetUrl = `${process.env.FRONTEND_URL}/login`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Contraseña Actualizada',
        template: './confirm-correo',
        context: {
          resetUrl,
          email,
          newPassword,
        },
      });

      return { message: 'Correo de confirmación enviado' };
    } catch (error) {
      console.log('ERROR', error);

      throw new Error('Failed to send email');
    }
  }
}
