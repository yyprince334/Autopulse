import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendAlert(to: string, subject: string, body: string) {
    await this.resend.emails.send({
      from: 'AutoPulse <onboarding@resend.dev>',
      to,
      subject,
      text: body,
    });
  }
}