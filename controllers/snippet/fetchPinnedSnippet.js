const Snippet = require("../../models/snippets/snippetModel");
const User = require("../../models/auth/userModel");

const pinnedSnippets = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("username");

    if (user.username !== req.params.username) {
      return res
        .status(400)
        .send({ success: false, message: "You're not authorized!" });
    }

    const snippets = await Snippet.find({ pins: userId });

    if(!snippets) {
        return res
        .status(400)
        .send({ success: false, message: "Snippets not pinned!" });
    }

    return res.status(200).send({ success: true, snippets });
    
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Error Occurred!" });
  }
};

module.exports = { pinnedSnippets };
