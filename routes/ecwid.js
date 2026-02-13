const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProduct,
    getCategories,
    getOrders,
    getProfile,
    handleWebhook
} = require("../controllers/ecwid");

// Product routes
router.get("/ecwid/products", getProducts);
router.get("/ecwid/products/:id", getProduct);

// Category routes
router.get("/ecwid/categories", getCategories);

// Order routes
router.get("/ecwid/orders", getOrders);

// Profile route
router.get("/ecwid/profile", getProfile);

// Webhook route
router.post("/ecwid/webhooks/order-created", handleWebhook);

module.exports = router;
