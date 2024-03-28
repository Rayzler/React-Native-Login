import {createContext, useState} from 'react'

const initialValue = {
    username: ''
}

export const UserContext = createContext(initialValue);

// Este es el que nos provee de acceso al contexto
export function UserProvider({children}) {
    const [user, setUser] = useState(initialValue);

    return (
        <UserContext.Provider value={
            {
                user,
                setUser
            }
        }>
            {children}
        </UserContext.Provider>
    )
}