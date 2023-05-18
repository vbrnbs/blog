import React, { useState, createContext } from 'react'
import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig"

export const AuthContext = createContext();

function Login() {
    const [user, setUser] = useState({})
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
            setUser(user);
            setIsAuth(true);
        } catch (error) {
            console.log(error.message);
        }
    };
    const logout = async () => {
        await signOut(auth);
        setIsAuth(false);
        console.log(user);
    };

    return (
        <div className='my-12'>
            <div>
                <h3> Login </h3>
                <input
                    tyep="email"
                    placeholder="Email..."
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />

                <button onClick={login}>Sign In</button>
            </div>

            {user.user ?
                <>
                    User Logged In: {user._tokenResponse.email}
                    <button onClick={logout}>Sign Out</button>
                </>
                : 
                ""
            }



        </div>
    )
}

export default Login
