import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as React from "react";
import Navigation from "../components/Navigation";

const TaskPage = () => {
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
              TASK NAME
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              aspernatur rem iusto debitis corporis earum expedita facere minima
              doloremque consequatur?
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
              className="h-4 w-[80%] absolute top-[15%] left-[5%] rounded-xl"
              contentFit="cover"
              source={require("../assets/progress-meter.svg")}
            />
          </View>

          <Text className="text-[#43FFFF] text-[20px] text-center">
              00:55
            </Text>
         </View>


          <TouchableOpacity className="w-[50%] mx-auto h-14 bg-white rounded-xl  top-[10%] shadow-2xl">
            <Text className="text-3xl text-center my-auto font-bold">DONE</Text>
          </TouchableOpacity>
        </View>

        <Navigation />
      </SafeAreaView>
    </>
  );
};

export default TaskPage;
