import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDatabase, set, ref } from "firebase/database";

//! Firebase Config 
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


// create sign up method
const signup = async (username, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username:username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, I am using ChitChat",
            lastSeen:Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatsData:[],
        })
        // console.log("signup success");
        
    } catch(error)  {
        // console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)

        console.log("login success");
        
    } catch(error)  {
        // console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const resetPass = async (email) => {
    if(!email)  {
        toast.error("Enter your email")
        return null
    }

    try {
        const userRef = collection(db, "users")
        const q = query(userRef, where("email", "==", email))
        const querySnap = await getDocs(q)
        if(!querySnap.empty)    {
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset Email Sent")
        }
        else    {
            toast.error("Email doesn't exists")
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
}

export {signup, login, logout, auth, db, resetPass}