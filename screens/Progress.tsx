import { View, Text, SafeAreaView} from "react-native";
import { Image } from "expo-image";
import * as React from "react";
import { useState } from "react";
import Navigation from "../components/Navigation";
import TaskCompleted from "../components/TaskCompleted";
import TaskIncomplete from "../components/TaskIncomplete";

const Progress = () => {

    const [activity, setActivity] = useState(Array(10).fill(false));

    const completion = (taskId: number) => {
        const updateTask = [...activity];
        updateTask[taskId] = true;
        setActivity(updateTask);
    }

  return (
    <SafeAreaView>
      <View className="bg-black h-[100%] overflow-hidden flex flex-col items-center">
        <View className="flex-row justify-between w-full mt-[10%]">
          <Image
            className="h-48 w-16"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
          <Image
            className="h-8 w-48 mt-[25%]"
            contentFit="cover"
            source={require("../assets/progress-header.svg")}
          />
          <Image
            className="h-48 w-16 rotate-180"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
        </View>

        <View className="w-[100%] flex items-center justify-center">
    
          {activity.map((isCompleted, index) => (
            isCompleted ? <TaskCompleted key={index} taskId={index} /> : 
            <TaskIncomplete key={index} taskId={index} onComplete={completion} />
          ))}
          
        </View>
      </View>

      {/* <Header title="progress-header"/> */}
      <Navigation />
    </SafeAreaView>
  );
};

export default Progress;
