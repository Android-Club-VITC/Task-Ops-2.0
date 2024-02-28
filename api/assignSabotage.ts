import { doc, updateDoc, runTransaction, getDoc } from "firebase/firestore";
import { db, teams } from "../firebaseConfig";
function getRandomTask(tasks: SabotageTask[]): SabotageTask {
  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
}

async function sabotageTeam(teamId: string, sabotageTasks: SabotageTask[]) {
  const teamRef = doc(teams, teamId);
  try {
    await runTransaction(db, async (transaction) => {
      const teamDoc = await transaction.get(teamRef);
      if (!teamDoc.exists()) {
        throw "Document does not exist!";
      }
      const teamData = teamDoc.data();

      if (teamData.is_sabotaged) {
        throw "Team is already sabotaged!";
      }
      const sabotageTask = getRandomTask(sabotageTasks);

      // Update the teams is_sabotaged status and assign the sabotage task
      transaction.update(teamRef, {
        is_sabotaged: true,
        sabotaged_task_id: sabotageTask.id,
      });
    });
  } catch (e) {
    console.error("Transaction failed: ", e);
  }
}

export { sabotageTeam };
