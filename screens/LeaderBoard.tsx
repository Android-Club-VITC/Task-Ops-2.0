import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Team } from "../api/models";
import { getGlobalLeaderBoard } from "../api/teams";

function Top3Teams({ team, index }: { team: Team; index: number }) {
  return (
    <View className="w-full mx-auto mt-5">
      <Image
        className="h-16 w-[100%] mx-auto"
        contentFit="cover"
        source={require("../assets/leadertop.png")}
      />

      <View className="flex-row justify-around w-full items-center px-auto absolute top-7">
        <Text className="text-[#43FFFF] text-ellipsis max-w-xs text-[14px] text-center">
          {index}. {team.name}
        </Text>
        <Text className="text-[#43FFFF]  text-[14px] text-center">
          {team.total_score}
        </Text>
      </View>
    </View>
  );
}

function Next3Teams({ team, index }: { team: Team; index: number }) {
  return (
    <View className="w-full mt-5 mx-auto">
      <Image
        className="h-8 w-[90%] mx-auto"
        contentFit="cover"
        source={require("../assets/leaderbottom.svg")}
      />

      <View className="flex-row justify-around px-auto absolute top-[5px] left-[20%]">
        <Text className="text-[#43FFFF] text-[14px] text-center mr-[98px] ml-[2px]">
          {index}. {team.name}
        </Text>
        <Text className="text-[#43FFFF] text-[14px] text-center">
          {team.total_score}
        </Text>
      </View>
    </View>
  );
}

const LeaderBoard = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const t = await getGlobalLeaderBoard();
        setTeams(t);
      } catch (e) {
        console.log("error", e);
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <View className="bg-black h-[100%] overflow-hidden flex flex-col items-center">
        {/* Leader Header Section */}

        <View className="flex-row justify-between w-full mt-12">
          <Image
            className="h-48 w-16 mt-[2px]"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
          <Image
            className="h-[90px] w-48 mt-16"
            contentFit="cover"
            source={require("../assets/leader-heading.svg")}
          />
          <Image
            className="h-48 w-16 rotate-180 mt-3"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
        </View>

        {/* Ranks and Points Header */}
        <View className="flex-row w-full justify-around mt-[60px]">
          <Text className="text-[#43FFFF] text-[20px] text-center">RANK</Text>
          <Text className="text-[#43FFFF] text-[20px] text-center">POINTS</Text>
        </View>

        {/* Top 3 teams */}
        <View className="w-full h-[60%] mt-3">
          <ScrollView className="flex-col mx-auto w-full">
            {/* // show only first 3. make sure the case when the available teams is less than 3 */}

            {teams
              .filter((_, i) => i < 3)
              .map((team, i) => (
                <Top3Teams index={i + 1} key={i} team={team} />
              ))}

            {teams
              .filter((_, i) => i >= 3)
              .map((team, i) => (
                <Next3Teams index={i + 4} key={i} team={team} />
              ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          className="absolute flex flex-row p-3 items-center gap-x-5 bg-secondary rounded-xl justify-center bottom-5"
          onPress={async () => {
            try {
              ToastAndroid.show("Refreshing...", ToastAndroid.SHORT);
              const t = await getGlobalLeaderBoard();
              setTeams(t);
            } catch (e) {
              console.log("error", e);
            }
            ToastAndroid.show("Refreshed", ToastAndroid.SHORT);
          }}
        >
          <Image
            className="h-8 w-8"
            contentFit="cover"
            source={require("../assets/refresh.svg")}
          />
          <Text className="text-white text-xl mr-3">Refresh</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LeaderBoard;
