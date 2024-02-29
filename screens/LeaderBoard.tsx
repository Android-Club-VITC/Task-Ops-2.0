import { View, Text, SafeAreaView} from "react-native";
import { Image} from "expo-image";
import * as React from "react";
import Navigation from "../components/Navigation"

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
<View className="flex-col justify-center mx-auto w-full">
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
<View className="flex mt-[10px]">

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
<Navigation />


    </View>
    </SafeAreaView>
  )
}

export default LeaderBoard;