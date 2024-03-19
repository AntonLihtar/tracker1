import { setDoc, doc } from "firebase/firestore";

export const setProductToID = async (db, id, data) => {

    try {
        await setDoc(doc(db, 'products', id), data);
        return 'OK'
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}