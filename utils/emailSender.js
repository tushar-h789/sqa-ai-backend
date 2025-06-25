const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_HOST,
    secure: false, // true for port 465, false for others like 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email details
  const mailOptions = {
    // TODO: replace email heading
    from: `"Sqa AI" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
