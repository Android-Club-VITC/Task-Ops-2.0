import { View, Text, SafeAreaView, TouchableOpacity, TouchableHighlight } from "react-native";
import { Image } from "expo-image";
import * as React from "react";
const LandingPage = () => {
  return (
    <>
      <SafeAreaView className="bg-black flex-1 w-full">
        <View className="flex w-[full] mx-auto top-[103px] right-[8%]">
        <Image
          className="w-[375px] h-[196] mx-auto"
          source={require("../assets/landingtop.jpg")
          }
          contentFit="contain"
        />
        </View>
        <Text className="flex top-[22%] mx-auto w-full absolute text-[45px] text-center text-[#3ACCCC] font-normal shadow-2xl shadow-black">
        TASK OPS
        </Text>
        <Text className="top-[30%] right-[20%] mx-auto w-full absolute text-[45px] text-center text-[#3ACCCC] font-normal shadow-2xl shadow-black">
          2.0
        </Text>

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

        <View className="z-20 rotate-90 h-36 w-16 bg-white rounded-[15px] shadow-lg mt-[40%] mx-auto">
          <TouchableOpacity className="h-20 rounded-t-md mx-auto rotate-90">
            <Image className="h-16 w-16 bg-white z-[50] mx-auto my-auto rounded-md"
              source={require("../assets/left.svg")}
              contentFit="contain"
            />
            </TouchableOpacity>

            <Image
          className="rotate-90 w-8 h-12 bg-white my-auto mx-auto"
          source={require("../assets/bars.svg")}
          contentFit="contain"
        />

             <TouchableOpacity className="-rotate-90 h-20 rounded-t-md mx-auto">
            <Image className="h-16 w-16 bg-white z-[50] mx-auto my-auto rounded-md"
              source={require("../assets/left.svg")}
              contentFit="contain"
            />
          </TouchableOpacity>
         
        </View>
        
        <Image
          className="absolute  -bottom-[15%] w-screen h-72 max-h-screen right-[7%]"
          source={require("../assets/landingcircle.png")}
          contentFit="contain"
        />
      </SafeAreaView>
    </>
  );
};

export default LandingPage;
