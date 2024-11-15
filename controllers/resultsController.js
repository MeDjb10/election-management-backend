const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

exports.getElectionResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate",
          votes: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $unwind: "$candidate",
      },
      {
        $project: {
          _id: 0,
          candidate: "$candidate.name",
          party: "$candidate.party",
          votes: 1,
        },
      },
      {
        $sort: { votes: -1 },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
