const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

exports.sendStudentCredentials = (to, { name, username, password }) => {
  return transporter.sendMail({
    from: `"EduGate Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Student Login Credentials",
    html: `<p>Dear ${name},</p><p>Your admission is approved.</p>
           <p><b>Username:</b> ${username}<br/><b>Password:</b> ${password}</p>`
  });
};

exports.sendRejectionEmail = (to) => {
  return transporter.sendMail({
    from: `"EduGate Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Admission Application Status",
    html: `<p>We regret to inform you that your admission request has been rejected.</p>`
  });
};
