import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../utils/providers/UserProvider';

export default function TaskListCard({ data, index, navigation }) {
    const userContext = useContext(User);
    return (

            <TouchableOpacity 
            onPress={()=>navigation.navigate("task", {data: data})}
            style={[styles.container, {backgroundColor:userContext.userData[`task${data.num}`]=="Complete"? "green": "black"}]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.h1}>{index + 1}       </Text>
                    <Text style={styles.h1}>{data.taskName}</Text>
                </View>
                <Text style={styles.h1}>{data.points}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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