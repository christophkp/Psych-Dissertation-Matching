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
    const studentRankings = await Users.findAll({
      where: { role: "student" },
      attributes: ["id", "firstName", "lastName"],
      include: [
        {
          model: Ranks,
          as: "GivenRanks",
          attributes: ["rank", "commentBody"],
          include: [
            {
              model: Users,
              as: "Ranked",
              attributes: ["firstName", "lastName"],
              where: { role: "faculty" },
            },
          ],
          order: [["rank", "ASC"]],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json(studentRankings);
  } catch (error) {
    res.status(500).json({ message: "Error getting student rankings" });
  }
}
async function getFacultyRankings(req, res) {
  try {
    const facultyRankings = await Users.findAll({
      where: { role: "faculty" },
      attributes: ["id", "firstName", "lastName"],
      include: [
        {
          model: Ranks,
          as: "GivenRanks",
          attributes: ["rank", "commentBody"],
          include: [
            {
              model: Users,
              as: "Ranked",
              attributes: ["firstName", "lastName"],
              where: { role: "student" },
            },
          ],
          order: [["rank", "ASC"]],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json(facultyRankings);
  } catch (error) {
    res.status(500).json({ message: "Error getting faculty rankings" });
  }
}

module.exports = { submitRanking, rankSubmitted, getStudentRankings, getFacultyRankings };
