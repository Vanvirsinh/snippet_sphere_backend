const otpGenerator = require('otp-generator');
const OTP = require('../../models/auth/otpModel');

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const newOtp = new OTP({
            email,
            otp
        });

        return newOtp.save()
            .then(() => {
                return res.status(200).send({
                    success: true,
                    message: "OTP sent successfully!"
                })
            }).catch(err => {
                return res.status(400).send({
                    success: false,
                    message: "Failed to send an OTP!",
                    err
                });
            })

    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

module.exports = { sendOtp }