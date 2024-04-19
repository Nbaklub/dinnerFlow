import React, {useState, useEffect} from "react";
import {View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    Alert
} from "react-native";
import {auth, firestroe} from "../App";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, query, getDocs, where, doc, DocumentReference } from 'firebase/firestore';
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('')
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [activeInput, setActiveInput] = useState(null);
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [registerFieldsVisible, setRegisterFieldsVisible] = useState(false);
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    const handleRegister = async () => {
        try {
            if (password !== password2) {
                throw new Error("Hasła nie pasują do siebie");
            }
            // Rejestracja użytkownika za pomocą adresu e-mail i hasła
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            user.displayName = name;
            user.phoneNumber = phone;
            await addDoc(collection(firestroe, 'users'), {
                email: user.email,
                id: user.uid,
                name: name,
                phone: phone,
                data: currentDate,
                class: location
            });


            // Jeśli rejestracja powiodła się, przekieruj na inną stronę
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert(error.message)
        }
    };
    const handleLogin = async () => {
        try {
            // Logowanie użytkownika za pomocą adresu e-mail i hasła
            await signInWithEmailAndPassword(auth, email, password);
            // Jeśli logowanie powiodło się, przekieruj na inną stronę
            navigation.navigate("Home");
            const user = auth.currentUser;
            console.log(user)
        } catch (error) {
            setError(error.message); // Jeśli wystąpił błąd, ustawiamy go w stanie error
        }
    };
    const toggleRegisterMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setRegisterFieldsVisible(false); // Resetowanie widoczności pól rejestracyjnych
    };

    const handleToggleFields = () => {
        setRegisterFieldsVisible(!registerFieldsVisible);
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.logo} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/mojastolowka.appspot.com/o/Group%206.png?alt=media&token=c17d3e33-95fe-45eb-ab54-294f844936b6'}} />
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.loginoptions, isRegisterMode ? { borderBottomColor: 'transparent' } : {}]}
                        onPress={toggleRegisterMode}
                    >
                        <Text style={styles.optionstext}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.loginoptions, isRegisterMode ? {} : { borderBottomColor: 'transparent' }]}
                        onPress={toggleRegisterMode}
                    >
                        <Text style={styles.optionstext}>Register</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.inputplace}>
                        <TextInput
                            style={[styles.input, { borderBottomColor: activeInput === 'email' ? '#086AD8' : '#ccc' }]}
                            placeholder="Email"
                            onFocus={() => setActiveInput('email')}
                            onBlur={() => setActiveInput(null)}
                            onChangeText={setEmail}
                            value={email}
                        />
                        <TextInput
                            style={[styles.input, { borderBottomColor: activeInput === 'password' ? '#086AD8' : '#ccc' }]}
                            placeholder="Hasło"
                            secureTextEntry
                            onFocus={() => setActiveInput('password')}
                            onBlur={() => setActiveInput(null)}
                            onChangeText={setPassword}
                            value={password}
                        />

                        {isRegisterMode && (
                            <View>
                                <TextInput
                                    style={[styles.input, { borderBottomColor: activeInput === 'repeatPassword' ? '#086AD8' : '#ccc' }]}
                                    placeholder="Powtórz hasło"
                                    secureTextEntry
                                    onFocus={() => setActiveInput('repeatPassword')}
                                    onBlur={() => setActiveInput(null)}
                                    onChangeText={setPassword2}
                                    value={password2}
                                />
                                <TextInput
                                    style={[styles.input, { borderBottomColor: activeInput === 'name' ? '#086AD8' : '#ccc' }]}
                                    placeholder="Imie i nazwisko"
                                    onFocus={() => setActiveInput('name')}
                                    onBlur={() => setActiveInput(null)}
                                    onChangeText={setName}
                                    value={name}
                                />
                                <TextInput
                                    style={[styles.input, { borderBottomColor: activeInput === 'phone' ? '#086AD8' : '#ccc' }]}
                                    placeholder="Numer Telefonu"
                                    onFocus={() => setActiveInput('phone')}
                                    onBlur={() => setActiveInput(null)}
                                    onChangeText={setPhone}
                                    value={phone}
                                />
                                <TextInput
                                    style={[styles.input, { borderBottomColor: activeInput === 'location' ? '#086AD8' : '#ccc' }]}
                                    placeholder="Klasa"
                                    onFocus={() => setActiveInput('location')}
                                    onBlur={() => setActiveInput(null)}
                                    onChangeText={setLocation}
                                    value={location}
                                />

                                {/* Dodatkowe pola rejestracyjne */}

                            </View>
                        )}
                        {/*<TouchableOpacity style={styles.forgotPassword} onPress={handleReset}>
                            <Text style={styles.forgotPasswordText}>
                                {isRegisterMode ? '' : 'Forgot Password?'}
                            </Text>
                        </TouchableOpacity>*/}

                        {!isRegisterMode && (
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        )}

                        {isRegisterMode && (
                            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    logo: {
        width: '100%',
        height: '40%',
        resizeMode: "contain"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: 'auto',
    },
    loginoptions: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        margin: 15
    },
    optionstext: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        borderBottomWidth: 3,
        width: '100%',
        borderColor: '#ccc',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#086AD8',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 20,
        marginTop: -15
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 16,
    },
    inputplace: {
        width: "90%",
        margin: '5%'
    },
    registerFieldsToggle: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    registerFieldsToggleText: {
        color: '#086AD8',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export {Login};