import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, SafeAreaView} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import {auth} from "../App";
import {SafeAreaContext} from "react-native-safe-area-context";

const Home = ({navigation}) =>{
  return(
      <View style={style.main}>
        <Text>{auth.currentUser.uid}</Text>
      </View>
  );
}
const style = StyleSheet.create({
    main: {
        marginTop: 20,
    }
})
export {Home};