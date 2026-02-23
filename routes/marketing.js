const express = require("express");
const marketingController = require("../controllers/marketingController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.use(restrictTo("ADMIN"));

router.get("/marketing/spend", marketingController.getAllSpend);
router.post("/marketing/spend", marketingController.createOrUpdateSpend);
router.get("/marketing/stats", marketingController.getSpendStats);

module.exports = router;
