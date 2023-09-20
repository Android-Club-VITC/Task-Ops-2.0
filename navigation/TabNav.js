import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Progress from '../screens/Progress';
import LeaderBoard from '../screens/LeaderBoard';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
                size = focused ? wp(7.5) : wp(7);
                color = focused ? 'white' : 'gray';

                let MCIconName = false;
                let IonicIconName = false;

                if (route.name == 'Progress') {
                    MCIconName = 'progress-check';
                }

                if (route.name == 'Leaderboard') {
                    IonicIconName = focused ? 'trending-up' : 'trending-up-outline';
                }

                if (MCIconName) {
                    return (<MaterialCommunityIcons name={MCIconName} size={size} color={color} />)
                }

                if (IonicIconName) {
                    return (<Ionicons name={IonicIconName} size={size} color={color} />)
                }

            },
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            // tabBarShowLabel: false,
            tabBarLabelStyle: {
                fontSize: wp(3)
            },
            tabBarStyle: {
                height: wp(15),
                backgroundColor: '#000000',
                // height: 60,
                // paddingTop: 5,
            }
        })}>
            <Tab.Screen name="Progress" component={Progress} />
            <Tab.Screen name="Leaderboard" component={LeaderBoard} />
        </Tab.Navigator>
    )
}