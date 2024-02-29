import { doc, updateDoc } from "firebase/firestore";
import { rounds, teams } from "../firebaseConfig";

const startRound = async (roundId: string) => {
  const roundRef = doc(rounds, "id", roundId);

  const res = await updateDoc(roundRef, {
    is_active: true,
  });

  return res;
};

const endRound = async (roundId: string) => {
  const roundRef = doc(rounds, "id", roundId);

  const res = await updateDoc(roundRef, {
    is_active: false,
  });

  return res;
};

const enableSabotageForTeam = async (teamName: string) => {
  const teamRef = doc(teams, "name", teamName);

  const res = await updateDoc(teamRef, {
    sabotage_team: true,
  });
  return res;
};

const qualifyTeamForFinals = async (teamName: string, roundId: string) => {
  const teamRef = doc(teams, "name", teamName);

  const res = await updateDoc(teamRef, {
    in_finals: true,
    round_id: roundId,
  });
  return res;
};

export { startRound, endRound, enableSabotageForTeam, qualifyTeamForFinals };