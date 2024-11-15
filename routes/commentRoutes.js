const express = require("express");
const { addComment, getComments } = require("../controllers/commentController");
const { protect } = require("../utils/authMiddleware");
const router = express.Router();

router.route("/").post(protect, addComment);
router.route("/:candidateId").get(getComments);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - user
 *         - candidate
 *         - content
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who added the comment
 *         candidate:
 *           type: string
 *           description: The ID of the candidate being commented on
 *         content:
 *           type: string
 *           description: The content of the comment
 *       example:
 *         user: 60d0fe4f5311236168a109ca
 *         candidate: 60d0fe4f5311236168a109cb
 *         content: This is a comment.
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a comment
 *     tags: [Comments]
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
 *               content:
 *                 type: string
 *             example:
 *               candidateId: 60d0fe4f5311236168a109cb
 *               content: This is a comment.
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Candidate not found
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get comments for a candidate
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the candidate
 *     responses:
 *       200:
 *         description: The list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Server error
 */
