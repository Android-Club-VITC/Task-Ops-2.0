import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spinner from "react-native-modal-spinner";
import LeaderboardCard from "../../components/leaderboardCard";
import {teams, options} from '../../auth';
import { User } from "../../utils/providers/UserProvider";  

export default function LeaderBoard(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [section, setSection] = useState(1);
  const [gLBoard, setgLBoard] = useState({
    showLeaderBoard: false
  });
  const userContext = useContext(User);

  useEffect(() => {
    setLoading(true);
    console.log("loading...");
    const q1 = query(teams);
    const q2 = query(teams, where("slot", "==", userContext.userData.slot));
    getDocs(gLBoard.showLeaderBoard === true && section === 2 ? q1 : q2)
    .then(res=>res.docs)
    .then(res=>{
      var arr = []
      res.forEach(val=>arr.push(val.data()));
      arr = arr.map(val=>{
        var score=0;
        for(var i=1; i<=9; i++){
          // console.log(`task${i}time`);
          score += val[`task${i}time`]
        }
        // console.log(score);
        return {...val, score: score};
      })
      arr.sort((a, b)=>b.score-a.score)
      setData(arr);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err)
      alert("Some error Occured!!")});
      setLoading(false);
  }, [section, isRefreshing]);
  useEffect(()=>{
    // console.log(userContext.userData)
    setLoading(true);
    getDocs(query(options))
    .then(res=>res.docs)
    .then(res=>{
      const data = res[0].data();
      setgLBoard(data);
      setLoading(false);
    })
  }, [section, isRefreshing])

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
        <Text style={styles.h1}>Leaderboard</Text>

        <View style={{
          width: wp(95), 
          flexDirection: "row", 
          backgroundColor:"#F3BA15", 
          alignSelf:"center",
          marginTop: 20,
          borderRadius: 10,
          borderWidth: 10,
          borderColor: "#ED7B25"
        }}
        >
          <TouchableOpacity 
            onPress={()=>setSection(1)}
            style={{width: "50%", backgroundColor: section === 1 ? "#3F315B": "transparent", padding:10}}>
            <Text style={{fontFamily:"Pacman", fontSize: 20, textAlign:"center", color: section===1? "white": "black"}}>Local</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{
              if(gLBoard.showLeaderBoard==true){
                setSection(2);
              }else{
                alert("Global Leader is not visible yet.");
              }
            }}
            style={{width: "50%", backgroundColor: section === 2 ? "#3F315B": "transparent", padding:10}}>
            <Text style={{fontFamily:"Pacman", fontSize: 20, textAlign:"center", color: section===2? "white": "black"}}>Global</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp(90),
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >

          <Text style={styles.h2}>Rank and Team</Text>
          <Text style={styles.h2}>Points</Text>
        </View>

        {data && (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", paddingBottom: wp(1) }}
            keyExtractor={(item) => item.teamCode}
            ItemSeparatorComponent={() => (
              <View style={{ height: wp(2) }}></View>
            )}
            renderItem={({ item, index }) => (
              <LeaderboardCard data={item} index={index} />
            )}
          />
        )}
        <TouchableOpacity
          onPress={()=>setIsRefreshing(!isRefreshing)} 
          style={{borderWidth: 8, alignItems:"center", borderRadius:10, borderColor: "#ED7B25", position: "absolute", bottom: 10, backgroundColor:"#F3BA15", right: wp(40), width: wp(17), height: 60}}>
          <Text style={{fontFamily:"Pacman", fontSize: 40}}>1</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    flex: 1,
  },
  h1: {
    paddingVertical: 15,
    borderBottomRightRadius: 30,
    borderBottomWidth: 5,
    borderColor:"#ED7B25",
    backgroundColor:"#F3BA15",
    color: "#3F315B", 
    fontFamily: "Pacman",
    textAlign: "center", 
    fontSize: wp(11) 
  },
  h2: {
    color: "white",
    // textAlign: 'center',
    fontWeight: "bold",
    fontSize: wp(7),
    paddingVertical: wp(6),
  },
  cover: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, //SafeArea implementation in android code.
  },
});
