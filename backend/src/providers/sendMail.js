require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isDev = process.env.NODE_ENV !== "production"

const sendEmail = async (to, subject, text, html) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_USER,
      subject,
      text,
      html,
    };

    const response = await sgMail.send(msg);

    if (isDev) {
      console.log("Email sent:", response[0].statusCode);
    }

  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    throw error;
  }
};

async function sendOtpEmail(userEmail, otp) {
  const subject = "Verify Your Email - JobTracker"

  const text = `
    Hello,

    Your One-Time Password (OTP) for verifying your JobTracker account is: ${otp}

    This OTP is valid for 10 minutes.

    If you did not request this, please ignore this email.

    Thank you,
    JobTracker Team
    `

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
      
      <h2 style="color: #333; text-align: center;">Email Verification</h2>
      
      <p style="font-size: 16px; color: #555;">
        Thank you for registering with <strong>JobTracker</strong>.
      </p>

      <p style="font-size: 16px; color: #555;">
        Please use the OTP below to verify your email address:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="
          display: inline-block;
          padding: 15px 25px;
          font-size: 22px;
          letter-spacing: 5px;
          font-weight: bold;
          background-color: #4CAF50;
          color: #ffffff;
          border-radius: 6px;
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size: 14px; color: #777;">
        This OTP is valid for <strong>10 minutes</strong>.
      </p>

     <p style="font-size: 13px; color: #888;">
      This email was sent from JobTracker. If you did not request this, you can ignore it.
     </p>

      <hr style="margin: 25px 0;" />

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © ${new Date().getFullYear()} JobTracker. All rights reserved.
      </p>

    </div>
  </div>
  `

  await sendEmail(userEmail, subject, text, html)
}

async function sendForgotPasswordEmail(userEmail, resetLink) {
  const subject = "Reset Your Password - JobTracker"

  const text = `
Hello,

We received a request to reset your JobTracker account password.

Click the link below to reset your password:
${resetLink}

This link is valid for 15 minutes.


This email was sent from JobTracker. If you did not request this, you can ignore it.


Thank you,
JobTracker Team
`

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
      
      <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
      
      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password for <strong>JobTracker</strong>.
      </p>

      <p style="font-size: 16px; color: #555;">
        Click the button below to reset your password:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="
          display: inline-block;
          padding: 12px 25px;
          font-size: 16px;
          font-weight: bold;
          background-color: #e0531f;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
        ">
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #777;">
        This link will expire in <strong>15 minutes</strong>.
      </p>

      <p style="font-size: 13px; color: #888;">
        This email was sent from JobTracker. If you did not request this, you can ignore it.
      </p>

      <hr style="margin: 25px 0;" />

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © ${new Date().getFullYear()} JobTracker. All rights reserved.
      </p>

    </div>
  </div>
  `

  await sendEmail(userEmail, subject, text, html)
}

module.exports = {
    sendOtpEmail,
    sendForgotPasswordEmail
}