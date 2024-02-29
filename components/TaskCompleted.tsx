import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image, ImageBackground } from "expo-image";
import * as React from "react";

const TaskCompleted:React.FC<{ taskId: number }> = ({ taskId })=> {
  return (
    <>
    <View className="flex items-center mt-[1.2%]">
            <Image
              className="h-[36] w-[232px]"
              contentFit="cover"
              source={require("../assets/task-complete.svg")}
            />
            <Text className="text-white text-[13px] absolute top-[10%] font-extrabold">TASK {taskId} </Text>
            <Text className="text-white text-[8px] absolute top-[65%] font-bold left-[42%]">COMPLETED</Text>
            {/* <Image
              className="h-8 w-56"
              contentFit="cover"
              source={require("../assets/leaderbottom.svg")}
            /> */}
          </View>
    </>
  )
}

export default TaskCompleted