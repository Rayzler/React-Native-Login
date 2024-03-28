import AsyncStorage from "@react-native-async-storage/async-storage";

function useUserStorage() {
    const label = 'users';

    const addUser = async (username, password) => {
        const users = await AsyncStorage.getItem(label) || '[]';
        const usersArray = JSON.parse(users);
        const user = usersArray.find(user => user.username === username);
        if (user) {
            return false;
        }
        usersArray.push({
            username,
            password
        });
        await AsyncStorage.setItem(label, JSON.stringify(usersArray));
        return true;
    };

    const getUser = async (username, password) => {
        let users = await AsyncStorage.getItem(label) || '[]';
        const usersArray = JSON.parse(users);
        let user = usersArray.find(user => user.username === username);
        let message = "Ok";
        if (user) {
            if (user.password !== password) {
                user = undefined;
                message = "Contraseña incorrecta";
            }
        } else {
            message = "Usuario no encontrado";
        }

        return {
            user,
            message
        }
    };

    return {getUser, addUser};
}

export default useUserStorage;