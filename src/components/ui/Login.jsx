import React, { useContext } from 'react'
import { AuthContext } from '../../utils/useAuth';

function Login() {

    const { login, logout, setLoginPassword, setLoginEmail, user, isAuth } = useContext(AuthContext);

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

                {/* <button onClick={login}>Log In</button> */}
            </div>

            {user.user ?
                <>

                    <div className='flex'>
                        <button onClick={logout} className='mr-8'>Log Out</button>
                        User Logged In: {user._tokenResponse.email}
                    </div>
                </>
                :
                <div className='flex'>
                    {isAuth && (
                        <div className='flex'>
                            {isAuth}
                            
                        </div>
                    )}
                    <button 
                        className='ml-2'
                        onClick={login}>
                        Log In
                    </button>
                </div>

            }

        </div>
    )
}

export default Login
