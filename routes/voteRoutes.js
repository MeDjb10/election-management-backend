const express = require("express");
const { castVote, getVotes } = require("../controllers/voteController");
const { protect } = require("../utils/authMiddleware");
const router = express.Router();

module.exports = (io) => {
  router
    .route("/")
    .post(protect, (req, res) => castVote(req, res, io))
    .get(protect, getVotes);
  return router;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - user
 *         - candidate
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who cast the vote
 *         candidate:
 *           type: string
 *           description: The ID of the candidate who received the vote
 *       example:
 *         user: 60d0fe4f5311236168a109ca
 *         candidate: 60d0fe4f5311236168a109cb
 */

/**
 * @swagger
 * tags:
 *   name: Votes
 *   description: The votes managing API
 */

/**
 * @swagger
 * /api/votes:
 *   post:
 *     summary: Cast a vote
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidateId:
 *                 type: string
 *             example:
 *               candidateId: 60d0fe4f5311236168a109cb
 *     responses:
 *       201:
 *         description: Vote cast successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: User has already voted or invalid candidate ID
 *       404:
 *         description: Candidate not found
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all votes
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vote'
 *       500:
 *         description: Server error
 */
