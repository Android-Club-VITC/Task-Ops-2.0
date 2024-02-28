import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { setUserId } = React.useContext(UserContext);
  return (
    <View className="flex-1">
      <Text>Home</Text>
      <TouchableOpacity
        className="mx-auto my-auto bg-red-500 p-2 rounded-md"
        onPress={() => {
          setUserId(null);
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
