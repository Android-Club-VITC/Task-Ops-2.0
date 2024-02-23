import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Task, getAllTasks } from "../api/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); // Make sure to create types globally instead of using any

  useEffect(() => {
    (async () => {
      const tasks = await getAllTasks();
      setTasks(tasks);
    })();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-purple-100">
      <Text className="text-2xl">Welcome to the task ops app! 🚀</Text>

      <ScrollView className="flex-1 w-full mt-4 p-4 max-h-52">
        {tasks.map((task) => {
          return (
            <View
              key={task.id}
              className="bg-white p-4 m-2  rounded-md shadow-md"
            >
              <Text className="text-lg text-center">{task.name}</Text>
              <Text className="text-sm text-center">
                {task.isCompleted ? "Completed" : "Not completed"}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
