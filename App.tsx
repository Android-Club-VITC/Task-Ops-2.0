import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Register from "./screens/Register";
import TaskPage from "./screens/TaskPage";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import Home from "./screens/Home";
import { UserContext } from "./context/UserContext";
import LeaderBoard from "./screens/LeaderBoard";
import Progress from "./screens/Progress";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "./api/models";
import { TaskContext } from "./context/TaskContext";
import Sabotage from "./screens/Sabotage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [taskInfo, setTaskInfo] = useState<
    (Task & { initialTime: number }) | null
  >(null);
  const { getItem, setItem, removeItem } = useAsyncStorage("@user_id");
  const {
    getItem: getTask,
    setItem: setTask,
    removeItem: removeTask,
  } = useAsyncStorage("@task_info");

  useEffect(() => {
    async function fn() {
      const id = await getItem();
      const task = await getTask();
      if (task) setTaskInfo(JSON.parse(task));
      setUserId(id);
    }
    fn();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        setTaskInfo: async (
          taskInfo: (Task & { initialTime: number }) | null
        ) => {
          if (!taskInfo) {
            await removeTask();
            setTaskInfo(null);
            return;
          }

          await setTask(JSON.stringify(taskInfo));
          setTaskInfo(taskInfo);
          return;
        },
        taskInfo,
      }}
    >
      <UserContext.Provider
        value={{
          setUserId: async (userId) => {
            if (!userId) {
              await removeItem();
              setUserId(null);
              return;
            }
            await setItem(userId);
            setUserId(userId);
          },
          userId,
        }}
      >
        <NavigationContainer>
          {userId ? (
            <HomeStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {taskInfo ? (
                <HomeStack.Screen name="TaskPage" component={TaskPage} />
              ) : (
                <HomeStack.Screen name="Home">
                  {() => (
                    <Tab.Navigator
                      screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: "#000000",
                        tabBarInactiveTintColor: "lightgray",
                      }}
                      initialRouteName={"Tasks"}
                    >
                      <Tab.Screen
                        name="Tasks"
                        component={Progress}
                        options={{
                          tabBarLabel: "Tasks",
                          tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list" color={color} size={size} />
                          ),
                        }}
                      />
                      <Tab.Screen
                        name="Leaderboard"
                        component={LeaderBoard}
                        options={{
                          tabBarLabel: "Leaderboard",
                          tabBarIcon: ({ color, size }) => (
                            <Ionicons name="flag" color={color} size={size} />
                          ),
                        }}
                      />
                      <Tab.Screen
                        name="Sabotage"
                        component={Sabotage}
                        options={{
                          tabBarLabel: "Sabotage",
                          tabBarIcon: ({ color, size }) => (
                            <Ionicons name="skull" color={color} size={size} />
                          ),
                        }}
                      />
                    </Tab.Navigator>
                  )}
                </HomeStack.Screen>
              )}
            </HomeStack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          )}
          <StatusBar style="auto" />
        </NavigationContainer>
      </UserContext.Provider>
    </TaskContext.Provider>
  );
}
