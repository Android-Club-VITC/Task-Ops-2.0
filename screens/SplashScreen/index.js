import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EvilIcons, AntDesign } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
    return (
        <>
            <Image
                source={require("../../assets/background.jpg")}
                style={{ position: "absolute", height: hp(100), width: wp(100) }}
            />
            <View style={styles.container}>
                <Image source={require("../../assets/Task-Ops-Cropped.png")} style={styles.TOLogo} />

                <View style={styles.mainBox}>
                    <View style={styles.subBox}>
                        <Text style={styles.h1}>Register</Text>
                        <Text style={styles.h2}>First time? Register your team and get a team code to pass on to your teammates</Text>
                        <AntDesign name={'arrowleft'} color={'white'} size={hp(4)} style={styles.button} onPress={()=>{navigation.navigate('RegisterScreen')}} />
                    </View>

                    <View style={{ width: 1, height: hp(30), backgroundColor: 'white' }}>

                    </View>

                    <View style={styles.subBox}>
                        <Text style={styles.h1}>Log In</Text>
                        <Text style={styles.h2}>Enter your team code here to see your tasks and move up the leaderboard! </Text>
                        <AntDesign name={'arrowleft'} color={'white'} size={hp(4)} style={[styles.button, { transform: [{ rotate: '180deg' }] }]} onPress={()=>{navigation.navigate('SignInScreen')}} />
                    </View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    TOLogo: {
        resizeMode: 'contain',
        height: hp(20),
        width: hp(40),
    },
    h1: {
        color: 'white',
        fontSize: wp(8),
        fontFamily: "Pacman"
    },
    h2: {
        color: '#fff',
        fontSize: wp(3),
        marginTop: 15
    },
    mainBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subBox: {
        width: wp(45),
        margin: wp(2.5),
        alignItems: 'center',
    },
    button: {
        marginVertical: hp(5),
        height: hp(8),
        width: hp(8),
        borderRadius: hp(4),
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
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