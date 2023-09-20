import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spinner from 'react-native-modal-spinner';
import { getTeam } from '../../utils/database/teams';
import { User } from '../../utils/providers/UserProvider';

export default function SignIn({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [teamName, setTeamName] = useState();
    const [teamCode, setTeamCode] = useState(null);
    const userContext = useContext(User);
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
                <Text style={styles.text}>Log In</Text>
                <View style={{ alignItems: 'center', paddingVertical: hp(10), flex: 1 }}>
                    <TextInput
                        style={styles.teamInput}
                        onChangeText={setTeamCode}
                        value={teamCode}
                        placeholder="Enter your Team Code"
                        placeholderTextColor={'gray'}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            setLoading(true);
                            getTeam({teamcode: teamCode}, res=>{
                            if(res.status=="success"){
                                userContext.setUserData(res.data);
                                setLoading(false);
                                // alert("Data Fetched Successfully.");
                                navigation.navigate("tabnav");
                            }else{
                                setLoading(false);
                                alert("Some Error Occured!!!");
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

                <View style={styles.logoBox}>
                    <Image source={require("../../assets/ACWhite.png")} style={styles.ACLogo} />
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(100)
        // alignItems: 'center',
        // justifyContent: 'space-evenly'
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
    teamInput: {
        color: 'white',
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
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: wp(95),
        height: hp(9),
        borderWidth: 5,
        borderRadius: 20,
        borderColor: "#CF4722",
        backgroundColor: "#EB7F27"
    },

    ACLogo: {
        resizeMode: 'contain',
        height: hp(15),
        width: hp(15),
    },
    logoBox: {
        width: wp(100),
        flexDirection: 'row',
        marginBottom: hp(5),
        alignItems: 'center',
        justifyContent: 'center',
    }
})