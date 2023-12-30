const User = require('../../models/auth/userModel');
const UserProfile = require('../../models/profile/profile');

const followUser = async (req, res) => {
    try {
        const followingUserId = req.user.id;

        const userToFollow = await User.findById(req.params.userId);

        if (!userToFollow) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const profile = await UserProfile.findOne({ userId: req.params.userId });

        if (profile.followers.includes(followingUserId)) {
            profile.followers.pop(followingUserId);
        } else {
            profile.followers.push(followingUserId);
        }

        await profile.save();
        try {
            return res.status(201).send({ success: true, message: 'User Followed!' })
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message })
        }


    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { followUser };