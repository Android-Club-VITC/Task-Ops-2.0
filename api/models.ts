export interface Task {
  id: string;
  name: string;
  description: string;
  submission_key: string;
}

export interface Task_Team {
  task_id: number;
  points: number;
  status: "completed" | "viewed" | "unopened";
}

export interface Team {
  name: string;
  round_id: number;
  password: string;
  total_score: number;
  sabotaged_by: number;
  is_sabotaged: boolean;
  eligible_for_next_round: boolean;
  tasks: Task_Team[];
}

export interface Round {
  id: string;
  is_started: boolean;
}
