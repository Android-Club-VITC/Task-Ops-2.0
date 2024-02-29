import { addDoc, getDocs, query, where } from "firebase/firestore";
import {
  finalTaskList,
  normalTaskList,
  sabotageTaskList,
} from "../constants/tasks";
import { Team } from "./models";
import { teams } from "../firebaseConfig";

export async function registerTeam(
  name: string,
  password: string,
  round_id: number
) {
  const team = (await getDocs(query(teams, where("name", "==", name)))).docs;
  if (team.length > 0)
    throw new Error("Team name already exists! Please try another name.");

  const payload: Team = {
    name,
    password,
    round_id,
    total_score: 0,
    is_sabotaged: false,
    sabotaged_task_id: 0,
    is_final: false,

    sabotage_tasks: [...sabotageTaskList],
    normal_tasks: [...normalTaskList],
    final_tasks: [...finalTaskList],
    recently_solved_timestamp: new Date().getUTCSeconds(),
  };

  const createdTeam = await addDoc(teams, payload);

  return createdTeam.id;
}

export const loginTeam = async (name: string, password: string) => {
  const team = (await getDocs(query(teams, where("name", "==", name)))).docs;
  if (team.length === 0) throw new Error("Team not found!");

  const teamData = team[0].data();
  if (teamData.password !== password) throw new Error("Invalid Password!");

  return {
    id: team[0].id,
    ...teamData,
  };
};
