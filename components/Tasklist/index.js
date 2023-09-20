import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import LeaderboardCard from "../leaderboardCard";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TaskListCard from "../tasklistCard";

function TaskList(props) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (

    <View style={styles.container}>
        <FlatList
            data={props.data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", paddingBottom: wp(1) }}
            keyExtractor={(item) => item.teamCode}
            ItemSeparatorComponent={() => (
              <View style={{ height: wp(2) }}></View>
            )}
            renderItem={({ item, index }) => (
              <TaskListCard data={item} index={index} navigation={props.navigation}/>
            )}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontSize: hp("5%"),
  },
  container: {
    flex: 1,
    marginTop: 10,
    borderRadius: wp("10%"),
    //backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-evenly",
    // alignItems:'stretch',
    //margin: wp("2%"),
    //padding: wp("1%"),
    //maxHeight:hp('20')
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(95),
    height: hp(9),
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#CF4722",
    backgroundColor:"#EB7F27"
  },
  modalText: {
    color: "white",
    marginBottom: 15,
    textAlign: "center",
    fontSize: hp(3),
    fontWeight: "bold",
  },
  modalView: {
    marginHorizontal: hp("10"),
    marginTop: hp("15"),
    backgroundColor: "#00a86b",
    borderRadius: wp("5"),
    padding: hp("2"),
    maxHeight: hp(60),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 100,
  },

  descriptionText: {
    fontStyle: "italic",
    marginBottom: hp("2"),
  },
  input: {
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderColor: "teal",

    //justifyContent:'center',
    //alignItems:'center',
  },
  codeModalView: {
    marginHorizontal: hp("10"),
    marginTop: hp("25"),
    backgroundColor: "#00a86b",
    borderRadius: wp("5"),
    padding: hp("2"),
    maxHeight: hp(60),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 100,
  },
});

export default TaskList;
