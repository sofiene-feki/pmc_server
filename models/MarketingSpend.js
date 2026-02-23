const mongoose = require("mongoose");

const marketingSpendSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            unique: true, // One entry per day or month, let's say day
        },
        metaAdsSpend: {
            type: Number,
            default: 0,
        },
        googleAdsSpend: {
            type: Number,
            default: 0,
        },
        otherSpend: {
            type: Number,
            default: 0,
        },
        notes: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("MarketingSpend", marketingSpendSchema);
