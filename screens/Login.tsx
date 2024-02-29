import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginTeam } from "../api/teams";
import { delay } from "../utils/helpers";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [teamName, setTeamName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { setUserId } = useContext(UserContext);

  const submit = async () => {
    if (!teamName || !password) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const res = await loginTeam(teamName, password);

      ToastAndroid.show("Team logged in successfully!", ToastAndroid.SHORT);

      delay(500);

      await setUserId(res.id);
    } catch (e) {
      ToastAndroid.show((e as any).message, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Image
        contentFit="contain"
        className="flex-1 mt-12 absolute h-screen w-[100vw] bg-black"
        contentPosition={"bottom"}
        source={require("../assets/auth_bg.png")}
      />
      <Text className="uppercase text-6xl mt-20 font-aldrich font-thin text-center text-accent">
        LOGIN
      </Text>

      <View className="relative w-full top-5 inset-0 mx-auto my-auto space-y-10">
        <TextInput
          className="w-[70%] mx-auto h-12 bg-white rounded-xl text-2xl p-2"
          placeholder="Team Name"
          onChange={(e) => {
            setTeamName(e.nativeEvent.text);
          }}
        />
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          className="w-[70%] mx-auto h-12 bg-white rounded-xl text-2xl p-2"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.nativeEvent.text);
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          submit();
        }}
        className="relative w-[70%] mx-auto h-14 bg-white rounded-xl bottom-10"
      >
        <Text className="text-3xl text-center my-auto font-bold">SUBMIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
