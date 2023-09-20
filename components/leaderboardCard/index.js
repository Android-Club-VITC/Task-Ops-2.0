import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from '@expo/vector-icons';

export default function LeaderboardCard({ data, index }) {
    return (

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {index == 0 ? <Ionicons name={'trophy'} size={30} color={'#d4af37'} style={{ marginRight: wp(2.5) }} /> : <></>}
                    {index == 1 ? <Ionicons name={'trophy'} size={30} color={'#9a9a9a'} style={{ marginRight: wp(2.5) }} /> : <></>}
                    {index == 2 ? <Ionicons name={'trophy'} size={30} color={'#967444'} style={{ marginRight: wp(2.5) }} /> : <></>}
                    {index != 0 && index != 1 && index != 2 ? <Text style={styles.h1}>{index + 1}       </Text> : <></>}

                    <Text style={[styles.h1, {color: index==0? "gold": index==1 ? "silver" : index==2 ? "#F3CD0095": "white"}]}>{data.teamname}</Text>
                </View>
                <Text style={[styles.h1, {color: index==0? "gold": index==1 ? "silver" : index==2 ? "#F3CD0095": "white"}]}>{data.score}</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,1)',
        padding: wp(4),
        borderWidth: 7,
        borderColor:"#F3BA15",
        width: wp(95),
        borderRadius: 10,
    },
    h1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp(5),
    }
})