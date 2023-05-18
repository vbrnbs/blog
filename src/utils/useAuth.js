// import { useState, createContext, useEffect } from 'react';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";



// export default function useAuth(loginEmail, loginPassword) {

//     const [user, setUser] = useState({});
//     const [isAuth, setIsAuth] = useState(false);

//     useEffect(() => {
//         const login = async () => {
//             try {
//                 const user = await signInWithEmailAndPassword(
//                     auth,
//                     loginEmail,
//                     loginPassword
//                 );
//                 console.log(user);
//                 setUser(user);
//                 setIsAuth(true);
//             } catch (error) {
//                 console.log(error.message);
//             }
//         // }
//         login();
//     }, []);

//     // const logout = async () => {
//     //     await signOut(auth);
//     //     setIsAuth(false);
//     // };

//     return {
//         user,
//         setUser,
//         loginEmail,
//         setLoginEmail,
//         loginPassword,
//         setLoginPassword,
//         isAuth,
//         setIsAuth,
//         login
//     };
// }
