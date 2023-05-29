import { useState, createContext } from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

export default function useAuth() { 

    const [user, setUser] = useState({})
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false)

    const toggleLogin = () => {
        setLoginVisible(!loginVisible)
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            setUser(user);
        } catch (error) {
            console.log(error.message);
            setIsAuth("something went wrong :/ ");
        }
        
    };


    const logout = async () => {
        await signOut(auth);
        setLoginVisible(false);
        console.log(user);
    };

    // const toggleAuth = () => {
    //     setIsAuth(!isAuth);
    // };
    // console.log(isAuth);

    return { isAuth, setIsAuth, login, logout, loginPassword, setLoginPassword, loginEmail, setLoginEmail, user, setUser, toggleLogin, loginVisible };

}

 