import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    FacebookAuthProvider,
} from "firebase/auth";
import {auth, app} from '../firebase';
import { collection, getDocs, getFirestore } from "firebase/firestore"; 

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [allData, setAllData] = useState([])

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const fbSignIn = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    const getData = async (e) => {
        const db = getFirestore(app);
        let result = await getDocs(collection(db, "revenues"));
        result.forEach((doc) => {
            console.log(doc.data());
            setAllData((prev) => {
                return [...prev, doc.data()]
            })
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (cUser) => {
            console.log("cuser", cUser)
            setUser(cUser)
        })
        return () => {
            unsubscribe();
        }
    },[])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, fbSignIn, getData, allData}} >
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}