import {View} from "react-native";
import useUserForm from "../../hooks/useUserForm";

export default function SignupScreen({navigation}) {
    const userForm = useUserForm("signup", navigation);

    return (
        <View style={{width: "100%", alignItems: "center"}}>
            {userForm}
        </View>
    );
}