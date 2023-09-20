import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spinner from "react-native-modal-spinner";
import Task from "../../components/Task";
import TaskList from '../../components/Tasklist'
import { tasklist } from '../../auth';
import { useFonts } from 'expo-font';
import { getDocs, query } from "firebase/firestore";
import { User } from "../../utils/providers/UserProvider";
import { updateTeam, getTeam } from "../../utils/database/teams";
import { options } from '../../auth';

function Progress(props) {
  const [loading, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    'Pacman': require('../../assets/pacman.ttf'),
  });
  const [tasks, setTasks] = useState([]);
  const [teamCode, setTeamCode] = useState("");
  useEffect(() => {
    setLoading(true);
    getDocs(query(tasklist))
      .then(res => res.docs)
      .then(res => {
        const data = [];
        res.forEach(val => data.push(val.data()))
        setTasks(data)
        setLoading(false);
      })
      .catch(err => alert("Some error occured! Please try again"));
  }, []);
  const userContext = useContext(User);
  if (userContext.userData.alert) {
    return (
      <>
        <Image
          source={require("../../assets/background.jpg")}
          style={{ position: "absolute", height: hp(100), width: wp(100) }}
        />
        <Spinner
          color="#F3BA15"
          size="large"
          backgroundColor="#ED7B25"
          visible={loading}
      />
        <View style={styles.container}>
          <Text style={styles.text}>Alert</Text>
          <Text style={{ color: "white", fontFamily: "Pacman", color: "yellow", fontSize: wp(9), marginVertical: 10 }}>999999999999999</Text>
          <Text style={{ color: "white", fontFamily: "Pacman", color: "red", fontSize: wp(7), marginVertical: 10 }}>Your Base has been Sabotaged.... Reach your base immediately</Text>
          <Text style={{ color: "white", fontFamily: "Pacman", color: "yellow", fontSize: wp(9), marginVertical: 10 }}>999999999999999</Text>
          <TextInput
            style={styles.teamInput}
            onChangeText={setTeamCode}
            value={teamCode}
            placeholder="Enter your Team Code"
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              getDocs(query(options))
                .then(res => res.docs)
                .then(res => {
                  const data = res[0].data().alertCode;
                  if (data === teamCode) {
                    updateTeam({ teamcode: userContext.userData.teamcode, alert: false }, res => {
                      if (res.status == "success") {
                        getTeam({ teamcode: userContext.userData.teamcode }, res => {
                          if (res.status == "success") {
                            userContext.setUserData(res.data);
                            // alert("Data Fetched Successfully.");
                            // navigation.navigate("tabnav");
                          } else {
                            alert("Please ReLogin");
                          }
                        })
                        alert("Points has been rewarded successfully!")
                      } else {
                        alert("Some Error occured while playing the game")
                      }
                    })
                  } else {
                    alert("Wrong Code Please try again");
                  }
                })
            }}
          >
            <Text style={{
              fontFamily: "Pacman",
              fontSize: wp(9)
            }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Image
        source={require("../../assets/background.jpg")}
        style={{ position: "absolute", height: hp(100), width: wp(100) }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Progress</Text>
        <TaskList data={tasks} navigation={props.navigation} />
        {/* <Task taskNum={taskNum} tasks={tasks}/> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomWidth: 5,
    borderColor: "#ED7B25",
    backgroundColor: "#F3BA15",
    color: "#3F315B",
    fontFamily: "Pacman",
    textAlign: "center",
    fontSize: hp(7)
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: wp(95),
    height: hp(9),
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#CF4722",
    backgroundColor: "#EB7F27"
  },

  teamInput: {
    color: 'white',
    alignSelf: "center",
    padding: 15,
    fontSize: hp(3),
    borderWidth: 7,
    borderColor: "#F3BA15",
    width: wp(95),
    // alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
    borderRadius: 10,
    marginBottom: 15
  },
});

export default Progress;
