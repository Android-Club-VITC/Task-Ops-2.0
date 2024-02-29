import { Task } from "./models";
import { getCurrentActiveRound } from "./rounds";
import { getTeamById } from "./teams";

function successResponse(data: Task[], message: string) {
  return {
    message,
    data,
    success: true,
  };
}

function errorResponse(message: string) {
  return {
    message,
    data: [] as Task[],
    success: false,
  };
}

export async function getTasksForTeam(team_id: string) {
  try {
    const roundWhichIsActive = await getCurrentActiveRound();

    if (!roundWhichIsActive) {
      return errorResponse("Your Round Has not started yet!");
    }

    const team = await getTeamById(team_id);

    if (!team) {
      return errorResponse(`No user found with id ${team_id}`);
    }

    if (team.round_id !== Number(roundWhichIsActive.id)) {
      return errorResponse("Your Round Has not started yet!");
    }

    if (roundWhichIsActive.is_final) {
      return successResponse(team.final_tasks, "success");
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
          return errorResponse("No Task Found For Sabotage!");
        }

        return successResponse([sab_tasks], "success");
      } else {
        return successResponse(team.normal_tasks, "success");
      }
    }
  } catch (e) {
    throw new Error((e as any).message);
  }
}
