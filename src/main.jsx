import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';




import { getAuth } from 'firebase/auth';
import './index.css'


const firebaseConfig = {
    apiKey: "AIzaSyAeCmDLL5b3BgOnKsliDsDoX-2nhs3LdLU",
    authDomain: "tracker1-9f0dc.firebaseapp.com",
    projectId: "tracker1-9f0dc",
    storageBucket: "tracker1-9f0dc.appspot.com",
    messagingSenderId: "962834318950",
    appId: "1:962834318950:web:95e365e5562b511b73cfa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Context = createContext(null);

const auth = getAuth(app)
const db = getFirestore(app)

ReactDOM.createRoot(document.getElementById('root')).render(
        <Context.Provider value={{
            app,
            auth,
            db
        }}>
            <App/>
        </Context.Provider>
)
