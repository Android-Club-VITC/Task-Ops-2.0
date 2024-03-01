import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { getGlobalLeaderBoard, getTeamById } from "../api/teams";
import { Team } from "../api/models";
import { Button } from "react-native-elements";

export default function Sabotage() {
  const { userId } = React.useContext(UserContext);
  const [teams, setTeams] = useState<Team[]>();
  const [canSabotage, setCanSabotage] = useState(true);

  useEffect(() => {
    fetchSabotageStatus();
  }, []);

  const fetchSabotageStatus = async () => {
    try {
      const loggedInTeam = await getTeamById(userId ?? "");
      //   setCanSabotage(loggedInTeam?.can_sabotage ?? false);
      setCanSabotage(true);

      const t = await getGlobalLeaderBoard();
      setTeams(t.filter((team) => team.name !== loggedInTeam?.name));
    } catch (e) {
      console.log("error", e);
    }
  };

  const sabotageTeam = async (teamName: string) => {
    if (!canSabotage) return;
    // call teh method
    const res = await sabotageTeam(teamName);
  };

  return (
    <SafeAreaView>
      <View className="bg-black h-[100%] overflow-hidden flex flex-col items-center">
        <View className="flex-row justify-between items-center w-full pt-10">
          <Image
            className="h-48 w-16"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
          <Image
            className="h-8 w-48 mt-5"
            contentFit="cover"
            source={require("../assets/SABOTAGE.svg")}
          />
          <Image
            className="h-48 w-16 rotate-180 mt-5"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
        </View>
        <View>
          {canSabotage ? (
            <View>
              <Text>Select Team to sabotage</Text>
              <View className="w-full h-[60%] mt-3">
                <FlatList
                  data={teams}
                  renderItem={({ item, index }) => (
                    <View className="flex">
                      <Text className="text-white">
                        {index + 1} {item.name}
                      </Text>
                      <Button onPress={() => sabotageTeam(item.name)}></Button>
                    </View>
                  )}
                />
              </View>
            </View>
          ) : (
            <Text className="text-white">You are not eligible to sabotage</Text>
          )}
        </View>
        <TouchableOpacity
          className="absolute flex flex-row p-3 items-center gap-x-5 bg-secondary rounded-xl justify-center bottom-5"
          onPress={fetchSabotageStatus}
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
}
