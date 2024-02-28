import { query, getDocs, where } from "firebase/firestore";
import { Team, Round } from "./models";
import { teams, rounds } from "../firebaseConfig";

async function getActiveTeams() {
  // First, find all active rounds
  const activeRoundsQuery = query(rounds, where("is_active", "==", true));
  const activeRoundsDocs = (await getDocs(activeRoundsQuery)).docs;

  const activeRoundIds = activeRoundsDocs.map((doc) => doc.id);

  // findinf all teams that are in the active rounds
  let activeTeams: any[] = [];
  for (const roundId of activeRoundIds) {
    const teamsInRoundQuery = query(teams, where("round_id", "==", roundId));
    const teamsInRoundDocs = (await getDocs(teamsInRoundQuery)).docs;
    const teamsData = teamsInRoundDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as Team[]; //remove the unknown after the Team structure is defined
    activeTeams = activeTeams.concat(teamsData);
  }

  return activeTeams;
}

export { getActiveTeams };
