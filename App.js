import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {UserProvider} from "./context/user";
import LoginScreen from "./components/screens/LoginScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import SignupScreen from "./components/screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen component={LoginScreen} name="login"/>
                    <Stack.Screen component={SignupScreen} name="signup"/>
                    <Stack.Screen component={WelcomeScreen} name="details"/>
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}