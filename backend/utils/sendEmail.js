const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, html) => {
    if (!to) {
        console.error("❌ No recipient email provided to sendEmail");
        throw new Error("Recipient email address is required");
    }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use 'smtp.ethereal.email' for testing
      auth: {
        user: process.env.EMAIL_USER, // your Gmail or SMTP email
        pass: process.env.EMAIL_PASS, // app password or real password
      },
    });

    await transporter.sendMail({
      from: `"JobTracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;