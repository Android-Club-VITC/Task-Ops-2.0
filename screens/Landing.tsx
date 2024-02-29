import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as React from "react";

const Landing = ({ navigation }: any) => {
  return (
    <>
      <SafeAreaView className="bg-black flex-1 w-full">
        <Image
          className="w-[375px] mt-20 h-[196px] mx-auto"
          source={require("../assets/landing_banner.png")}
          contentFit="contain"
        />

        <View className="z-[30] w-full flex h-56 mt-24 flex-row">
          <View className="w-1/2 h-full mx-auto border-r-2 border-r-white">
            <Text className="text-3xl font-aldrich font-thin text-center text-accent">
              REGISTER
            </Text>

            <Text className="text-[lg] mt-8 px-4 font-raleway text-center text-white font-normal">
              First time? Register your team and get a team code to pass on to
              your teammates
            </Text>
          </View>

          <View className="w-1/2 h-full mx-auto border-r-2 border-l-white">
            <Text className="text-3xl font-aldrich font-thin text-center text-accent">
              LOG IN
            </Text>

            <Text className="text-[lg] mt-8 px-4 font-raleway text-center text-white font-normal">
              Enter your team code here to see your tasks and move up the leader
              board!!
            </Text>
          </View>
        </View>
        <View className="w-full absolute bottom-6 z-[30]">
          <View className="w-40 mx-auto rounded-lg h-20 flex-row  bg-white">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register", {});
              }}
              className="px-2 h-full mx-auto my-auto"
            >
              <Image
                className="w-7 h-7 mx-auto my-auto"
                source={require("../assets/arrow_left.png")}
                contentFit="contain"
              />
            </TouchableOpacity>
            <View className="w-fit gap-x-0 flex flex-row">
              <Image
                className="w-3 h-14 mx-auto my-auto"
                source={require("../assets/Left-border.png")}
                contentFit="contain"
              />
              <Image
                className="w-3 h-14 mx-auto my-auto"
                source={require("../assets/Right-border.png")}
                contentFit="contain"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login", {});
              }}
              className="px-2 h-full mx-auto my-auto"
            >
              <Image
                className="w-7 h-7 mx-auto my-auto"
                source={require("../assets/arrow_right.png")}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Image
          className="absolute bottom-0 w-screen h-[35%] max-h-screen mx-auto my-auto"
          source={require("../assets/landing_circle.png")}
          contentFit="contain"
        />
      </SafeAreaView>
    </>
  );
};

export default Landing;
