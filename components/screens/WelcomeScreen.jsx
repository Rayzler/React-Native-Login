import React, {useContext} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {UserContext} from "../../context/user";

export default function WelcomeScreen({navigation}) {
    const {user} = useContext(UserContext);

    const handleLogout = () => {
        navigation.navigate("login");
    }

    return (
        <View style={{width: "100%", alignItems: "center", minHeight: "100%", justifyContent: "center"}}>
            <ImageBackground source={require("../../assets/bg.png")} resizeMode="cover"
                             style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text>Hi, {user.username}</Text>
                        <TouchableOpacity style={{width: "100%"}} onPress={handleLogout}
                                          activeOpacity={0.8}>
                            <View style={styles.button}>
                                <Text style={{color: "#ffffff"}}>Log Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        padding: 40,
        width: "100%"
    },
    card : {
        width: "100%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    button: {
        backgroundColor: "#bc8cf8",
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 20,
        elevation: 7,

        /* Sombra iOS */
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
});