const { Users } = require("../models");
const { Ranks } = require("../models");
const galeShapley = require("../utils/galeShapley");

async function getMatches(req, res) {
  try {
    const students = await Users.findAll({
      where: {
        role: "student",
      },
      attributes: ["id"],
    });

    const faculties = await Users.findAll({
      where: {
        role: "faculty",
      },
      attributes: ["id"],
    });

    const studentIds = students.map((student) => student.id);
    const facultyIds = faculties.map((faculty) => faculty.id);

    const studentRankingsData = await Ranks.findAll({
      where: {
        rankerId: studentIds,
      },
      order: [
        ["rankerId", "ASC"],
        ["rank", "ASC"],
      ],
    });
    const facultyRankingsData = await Ranks.findAll({
      where: {
        rankerId: facultyIds,
      },
      order: [
        ["rankerId", "ASC"],
        ["rank", "ASC"],
      ],
    });
    const studentRankings = organizeRankings(studentRankingsData);
    const facultyRankings = organizeRankings(studentRankingsData);

    //res.json(studentRankings);
  } catch (error) {}
}

function organizeRankings(rankingData) {
  const organizedRankings = {};
  rankingData.forEach((rank) => {
    const rankerId = rank.rankerId;
    if (!organizedRankings[rankerId]) {
      organizedRankings[rankerId] = [];
    }
    organizedRankings[rankerId].push(rank.rankedId);
  });
  return organizedRankings;
}

module.exports = { getMatches };
