import {View} from "react-native";
import useUserForm from "../../hooks/useUserForm";

export default function LoginScreen({navigation}) {
    const userForm = useUserForm("login", navigation);

    return (
        <View style={{width: "100%", alignItems: "center"}}>
            {userForm}
        </View>
    );
}