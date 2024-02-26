import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Task } from "../api/models";
import { getAllTasks } from "../api/tasks";
import LandingPage from "./Landing";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); // Make sure to create types globally instead of using any

  useEffect(() => {
    (async () => {
      const tasks = await getAllTasks();
      setTasks(tasks);
    })();
  }, []);

  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
  });

  return (
    <>
    <LandingPage />
    </>
  );
}
