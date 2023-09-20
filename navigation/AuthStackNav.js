import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
import TabNav from '../navigation/TabNav';
import Task from '../components/Task';

const Stack = createNativeStackNavigator();

export default function AuthStackNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='SignInScreen' component={SignIn} />
            <Stack.Screen name='RegisterScreen' component={Register} />
            <Stack.Screen name="tabnav" component={TabNav} /> 
            <Stack.Screen name="task" component={Task} />
        </Stack.Navigator>
    )
}