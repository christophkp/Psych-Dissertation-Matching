const { Ranks } = require("../models");
const { Users } = require("../models");


async function submitRanking(req, res) {
  try {
    const rankingData = req.body;
    for (const data of rankingData) {
      const existingRank = await Ranks.findOne({
        where: {
          rankedId: data.rankedId,
          rankerId: req.user.id,
        },
      });
      if (existingRank) {
        res.status(400);
        res.json({ Error: "Already submitted a rank for one of the users" });
        return;
      }

      await Ranks.create({
        rankedId: data.rankedId,
        rank: data.rank,
        rankerId: req.user.id,
        commentBody: data.comments,
      });
    }
    res.status(200);
    res.json({ Rank: "Rankings submitted successfully" });
  } catch (error) {
    res.status(500);
  }
}

async function rankSubmitted(req, res) {
  try {
    const isRankedSubmitted = await Ranks.findOne({
      where: {
        rankerId: req.user.id,
      },
    });
    if (isRankedSubmitted) {
      res.status(200);
      res.json({ hasRankSubmitted: true });
    } else {
      res.status(200);
      res.json({ hasRankSubmitted: false });
    }
  } catch (error) {
    res.status(500);
  }
}

async function getStudentRankings(req, res) {
  try {
    const students = await Users.findAll({
      where: {
        role: "student",
      },
      attributes: ["id"],
    });


    const studentIds = students.map((student) => student.id);

    const studentRankingsData = await Ranks.findAll({
      where: {
        rankerId: studentIds,
      },
      order: [
        ["rankerId", "ASC"],
        ["rank", "ASC"],
      ],
    });
      res.json(studentRankingsData)
  } catch (error) {
    res.status(500).json({ message: "Error getting student rankings" });
  }
}

module.exports = { submitRanking, rankSubmitted, getStudentRankings };
