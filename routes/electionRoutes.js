const express = require("express");
const router = express.Router();
const ElectionController = require("../controllers/electionController");
const auth = require("../utils/auth");
const authorize = require("../utils/authorize");

/**
 * @swagger
 * tags:
 *   name: Elections
 *   description: The elections managing API
 */

/**
 * @swagger
 * /api/elections:
 *   post:
 *     summary: Create a new election
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               isActive:
 *                 type: boolean
 *               candidates:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The election was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Election'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections:
 *   get:
 *     summary: Returns the list of all the elections
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the elections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Election'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections/{id}:
 *   get:
 *     summary: Get the election by id
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The election id
 *     responses:
 *       200:
 *         description: The election description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Election'
 *       404:
 *         description: The election was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections/{id}:
 *   put:
 *     summary: Update the election by id
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The election id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Election'
 *     responses:
 *       200:
 *         description: The election was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Election'
 *       404:
 *         description: The election was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/elections/{id}:
 *   delete:
 *     summary: Delete the election by id
 *     tags: [Elections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The election id
 *     responses:
 *       200:
 *         description: The election was successfully deleted
 *       404:
 *         description: The election was not found
 *       500:
 *         description: Some server error
 */

// Routes pour la gestion des élections
router.post("/", auth, authorize(["admin"]), ElectionController.createElection);
router.get("/", auth, authorize(["admin"]), ElectionController.getAllElections);
router.get(
  "/:id",
  auth,
  authorize(["admin"]),
  ElectionController.getElectionById
);
router.put(
  "/:id",
  auth,
  authorize(["admin"]),
  ElectionController.updateElection
);
router.delete(
  "/:id",
  auth,
  authorize(["admin"]),
  ElectionController.deleteElection
);

module.exports = router;
