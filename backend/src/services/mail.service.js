import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

export const verifyMailConnection = async () => {
  await transporter.verify();
  console.log("SMTP Gmail berhasil terhubung");
};

export const sendMail = async (to, token) => {
  const info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Verify Your Chill App Email",
    text: `Your verification token is: ${token}`
  });

  return info;
};