import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Home from "./screens/Home";
import { UserContext } from "./context/UserContext";

const Stack = createNativeStackNavigator();

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
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {userId ? (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
            <>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
