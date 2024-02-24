import { getDocs, query } from "firebase/firestore";
import { tasks } from "../firebaseConfig";
import { Task } from "./models";

async function getAllTasks() {
  const q = query(tasks);

  const docs = (await getDocs(q)).docs;

  return docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Task[];
}

export { getAllTasks };
