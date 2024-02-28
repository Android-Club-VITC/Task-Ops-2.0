import { getDocs, orderBy, query, where } from "firebase/firestore";
import { teams } from "../firebaseConfig";
import { Team } from "./models";

const getAllTeams = async () => {
  const q = query(teams);

  const docs = (await getDocs(q)).docs;

  return docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Team[];
};

const getLocalLeaderBoard = async (roundId: string) => {
  const q = query(
    teams,
    where("round_id", "==", roundId),
    orderBy("total_score", "desc")
  );
  const data = (await getDocs(q)).docs;
  return data;
};

const getGlobalLeaderBoard = async (roundId: string) => {
  const q = query(teams, orderBy("total_score", "desc"));
  const data = (await getDocs(q)).docs;
  return data;
};

export { getAllTeams, getLocalLeaderBoard, getGlobalLeaderBoard };
