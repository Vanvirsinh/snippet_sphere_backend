const mongoose = require('mongoose');
const mailSender = require('../../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "OTP Verification Email by Snippet Sphere",
            `<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #f7f7f7; padding: 20px;">
              <h2 style="color: #333;">Snippet Sphere - OTP Verification</h2>
              <p style="color: #555;">Hello there,</p>
              <p style="color: #555;">Thank you for choosing Snippet Sphere!</p>
              <p style="color: #555;">Your OTP for verification is: <strong style="color: #333;">${otp}</strong>.</p>
              <p style="color: #555;">This OTP will expire in 5 minutes.</p>
              <p style="color: #555;">If you didn't request this OTP, please ignore this message.</p>
              <p style="color: #555;">Best regards,</p>
              <p style="color: #555;">The Snippet Sphere Team</p>
            </div>
          </body>`
        );
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    if(this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;