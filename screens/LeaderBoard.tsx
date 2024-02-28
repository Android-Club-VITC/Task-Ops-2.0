import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image, ImageBackground } from "expo-image";
import * as React from "react";


const LeaderBoard = () => {
  return (
    <SafeAreaView>
    <View className="bg-black h-[100%] overflow-hidden flex flex-col">

      {/* Leader Header Section */}

    <View className="flex-row justify-between w-full mt-[10%]">
    <Image
        className="h-48 w-16"
        contentFit="cover"
        source={require("../assets/leaderboard-header.svg")}
      />
      <Image
        className="h-[90px] w-48 mt-[20%]"
        contentFit="cover"
        source={require("../assets/leader-heading.svg")}
      />
       <Image
        className="h-48 w-16 rotate-180"
        contentFit="cover"
        source={require("../assets/leaderboard-header.svg")}
      />
    </View>

{/* Ranks and Points Header */}
    <View className="flex-row justify-around mt-[60px]">
        <Text className="text-[#43FFFF] text-[20px] text-center">
            RANK
        </Text>
        <Text className="text-[#43FFFF] text-[20px] text-center">
            POINTS
        </Text>
    </View>



{/* Top 3 teams */}
<View className="flex-col gap-2 justify-center mx-auto w-full">
    <View className="w-full mx-auto">
    <Image
        className="h-16 w-[90%] mx-auto"
        contentFit="cover"
        source={require("../assets/leadertop.png")}
      />

      <View className="flex-row justify-around px-auto absolute top-[23px] left-[20%]">
      <Text className="text-[#43FFFF] text-[14px] text-center mr-[98px] ml-[2px]">1. TEAM A</Text>
      <Text className="text-[#43FFFF] text-[14px] text-center">0</Text>
      </View>
    </View>

    <View className="w-full mx-auto">
    <Image
        className="h-16 w-[90%] mx-auto"
        contentFit="cover"
        source={require("../assets/leadertop.png")}
      />

      <View className="flex-row justify-around px-auto absolute top-[23px] left-[20%]">
      <Text className="text-[#43FFFF] text-[14px] text-center mr-[98px] ml-[2px]">2. TEAM B</Text>
      <Text className="text-[#43FFFF] text-[14px] text-center">0</Text>
      </View>
    </View>

   <View className="w-full mx-auto">
    <Image
        className="h-16 w-[90%] mx-auto"
        contentFit="cover"
        source={require("../assets/leadertop.png")}
      />

      <View className="flex-row justify-around px-auto absolute top-[23px] left-[20%]">
      <Text className="text-[#43FFFF] text-[14px] text-center mr-[98px] ml-[2px]">3. TEAM C</Text>
      <Text className="text-[#43FFFF] text-[14px] text-center">0</Text>
      </View>
    </View>
</View>


{/* Next 3 Teams */}
<View className="flex gap-2 mt-[10px]">

<View className="w-full mx-auto">
    <Image
        className="h-8 w-[80%] mx-auto"
        contentFit="cover"
        source={require("../assets/leaderbottom.svg")}
      />

      <View className="flex-row justify-around px-auto absolute top-[5px] left-[20%]">
      <Text className="text-[#43FFFF] text-[14px] text-center mr-[98px] ml-[2px]">4. TEAM D</Text>
      <Text className="text-[#43FFFF] text-[14px] text-center">0</Text>
      </View>
    </View>


    <View className="w-full mx-auto">
    <Image
        className="h-8 w-[80%] mx-auto"
        contentFit="cover"
        source={require("../assets/leaderbottom.svg")}
      />
      <View className="flex-row justify-around px-auto absolute top-[5px] left-[20%]">
      <Text className="text-[#43FFFF] text-[14px] text-center mr-[98px] ml-[2px]">5. TEAM E</Text>
      <Text className="text-[#43FFFF] text-[14px] text-center">0</Text>
      </View>
    </View>


    <View className="w-full mx-auto">
    <Image
        className="h-8 w-[80%] mx-auto"
        contentFit="cover"
        source={require("../assets/leaderbottom.svg")}
      />

      <View className="flex-row justify-around px-auto absolute top-[5px] left-[20%]">
      <Text className="text-[#43FFFF] text-[14px] text-center mr-[98px] ml-[2px]">6. TEAM F</Text>
      <Text className="text-[#43FFFF] text-[14px] text-center">0</Text>
      </View>
    </View>
</View>


{/* Navigation Bar (bottom) */}
<View className="bg-white absolute bottom-[10px] w-[100%] h-[5%] rounded-2xl flex-row justify-around items-center">
    <TouchableOpacity className="w-[45%] flex-row justify-around items-center">
    <Image
        className="h-4 w-4 mx-auto my-auto"
        contentFit="cover"
        source={require("../assets/percentage.svg")}
      />
      <Text className="text-black text-[12px]"> Progress </Text>
    </TouchableOpacity>

    
    <Image
        className="h-6 w-4 mx-auto my-auto"
        contentFit="cover"
        source={require("../assets/bars-leader.svg")}
      />

<TouchableOpacity className="w-[45%] flex-row items-center justify-around mr-[5px]">
    <Image
        className="h-4 w-4 mx-auto"
        contentFit="cover"
        source={require("../assets/list.svg")}
      />
      <Text className="text-black text-[12px]"> Leaderboard </Text>

    </TouchableOpacity>
</View>


    </View>
    </SafeAreaView>
  )
}

export default LeaderBoard;