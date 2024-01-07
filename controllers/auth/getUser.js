const User = require("../../models/auth/userModel");
const UserProfile = require("../../models/profile/profile");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found!" });
    }

    const profile = await UserProfile.findOne({ userId: req.user.id }).select(
      "userImage"
    );

    if (!profile) {
      return res
        .status(400)
        .send({ success: false, message: "User profile not found!", user:null });
    }

    res.status(200).send({ success: true, message: "User found!", user, userImage: profile.userImage });

  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send({ success: false, message: "Oops! Something went wrong!", user:null });
  }
};

module.exports = { getUser };
