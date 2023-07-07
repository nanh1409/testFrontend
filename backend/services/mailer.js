const nodemailer = require("nodemailer");

module.exports = async ({ to, sender, subject, html, attachments, text }) => {
  try {
    // Tạo transporter với thông tin cấu hình máy chủ email của bạn
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: "maihoanganhyb2002@gmail.com",
        pass: "Huyenmy02",
      },
    });

    // Gửi email
    let info = await transporter.sendMail({
      to: to,
      from: "maihoanganhyb2002@gmail.com",
      subject: subject,
      html: html,
      attachments: attachments,
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
