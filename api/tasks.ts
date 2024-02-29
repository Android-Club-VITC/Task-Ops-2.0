import { Task } from "./models";
import { getCurrentActiveRound } from "./rounds";
import { getTeamById } from "./teams";

export async function getTasksForTeam(team_id: string) {
  try {
    const roundWhichIsActive = await getCurrentActiveRound();

    if (!roundWhichIsActive) {
      return {
        message: "Your Round Has not started yet!",
        data: [],
      };
    }

    const team = await getTeamById(team_id);

    if (!team) {
      return {
        message: `No user found with id ${team_id}`,
        data: [],
      };
    }

    if (team.round_id !== Number(roundWhichIsActive.id)) {
      return {
        message: "Your Round Has not started yet!",
        data: [],
      };
    }

    if (roundWhichIsActive.is_final) {
      return {
        message: "success",
        data: team.final_tasks,
      };
    } else {
      if (team.is_sabotaged) {
        const sab_tasks = team.sabotage_tasks.find((t) => {
          if (t.id == team.sabotaged_task_id) {
            return true;
          } else {
            return false;
          }
        });

        if (!sab_tasks) {
          return {
            message: "No Task Found For Sabotage!",
            data: [],
          };
        }

        return {
          message: "success",
          data: [sab_tasks],
        };
      } else {
        return {
          message: "success",
          data: team.normal_tasks,
        };
      }
    }
  } catch (e) {
    throw new Error((e as any).message);
  }
}
