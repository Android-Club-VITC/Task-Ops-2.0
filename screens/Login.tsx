import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Background from '../components/Background';
import Input from '../components/Input';
import Button from '../components/Button';

//SplashScreen.preventAutoHideAsync();

const Login = () => {
  // const [isLoaded] = useFonts({
  //   Aldrich: require("../assets/fonts/Aldrich/Aldrich-Regular.ttf"),
  //   Raleway: require("../assets/fonts/Raleway/Raleway-VariableFont_wght.ttf"),
  // });

  // const handleOnLayout = useCallback(async () => {
  //   if (isLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isLoaded]);

  // if (!isLoaded) {
  //   return null;
  // }
  var [isPress, setIsPress] = useState(false);

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.heading}>
          LOGIN
        </Text>
        <View style={styles.input}>
          <Input keyboardType='number-pad' placeholder='Team ID'></Input>
        </View>
        <Button label={"SUBMIT"} TextColor={ isPress ? "#43FFFF" : "black" }  Margin={100} Press={()=>{}} />
      </View>
      
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width:400,
    marginVertical:100,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },

  heading: {
    color:"#43FFFF",
    fontSize:64,
    // top:108,
    // left:60,
    textAlign:"center",
    marginBottom:150,
    //fontFace:"Aldrich",
  },
  
  input: {
    marginTop: 120
  }

});

export default Login;
