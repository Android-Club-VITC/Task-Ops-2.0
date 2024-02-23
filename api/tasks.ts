import { getDocs, query } from "firebase/firestore";
import { tasks } from "../firebaseConfig";

interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
}

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

export type { Task };
