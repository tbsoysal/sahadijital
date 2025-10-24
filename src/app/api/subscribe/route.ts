import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { subscriberEmail, notificationEmail, subject, message } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: notificationEmail,
      subject: subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">SahaDijital - Yeni Abone Bildirimi</h2>
          <p><strong>Yeni abone kaydı!</strong></p>
          <p><strong>Abone E-posta:</strong> ${subscriberEmail}</p>
          <p><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
          <p><strong>Kaynak:</strong> SahaDijital Coming Soon Sayfası</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">
            Bu e-posta SahaDijital tarafından otomatik olarak gönderilmiştir.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
