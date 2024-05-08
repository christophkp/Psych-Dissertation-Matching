const { Users } = require("../models");
const { Ranks } = require("../models");
const { galeShapley } = require("../utils/galeShapley");

async function generateMatches(req, res) {
  try {
    const studentRankings = await Users.findAll({
      where: { role: "student" },
      attributes: ["id", "firstName", "lastName"],
      include: [
        {
          model: Ranks,
          as: "GivenRanks",
          attributes: ["rank"],
          include: [
            {
              model: Users,
              as: "Ranked",
              attributes: ["id", "firstName", "lastName"],
              where: { role: "faculty" },
            },
          ],
          order: [["rank", "ASC"]],
        },
      ],
      order: [["id", "ASC"]],
    });

    const facultyRankings = await Users.findAll({
      where: { role: "faculty" },
      attributes: ["id", "firstName", "lastName", "numStudents"],
      include: [
        {
          model: Ranks,
          as: "GivenRanks",
          attributes: ["rank"],
          include: [
            {
              model: Users,
              as: "Ranked",
              attributes: ["id", "firstName", "lastName"],
              where: { role: "student" },
            },
          ],
          order: [["rank", "ASC"]],
        },
      ],
      order: [["id", "ASC"]],
    });

    const studentPreferences = new Map();
    const facultyPreferences = new Map();
    const facultyCapacities = new Map();

    studentRankings.forEach((student) => {
      const preferences = student.GivenRanks.map((rank) => rank.Ranked.id);
      studentPreferences.set(student.id, preferences);
    });

    facultyRankings.forEach((faculty) => {
      const preferences = faculty.GivenRanks.map((rank) => rank.Ranked.id);
      facultyPreferences.set(faculty.id, preferences);
      facultyCapacities.set(faculty.id, faculty.numStudents);
    });
    // const studentPreferencesFake = new Map([
    //   [1, [4, 5]],
    //   [2, [5, 4]],
    //   [3, [5, 4]],
    // ]);

    // const facultyPreferencesFake = new Map([
    //   [4, [1, 2, 3]],
    //   [5, [3, 2, 1]],
    // ]);

    // const facultyCapacitiesFake = new Map([
    //   [4, 1],
    //   [5, 1],
    // ]);
    // console.log(studentPreferencesFake);
    // console.log(facultyPreferencesFake);
    // console.log(facultyCapacitiesFake);

    const matches = galeShapley(
      studentPreferences,
      facultyPreferences,
      facultyCapacities
    );

    let response = [];
    matches.forEach((matchedStudentIds, matchedFacultyId) => {
      const matchedFaculty = facultyRankings.find(
        (faculty) => faculty.id === matchedFacultyId
      );
      const facultyName = `${matchedFaculty.firstName} ${matchedFaculty.lastName}`;
      const numStudents = matchedFaculty.numStudents;

      const studentInfo = matchedStudentIds.map((studentId) => {
        const matchedStudent = studentRankings.find(
          (student) => student.id === studentId
        );
        return {
          studentId: matchedStudent.id,
          studentName: `${matchedStudent.firstName} ${matchedStudent.lastName}`,
        };
      });
      response.push({
        facultyId: matchedFacultyId,
        facultyName: facultyName,
        numStudents: numStudents,
        matchedStudents: studentInfo,
      });
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error generating matches" });
  }
}

module.exports = { generateMatches };
