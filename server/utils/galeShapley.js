function galeShapley(studentRankings, facultyRankings) {
  const freeStudents = Object.keys(studentRankings).map(Number);
  console.log("Initial free students", freeStudents);

  const proposals = {};
  const engagements = {};
  console.log("Student Preferences:");
  Object.keys(studentRankings).forEach((student) => {
    console.log(`Student ${student}: ${studentRankings[student].join(", ")}`);
  });

  console.log("Faculty Preferences:");
  Object.keys(facultyRankings).forEach((faculty) => {
    console.log(`Faculty ${faculty}: ${facultyRankings[faculty].join(", ")}`);
  });

  Object.keys(facultyRankings).forEach((faculty) => {
    engagements[faculty] = null;
  });

  freeStudents.forEach((student) => {
    proposals[student] = [];
  });

  while (freeStudents.length > 0) {
    let student = freeStudents[0];
    let studentPreferences = studentRankings[student];
    let engaged = false;

    for (let faculty of studentPreferences) {
      if (!proposals[student].includes(faculty)) {
        proposals[student].push(faculty);
        console.log(`Student ${student} proposes to faculty ${faculty}`);

        if (!engagements[faculty]) {
          engagements[faculty] = student;
          console.log(`Faculty ${faculty} engages with student ${student}`);
          engaged = true;
          break;
        } else {
          let currentEngagement = engagements[faculty];
          console.log(
            `Comparing current engagement ${currentEngagement} with new proposal ${student}. Current preference index: ${facultyRankings[
              faculty
            ].indexOf(
              currentEngagement
            )}, New preference index: ${facultyRankings[faculty].indexOf(
              student
            )}`
          );

          if (
            facultyRankings[faculty].indexOf(student) <
            facultyRankings[faculty].indexOf(currentEngagement)
          ) {
            console.log(
              `Faculty ${faculty} switches from ${currentEngagement} to ${student}`
            );
            freeStudents.push(currentEngagement); // Add student from current engagement back to free list
            engagements[faculty] = student;
            engaged = true;
            break;
          }
        }
      }
    }
    if (engaged) {
      console.log(
        `Student ${student} is now engaged and removed from free list.`
      );

      freeStudents.shift(); 
    } else {
      console.log(`Student ${student} remains unengaged, moved to the end.`);

      freeStudents.push(freeStudents.shift());
    }
  }
  console.log("Final engagements:", engagements);
  return engagements;
}

module.exports = { galeShapley };
