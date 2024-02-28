import { getDocs, query } from "firebase/firestore";
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
  }) as unknown as Team[];
};

export { getAllTeams };
