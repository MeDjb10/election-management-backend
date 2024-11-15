const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

exports.castVote = async (req, res) => {
  const { candidateId } = req.body;

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const existingVote = await Vote.findOne({ user: req.user.id });
    if (existingVote) {
      return res.status(400).json({ message: "User has already voted" });
    }

    const vote = new Vote({ user: req.user.id, candidate: candidateId });
    await vote.save();

    res.status(201).json({ message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("candidate", "name party");
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
