import React, { createContext } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { AuthPage } from "src/pages/AuthPage/index.js";
import { Loader } from "src/widgets/Loader/ui/Loader.jsx"
import { Layout } from "./Layout/Layout.jsx";


const firebaseConfig = {
    apiKey: "AIzaSyAeCmDLL5b3BgOnKsliDsDoX-2nhs3LdLU",
    authDomain: "tracker1-9f0dc.firebaseapp.com",
    projectId: "tracker1-9f0dc",
    storageBucket: "tracker1-9f0dc.appspot.com",
    messagingSenderId: "962834318950",
    appId: "1:962834318950:web:95e365e5562b511b73cfa7"
};

function App() {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const db = getFirestore(app)

    const [user, loading, error] = useIdToken(auth);


    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {
                user
                    ? <Layout app={app} db={db} auth={auth}/>
                    : <AuthPage auth={auth}/>
            }
        </div>
    )
}

export default App
