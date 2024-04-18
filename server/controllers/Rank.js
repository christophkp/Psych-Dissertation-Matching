const { Ranks } = require('../models');

async function submitRanking(req, res) {
    try {
        const rankingData = req.body; 
        for (const data of rankingData) {

            const existingRank = await Ranks.findOne({
                where: {
                    rankedId: data.rankedId,
                    rankerId: req.user.id
                }
            });
            if (existingRank) {
                res.status(400);
                res.json({Error: "Already submitted a rank for one of the users"});
                return;
            }

            await Ranks.create({
                rankedId: data.rankedId,
                rank: data.rank,
                rankerId: req.user.id,
            });
        }
        res.status(200);
        res.json({ Rank: "Rankings submitted successfully" });
    } catch (error) {
        res.status(500);
    }
}


module.exports = {submitRanking};