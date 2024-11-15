const Vote = require("../models/Vote");

const emitResultsUpdate = async (io) => {
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
  io.emit("resultsUpdate", results);
};

module.exports = emitResultsUpdate;
