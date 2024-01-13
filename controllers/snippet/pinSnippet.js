const Snippet = require("../../models/snippets/snippetModel");

const pinSnippet = async (req, res) => {
  try {
    const userId = req.user.id;

    const snippetsToPin = await Snippet.findById(req.params.snippetId);

    if (!snippetsToPin) {
      return res
        .status(404)
        .send({ success: false, message: "Snippet not found" });
    }

    let message;

    if (snippetsToPin.pins.includes(userId)) {
      snippetsToPin.pins.pop(userId);
      message = "Snippet Unpinned";
    } else {
      snippetsToPin.pins.push(userId);
      message = "Snippet Pinned";
    }

    await snippetsToPin.save();
    try {
      return res.status(201).send({ success: true, message });
    } catch (error) {
      return res.status(400).send({ success: false, message: error.message });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { pinSnippet };
