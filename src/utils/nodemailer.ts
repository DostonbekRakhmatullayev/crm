import { HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const sendMail = async (addres: string, content: string): Promise<void> => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: '',
        pass: '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transport.sendMail({
      from: '',
      to: addres,
      subject: content,
      text: content,
    });
  } catch (error) {
    throw new HttpException(
      'Failed to send email.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export default sendMail;
