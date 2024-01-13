const UserProfile = require("../../models/profile/profile");
const User = require("../../models/auth/userModel");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Profile is not found!" });
    }

    const profile = await UserProfile.findOne({ userId: user._id });

    try {
      if (!profile) {
        return res
          .status(400)
          .send({ success: false, message: "Profile is not found!" });
      }

      const userProfile = {
        name: user.name,
        profilePicture: profile.userImage,
        headline: profile.headline,
        username: user.username,
        followers: profile.followers,
        personalEmail: profile.personalEmail,
        personalWebsite: profile.websiteUrl,
        gitHubProfile: profile.gitHubProfile,
      };

      return res.status(200).send({ success: true, profile: userProfile });
    } catch {
      return res.status(400).send({
        success: false,
        message: "Error occurred while fetching profile data!",
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { getUserProfile };
