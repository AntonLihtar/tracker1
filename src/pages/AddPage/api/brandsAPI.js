import { collection, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { Context } from "src/main.jsx";

export const getBrands = async (db) => {


    try {

        const querySnapshot = await getDocs(collection(db, "brands"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().title}`);
        });

        // const docRef = await addDoc(collection(db, "brands"), {
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        // });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}