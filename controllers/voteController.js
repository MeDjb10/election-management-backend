const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const emitResultsUpdate = require("../utils/emitResultsUpdate");

const castVote = async (req, res, io) => {
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

    // Emit results update
    emitResultsUpdate(io);

    res.status(201).json({ message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("candidate", "name party");
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { castVote, getVotes };
