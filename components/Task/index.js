import React, { useState, useContext } from "react";
import {
  Button,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Spinner from 'react-native-modal-spinner';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { updateTeam } from "../../utils/database/teams";
import {getDocs, query} from 'firebase/firestore';
import {User} from '../../utils/providers/UserProvider';
import { getTeam } from "../../utils/database/teams";
import {options} from '../../auth';

function Task(props) {
  const [loading, setLoading]= useState(false);
  const [playing, setPlaying]= useState(false);
  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const [text, onChangeText] = useState("");
  const [point, onChangePoint] = useState("");
  const [time, setTime] = useState(360);

  const userContext = useContext(User)

  function toTime(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  }
  
  // console.log(props.route.params.data);
  return (

    <View style={styles.container}>
      <Image
        source={require("../../assets/background.jpg")}
        style={{ position: "absolute", height: hp(100), width: wp(100), top: 0 }}
      />
      <Spinner
          color="#F3BA15"
          size="large"
          backgroundColor="#ED7B25"
          visible={loading}
      />
      <Text style={styles.text}>Task 1888</Text>
      <Text style={[styles.text, { fontSize: wp(7) }]}>{props.route.params.data.taskName}</Text>
      <Text style={{ color: "#ddd", fontSize: 20, textAlign: "justify", paddingHorizontal: 6, paddingVertical: 5,}}>
        Team ID: {userContext.userData.teamcode}
      </Text>
      <Text style={{ color: "#ddd", fontSize: 15, textAlign: "justify", paddingHorizontal: 8, paddingVertical: 10,}}>
        Clue: {props.route.params.data.clue}
      </Text>
      <Text style={{ color: "#ddd", fontSize: 15, textAlign: "justify", marginBottom: 20}}>
        {props.route.params.data.description}
      </Text>
      {
        props.route.params.data.criteria !=="points" &&
        <CountdownCircleTimer
          isPlaying={playing}
          duration={props.route.params.data.maxpoint}
          colors={['#F3CD00']}
        >
          {({ remainingTime }) => {
            // setTime(toTime(remainingTime));
            return(
            <Text style={{ fontSize: hp(6), color: 'yellow', fontWeight: "bold" }}>{remainingTime}</Text>
          )}}
        </CountdownCircleTimer>
      }

      {/* Enter code modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={codeModalVisible}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          setCodeModalVisible(!codeModalVisible);
        }}
      >
        <View style={styles.codeModalView}>
          <Text style={styles.modalText}>Code</Text>
          <TextInput
            style={styles.input}
            keyboardType="PAS"
            placeholder="Enter Code"
            secureTextEntry={true}
            autoCapitalize="none"
            // maxLength={2}
            onChangeText={(text) => onChangeText(text)}
            value={text}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Point"
            autoCapitalize="none"
            // maxLength={2}
            onChangeText={(text) => onChangePoint(text)}
            value={point}
          />
          <Button
            title="OK"
            onPress={() => {
              setLoading(true);
              const tasknumber = `task${props.route.params.data.num}`;
              const taskpoints = `task${props.route.params.data.num}time`;
              // console.log({teamcode: userContext.userData.teamcode, [tasknumber]: "Complete"});
              let p = 0;
              if(props.route.params.data.criteria ==="timing"){
                p = 10-((props.route.params.data.maxpoint - point)/props.route.params.data.maxpoint)*10;
                p = Number(p.toFixed(2));
              }else{
                p = Number(point);
              }
              getDocs(query(options))
              .then(res=>res.docs)
              .then(res=>{
                const data = res[0].data().taskCode;
                if(data === text){
                  updateTeam({teamcode: userContext.userData.teamcode, [tasknumber]: "Complete", [taskpoints]: p}, res=>{
                    if(res.status == "success"){
                      getTeam({teamcode: userContext.userData.teamcode}, res=>{
                        if(res.status=="success"){
                            userContext.setUserData(res.data);
                            // alert("Data Fetched Successfully.");
                            // navigation.navigate("tabnav");
                        }else{
                            alert("Please ReLogin");
                        }
                    })
                      setLoading(false);
                      alert("Points has been rewarded successfully!")
                    }else{
                      setLoading(false);
                      alert("Some Error occured while playing the game")
                    }
                  })
                }else{
                  alert("Please enter correct taskcode");
                }
                onChangeText("");
              })
              .catch(err=>{
                setLoading(false);
                alert("Something went wrong! Please try again.")
              })
              setCodeModalVisible(!codeModalVisible)
            }}
            color="teal"
          />
        </View>
      </Modal>
      {props.route.params.data.criteria === "timing"  &&
      <TouchableOpacity
      style={styles.button}
      onPress={() => setPlaying(!playing)}
      >
        <Text style={{
          fontFamily: "Pacman",
          fontSize: wp(9)
        }}>0 Play Pause 0</Text>
      </TouchableOpacity>
      }
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCodeModalVisible(true)}
      >
        <Text style={{
          fontFamily: "Pacman",
          fontSize: wp(9)
        }}>9 Done 9</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 15,
    color: "white",
    fontFamily: "Pacman",
    textAlign: "center",
    fontSize: wp(13),
  },
  container: {
    height: hp(100),
    borderRadius: wp("10%"),
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: wp(95),
    height: hp(9),
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#CF4722",
    backgroundColor: "#EB7F27"
  },
  modalText: {
    color: "black",
    marginBottom: 15,
    fontFamily: "Pacman",
    textAlign: "center",
    fontSize: hp(4.5),
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
    marginVertical: 10,
    borderColor: "teal",

    //justifyContent:'center',
    //alignItems:'center',
  },
  codeModalView: {
    width: wp(90),
    marginHorizontal: wp(5),
    marginTop: hp(30),
    backgroundColor: "#F3CD00",
    borderRadius: wp(4),
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

export default Task;
