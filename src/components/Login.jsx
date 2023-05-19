import React, { useContext } from 'react'
import { AuthContext } from '../utils/useAuth';

function Login() {
    
    const { login, logout, setLoginPassword, setLoginEmail, user } = useContext(AuthContext);
    
    return (
        <div className='my-12'>
            <div>
                {/* <h3> Login </h3> */}
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

                <button onClick={login}>Log In</button>
            </div>

            {user.user ?
                <>
                    User Logged In: {user._tokenResponse.email}
                    <button onClick={logout}>Log Out</button>
                </>
                : 
                ""
            }

        </div>
    )
}

export default Login
