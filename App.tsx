import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import Home from "./screens/Home";
import { UserContext } from "./context/UserContext";
import LeaderBoard from "./screens/LeaderBoard";
import Progress from "./screens/Progress";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const { getItem, setItem, removeItem } = useAsyncStorage("@user_id");

  useEffect(() => {
    async function fn() {
      const id = await getItem();
      setUserId(id);
    }
    fn();
  }, []);

  return (
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
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#000000",
              tabBarInactiveTintColor: "lightgray",
            }}
            initialRouteName={"Tasks"}
          >
            {/* <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            /> */}
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
          </Tab.Navigator>
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
  );
}
