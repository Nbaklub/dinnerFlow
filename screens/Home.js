import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import {auth, firestroe} from "../App";
import {collection, query, where, getDocs} from "firebase/firestore";
import QRCode from 'react-native-qrcode-svg';
const Home = ({navigation}) =>{
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const usersCollection = collection(firestroe, 'users');
                const q = query(usersCollection, where("id", "==", auth.currentUser.uid));
                const usersSnapshot = await getDocs(q);
                if (!usersSnapshot.empty) {
                    const userData = usersSnapshot.docs[0].data();
                    setUser(userData);
                } else {
                    console.log("Nie znaleziono użytkownika");
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych użytkownika:", error);
            }
        }
        fetchUser();
    }, [auth.currentUser]);

    return (
        <View>
            <View style={styles.main}>
                {user ? (
                    <View>
                        <Text style={{marginLeft: 10, fontSize: 24, fontWeight: 'bold', marginBottom: 15}}>Cześć, {user.name}</Text>
                        <QRCode value={JSON.stringify(user)} size={400}/>
                    </View>
                ) : (
                    <Text>Loading QR Code...</Text>
                )}
            </View>
            {user ? (
                <View style={{flexDirection: 'row', fontSize: 20, marginLeft: 10, marginTop: 30,}}>
                    <Text style={{fontSize: 40}}>Status: </Text>
                    <Text style={{fontSize: 40 ,fontWeight: 'bold', color: 'green'}}>{user.status}</Text>
                </View>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 60,
        alignItems: 'center',
    }
});

export {Home};
