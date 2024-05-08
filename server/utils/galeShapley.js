function galeShapley(
  studentPreferences,
  facultyPreferences,
  facultyCapacities
) {
  console.log("Starting Gale Shapley Algorithm:");

  let freeStudents = Array.from(studentPreferences.keys());

  console.log("Initial free students", freeStudents);

  let studentMatches = new Map();
  let facultyMatches = new Map();

  for (let facultyId of facultyPreferences.keys()) {
    facultyMatches.set(facultyId, []);
  }

  while (freeStudents.length > 0) {
    let studentId = freeStudents.shift();
    console.log("Proposing student id:", studentId);
    let preferences = studentPreferences.get(studentId);
    console.log(`Preferences for student ${studentId}: ${preferences}`);

    if (preferences.length > 0) {
      let facultyId = preferences.shift();
      console.log(`Student ${studentId} proposes to Faculty ${facultyId}`);
      let facultyList = facultyMatches.get(facultyId);
      let capacity = facultyCapacities.get(facultyId);
      let studentIndex = facultyPreferences.get(facultyId).indexOf(studentId);

      if (studentIndex === -1) {
        console.log(
          `Faculty ${facultyId} does not have Student ${studentId} in their preference list. Proposal ignored.`
        );
        if (preferences.length > 0) {
          freeStudents.push(studentId);
        }
        continue;
      }

      if (facultyList.length < capacity) {
        facultyList.push(studentId);
        studentMatches.set(studentId, facultyId);
        console.log(`Faculty ${facultyId} matches with Student ${studentId}`);
      } else {
        let leastPreferred = facultyList.reduce((least, current) => {
          return facultyPreferences.get(facultyId).indexOf(current) >
            facultyPreferences.get(facultyId).indexOf(least)
            ? current
            : least;
        });
        console.log(
          `Least preferred Faculty match student id: ${leastPreferred}`
        );

        if (
          facultyPreferences.get(facultyId).indexOf(studentId) <
          facultyPreferences.get(facultyId).indexOf(leastPreferred)
        ) {
          facultyList.splice(facultyList.indexOf(leastPreferred), 1);
          facultyList.push(studentId);
          freeStudents.push(leastPreferred);
          studentMatches.delete(leastPreferred);
          studentMatches.set(studentId, facultyId);
          console.log(
            `Faculty ${facultyId} prefers Student ${studentId} over Student ${leastPreferred}`
          );
          console.log(`Student ${leastPreferred} is now free`);
        } else {
          console.log(`Faculty ${facultyId} rejects Student ${studentId}`);

          if (preferences.length > 0) {
            freeStudents.push(studentId);
            console.log(`Student ${studentId} is free`);
          }
        }
      }
    }
    if (preferences.length === 0 && !studentMatches.has(studentId)) {
      console.log(
        `Student ${studentId} remains unmatched and has no preferences left`
      );
    }
  }

  console.log("Final matches", facultyMatches);
  return facultyMatches;
}

module.exports = { galeShapley };
