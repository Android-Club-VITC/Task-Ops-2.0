import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image, ImageBackground } from "expo-image";
import * as React from "react";

const TaskIncomplete:React.FC<{taskId:number; onComplete:(taskId:number) => void}> = ({taskId,onComplete}) => {
  return (
    <View className="flex items-center border border-black shadow-white rounded-lg shadow-2xl">
    <Image
     className="h-8 w-56"
     contentFit="cover"
     source={require("../assets/leaderbottom.svg")}
   />
   <Text className="text-white text-[14px] absolute font-extrabold top-[10%]" title="Complete" onPress={() => onComplete(taskId)}>TASK {taskId}</Text>
    </View>
  )
}

export default TaskIncomplete