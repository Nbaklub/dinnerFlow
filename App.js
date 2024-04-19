import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Login} from "./screens/Login";
import {Home} from "./screens/Home";

const firebaseConfig = {
  apiKey: "AIzaSyCOXEVZrJ9ZD6HgLvIVCpEOHsLkaLoB0MU",
  authDomain: "mojastolowka.firebaseapp.com",
  projectId: "mojastolowka",
  storageBucket: "mojastolowka.appspot.com",
  messagingSenderId: "460660063037",
  appId: "1:460660063037:web:369a366acedc710fa5e354",
  measurementId: "G-GYDDZN9VCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestroe = getFirestore();
const auth = getAuth()
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export {firestroe, auth};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
