import React, {useState, createContext} from 'react';

export const User = createContext();

export default function UserProvider(props){
    const [userData, setUserData] = useState({});
    return (
        <User.Provider value={{userData, setUserData}}>
            {props.children}
        </User.Provider>
    )
}