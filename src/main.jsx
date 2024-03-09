import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';




import { getAuth } from 'firebase/auth';
import './index.css'


const firebaseConfig = {
    apiKey: "AIzaSyBfIBjRUm57RKllbHiljNop96V8RgbVnX8",
    authDomain: "tracker1-7b0ea.firebaseapp.com",
    projectId: "tracker1-7b0ea",
    storageBucket: "tracker1-7b0ea.appspot.com",
    messagingSenderId: "93019054641",
    appId: "1:93019054641:web:b190f3ccad2233bb7aeb10",
    measurementId: "G-HCM8F05M50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Context = createContext(null);

const auth = getAuth(app)
const firestore = getFirestore(app)

ReactDOM.createRoot(document.getElementById('root')).render(
        <Context.Provider value={{
            app,
            auth,
            firestore
        }}>
            <App/>
        </Context.Provider>
)
