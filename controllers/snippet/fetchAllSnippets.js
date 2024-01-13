const Snippet = require("../../models/snippets/snippetModel");
const Collection = require("../../models/snippets/collectionModel");

const fetchAllSnippets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const keyword = req.query.search || "";
    const pageSize = 8;
    const skip = (page - 1) * pageSize;

    const allCollections = await Collection.find({ isPublic: true }).select(
      "collectionId"
    );

    if (allCollections.length === 0) {
      return res.status(400).send({
        success: false,
        message: "There is no public collection available!",
      });
    }

    const allCollectionsIds = allCollections.map((id) => id.collectionId);
    const totalSnippetsLength = await Snippet.countDocuments({
      collectionId: { $in: allCollectionsIds },
      $or: [
        { title: { $regex: new RegExp(keyword, "i") } },
        { description: { $regex: new RegExp(keyword, "i") } },
        { authorName: { $regex: new RegExp(keyword, "i") } },
        { language: { $regex: new RegExp(keyword, "i") } },
      ],
    });
    const allSnippets = await Snippet.find({
      collectionId: { $in: allCollectionsIds },
      $or: [
        { title: { $regex: new RegExp(keyword, "i") } },
        { description: { $regex: new RegExp(keyword, "i") } },
        { authorName: { $regex: new RegExp(keyword, "i") } },
        { language: { $regex: new RegExp(keyword, "i") } },
      ],
    })
      .skip(skip)
      .limit(pageSize);

    if (!allSnippets) {
      return res.status(400).send({
        success: false,
        message: "There is not public snippet available!",
      });
    }

    return res
      .status(200)
      .send({ success: true, totalSnippetsLength, snippets: allSnippets });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { fetchAllSnippets };
