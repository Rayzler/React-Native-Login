import React, {useContext} from 'react';
import {UserContext} from "../context/user";
import {
    Alert,
    Image,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Controller, useForm} from "react-hook-form";
import useUserStorage from "./useUserStorage";

function UseUserForm(type, navigation) {
    const {user, setUser} = useContext(UserContext);
    const {getUser, addUser} = useUserStorage();

    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onError = () => {
        if (Platform.OS === "web")
            alert("Debes llenar todos los campos");
        else
            Alert.alert('Error', "Debes llenar todos los campos", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ]);
    }

    const onLoginSubmit = async (data) => {
        const {user, message} = await getUser(data.username, data.password);

        if (!user) {
            Alert.alert('Error', message, [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ]);
            return false;
        }

        return true;
    };

    const onSignUpSubmit = async (data) => {
        const success = await addUser(data.username, data.password);
        if (!success) {
            Alert.alert('Error', "El usuario ya existe", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ]);
            return false;
        }
        return true;
    }

    const onSubmit = async (data) => {
        reset();

        if (type === "login") {
            if (!await onLoginSubmit(data))
                return;
        } else {
            if (!await onSignUpSubmit(data))
                return;
        }

        setUser({
            username: data.username
        });

        navigation.navigate('details');
    }


    return (
        <>
            <ImageBackground source={require("../assets/bg.png")} resizeMode="cover"
                             style={{justifyContent: "space-between", height: "100%", width: "100%"}}>
                <View style={[styles.container, {marginVertical: 50}]}>
                    <Image style={styles.logo} source={require("../assets/icon.png")}></Image>
                    <Text style={[styles.label, {alignSelf: "center"}]}>App</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Welcome!</Text>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                style={styles.input}
                                placeholder={"Username"}
                                placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
                            />
                        )}
                        name="username"
                        rules={{required: true}}
                    />
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder={"Password"}
                                secureTextEntry
                                placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
                            />
                        )}
                        name="password"
                        rules={{required: true}}
                    />

                    <TouchableOpacity style={{width: "100%"}} onPress={handleSubmit(onSubmit, onError)}
                                      activeOpacity={0.8}>
                        <View style={styles.button}>
                            <Text style={{color: "#bc8cf8"}}>{type === "login" ? "Log In" : "Sign Up"}</Text>
                        </View>
                    </TouchableOpacity>

                    {
                        type === "login" &&
                        <TouchableWithoutFeedback>
                            <Text style={{color: "white", marginTop: 10}}>Forgot Password?</Text>
                        </TouchableWithoutFeedback>
                    }
                </View>
                <View style={styles.container}>
                    <Text style={{color: "white", marginTop: 10}}>
                        {type === "login" ? "Don't have an account?" : "Already have an account?"}
                    </Text>

                    <TouchableOpacity style={{marginBottom: 50}} activeOpacity={0.8}
                                      onPress={() => navigation.navigate(type === "login" ? "signup" : "login")}>
                        <View style={styles.button}>
                            <Text style={{color: "#bc8cf8", paddingHorizontal: 20}}>
                                {type === "login" ? "Create" : "Log In"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 125,
        height: 125,
        resizeMode: "cover",
        borderRadius: 30
    },
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: "100%",
        padding: 5,
        marginVertical: 25,
        color: "white"
    },
    label: {
        alignSelf: "flex-start",
        color: "white",
        fontSize: 36,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "white",
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
})

export default UseUserForm;