const MarketingSpend = require("../models/MarketingSpend");

exports.getAllSpend = async (req, res) => {
    try {
        const spends = await MarketingSpend.find().sort({ date: -1 });
        res.status(200).json({
            status: "success",
            data: spends,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.createOrUpdateSpend = async (req, res) => {
    try {
        const { date, metaAdsSpend, googleAdsSpend, otherSpend, notes } = req.body;

        // Normalize date to start of day
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        const spend = await MarketingSpend.findOneAndUpdate(
            { date: d },
            { metaAdsSpend, googleAdsSpend, otherSpend, notes },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            status: "success",
            data: spend,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getSpendStats = async (req, res) => {
    try {
        const stats = await MarketingSpend.aggregate([
            {
                $group: {
                    _id: null,
                    totalMeta: { $sum: "$metaAdsSpend" },
                    totalGoogle: { $sum: "$googleAdsSpend" },
                    totalOther: { $sum: "$otherSpend" },
                    totalSpend: { $sum: { $add: ["$metaAdsSpend", "$googleAdsSpend", "$otherSpend"] } }
                }
            }
        ]);

        res.status(200).json({
            status: "success",
            data: stats[0] || { totalMeta: 0, totalGoogle: 0, totalOther: 0, totalSpend: 0 },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
