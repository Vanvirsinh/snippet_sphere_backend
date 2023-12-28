const UserProfile = require('../../models/profile/profile');

const getUserProfile = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ userId: req.user.id })

        try {
            if (!profile) {
                return res.status(400).send({ success: false, message: "Profile is not created yet!" });
            }
            return res.status(200).send({ success: true, profile });

        } catch {
            return res.status(400).send({ success: false, message: "Error occured while fetching profile data!" });
        }

    } catch {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { getUserProfile }