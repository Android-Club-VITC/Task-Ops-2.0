import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as React from "react";
const LandingPage = () => {
  return (
    <>
      <SafeAreaView className="bg-black flex-1 w-full">
        <View className="flex justify-center items-center w-[100%] mx-auto top-[15%]">
          <Image
            className="w-[375px] h-[196px]"
            source={require("../assets/landingtop.jpg")}
            contentFit="contain"
          />
          <Image
            className="w-[240px] h-[180px] mx-auto absolute top-[15%]"
            source={require("../assets/Landing-text.svg")}
            contentFit="contain"
          />
        </View>

        <View className="w-full flex h-56 flex-row top-[20%]">
          <View className="w-1/2 h-full mx-auto mt-12 border-r-2 border-r-white">
            <Text className="text-2xl text-center text-cyan-300 font-normal">
              REGISTER
            </Text>

            <Text className="text-[lg] mt-8 px-4 text-center text-white font-normal">
              First time? Register your team and get a team code to pass on to
              your teammates
            </Text>
          </View>

          <View className="w-1/2 h-full mx-auto mt-12 border-r-2 border-l-white">
            <Text className="text-2xl text-center text-cyan-300 font-normal">
              LOG IN
            </Text>

            <Text className="text-[lg] mt-8 px-4 text-center text-white font-normal">
              Enter your team code here to see your tasks and move up the leader
              board!!
            </Text>
          </View>
        </View>

        <View className="w-[40%] h-[10%] bg-white -bottom-[55%] flex-row items-center mx-auto justify-center rounded-xl z-[10]">
          <TouchableOpacity className="mx-auto h-16 w-[50%]">
          <Image
            className="h-16 w-[100%]"
            source={require("../assets/left.svg")}
            contentFit="contain"
          />
          </TouchableOpacity>

          <Image
            className="h-16 w-4"
            source={require("../assets/bars.svg")}
            contentFit="contain"
          />

         <TouchableOpacity className="mx-auto h-16 w-[50%]">
         <Image
            className="h-16 w-[100%]"
            source={require("../assets/right.svg")}
            contentFit="contain"
          />
         </TouchableOpacity>
        </View>

        <Image
          className="absolute -bottom-[15%] w-screen h-72 max-h-screen right-[7%]"
          source={require("../assets/landingcircle.png")}
          contentFit="contain"
        />
      </SafeAreaView>
    </>
  );
};

export default LandingPage;
