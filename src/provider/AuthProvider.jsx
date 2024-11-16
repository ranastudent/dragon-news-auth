import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
      const [user,setUser] = useState(null)
      const [loading, setLoading] = useState(true)
      // console.log(loading, user)
const createNewUser = (email,password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
}

const userLogin = (email, password) => {
      setLoading(false)
      return signInWithEmailAndPassword(auth, email, password)
}

const updateUserProfile =(updatedData)=>{
      return updateProfile(auth.currentUser, updatedData)
}

const logOut = ()=>{
      setLoading(true)
      return signOut(auth);
}
     const authInfo =  {
            user,
            setUser,
            createNewUser,
            logOut,
            userLogin,
            loading,
            updateUserProfile,
      }
      useEffect(()=>{
         const unsubscribe =onAuthStateChanged(auth, currentUser =>{
                  setUser(currentUser)
                  setLoading(false)
            })
            return ()=>{
                  unsubscribe()
            }
      },[])
      return ( 
            <AuthContext.Provider value={authInfo}>
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthProvider;