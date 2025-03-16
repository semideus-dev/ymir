"use server";

import nodemailer from "nodemailer";

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailProps) {
  if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
    throw new Error("NODEMAILER_EMAIL or NODEMAILER_PASSWORD is not defined");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      text: text.trim(),
    });
  } catch (e) {
    console.log(e);
  }
}
