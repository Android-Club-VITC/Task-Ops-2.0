import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Image } from "expo-image";
import * as React from "react";
import { TaskContext } from "../context/TaskContext";
import { UserContext } from "../context/UserContext";
import { submitCodeForTask } from "../api/tasks";
import { delay } from "../utils/helpers";

const TaskPage = () => {
  const { taskInfo, setTaskInfo } = React.useContext(TaskContext);
  const { userId } = React.useContext(UserContext);
  if (!taskInfo) return <Text>Loading...</Text>;
  const [code, setCode] = React.useState("");
  const [time, setTime] = React.useState(0);
  const [points, setPoints] = React.useState(0);

  React.useEffect(() => {
    const initialTime = taskInfo.initialTime;
    setTime(initialTime);
    const interval = setInterval(() => {
      setTime((prev) => {
        setTaskInfo({
          ...taskInfo,
          initialTime: prev,
        });
        return prev + 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const submitTask = async () => {
    if (!code) {
      ToastAndroid.show("Please enter code", ToastAndroid.SHORT);
      return;
    }
    if (!userId) {
      ToastAndroid.show("User not logged in", ToastAndroid.SHORT);
      return;
    }
    try {
      const res = await submitCodeForTask(
        userId,
        taskInfo.id,
        code,
        time,
        points
      );

      if (res.success) {
        ToastAndroid.show("Task Completed", ToastAndroid.SHORT);
        setTaskInfo(null);
      } else {
        if (res.message === "You are sabotaged! Please finish that first") {
          ToastAndroid.show(
            res.message + "Routing Back To Progress Page!",
            ToastAndroid.SHORT
          );
          await delay(1000);
          setTaskInfo(null);
          return;
        }
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log((e as any).message);
    }
  };

  return (
    <>
      <SafeAreaView>
        <View className="bg-black h-[100%] w-[100%] mx-auto  pt-[5%]">
          <View className="flex-row w-[90%] mx-auto mt-[2%]">
            <Image
              className="h-32 w-28"
              contentFit="cover"
              source={require("../assets/taskpage-header.svg")}
            />
            <Text className="text-[35px] text-center text-accent shadow-2xl shadow-white absolute top-[25%] left-[15%]">
              {taskInfo.name}
            </Text>
          </View>

          <View className="flex-col items-center">
            <View className="flex w-[100%] mx-auto items-center">
              <Image
                className="h-[250px] w-[300px]"
                contentFit="cover"
                source={require("../assets/taskpage-bg.svg")}
              />

              <Text className="text-[11px] text-wrap text-white shadow-2xl shadow-white absolute top-[30%] left-[20%] w-[70%]">
                {taskInfo.description}
              </Text>
              <Text className="text-[12px] text-center text-white shadow-2xl shadow-white absolute top-[64%] right-[6%] bg-[#019ABA] w-[36px] h-[32px] py-[5px] rounded-lg">
                PTS
              </Text>
            </View>

            <View className="flex w-[100%] mx-auto items-center">
              <Image
                className="h-6 w-[90%] rounded-xl"
                contentFit="cover"
                source={require("../assets/progress-bar.svg")}
              />

              <Image
                className="h-4 w-[40%] absolute top-[15%] left-[5%] rounded-xl"
                contentFit="cover"
                source={require("../assets/progress-meter.svg")}
              />
            </View>

            <Text className="text-[#43FFFF] text-[20px] text-center">
              {time}
            </Text>
          </View>

          <TextInput
            textContentType="password"
            secureTextEntry={true}
            onChange={(event) => {
              setCode(event.nativeEvent.text);
            }}
            placeholder="Enter code"
            className="w-[90%] mx-auto h-14 bg-white rounded-xl mt-8 shadow-2xl text-center text-xl"
          />

          <TextInput
            onChange={(event) => {
              setPoints(Number(event.nativeEvent.text));
            }}
            value={points.toString()}
            keyboardType="numeric"
            defaultValue="0"
            placeholder="Enter Points"
            className="w-[90%] mx-auto h-14 bg-white rounded-xl mt-8 shadow-2xl text-center text-xl"
          />

          <TouchableOpacity
            onPress={() => {
              submitTask();
            }}
            className="w-[50%] mt-20 mx-auto h-14 bg-white rounded-xl  top-[10%] shadow-2xl"
          >
            <Text className="text-3xl text-center my-auto font-bold">DONE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TaskPage;
