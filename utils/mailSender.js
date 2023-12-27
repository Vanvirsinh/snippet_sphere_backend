const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.HOST_MAILSENDER,
            auth: {
                user: process.env.USER_MAILSENDER,
                pass: process.env.PASS_MAILSENDER
            }
        });

        await transporter.sendMail({
            from: 'Snippet Sphere - deoravanvirsinh7773@gmail.com',
            to: email,
            subject: title,
            html: body,
          });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;