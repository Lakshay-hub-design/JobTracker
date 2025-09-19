const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
    if (!to) {
        console.error("❌ No recipient email provided to sendEmail");
        throw new Error("Recipient email address is required");
    }

    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: `"JobTracker" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Email Sent Successfuly")
    } catch(err){
        console.error("Error Sending eamil:", err)
        throw err;
    }
}

module.exports = sendEmail