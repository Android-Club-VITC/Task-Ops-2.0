import { query, getDocs, where } from "firebase/firestore";
import { Team, Round } from "./models";
import { teams, rounds } from "../firebaseConfig";

async function getActiveTeams() {
  // First, find all active rounds
  const activeRoundsQuery = query(rounds, where("is_active", "==", true));
  const activeRoundsDocs = (await getDocs(activeRoundsQuery)).docs;

  const activeRoundIds = activeRoundsDocs.map((doc) => doc.id);

  // Find all teams that are in the active rounds and not sabotaged
  let activeTeams: Team[] = [];
  for (const roundId of activeRoundIds) {
    const teamsInRoundQuery = query(
      teams,
      where("round_id", "==", roundId),
      where("is_sabotaged", "==", false)
    );
    const teamsInRoundDocs = (await getDocs(teamsInRoundQuery)).docs;
    const teamsData = teamsInRoundDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as Team[]; //remove the unknow in future 
    activeTeams = activeTeams.concat(teamsData);
  }

  // Filter teams that are both in an active round and not sabotaged
  const activeNonSabotagedTeams = activeTeams.filter(team => !team.is_sabotaged);

  return activeNonSabotagedTeams;
}

export { getActiveTeams };
