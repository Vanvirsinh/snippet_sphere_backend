const User = require("../../models/auth/userModel");
const UserProfile = require("../../models/profile/profile");

const followUser = async (req, res) => {
  try {
    const followingUserId = req.user.id;

    const userToFollow = await User.findOne({ username: req.params.username });

    if (!userToFollow) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const profile = await UserProfile.findOne({ userId: userToFollow._id });

    let message;

    if (profile.followers.includes(followingUserId)) {
      profile.followers.pop(followingUserId);
      message = "User Un-followed";
    } else {
      profile.followers.push(followingUserId);
      message = "User Followed";
    }

    await profile.save();
    try {
      return res.status(201).send({ success: true, message });
    } catch (error) {
      return res.status(400).send({ success: false, message: error.message });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { followUser };
