import { collection, getDocs } from "firebase/firestore";

export const getCollections = async (db, nameCollection) => {
    try {
        const querySnapshot = await getDocs(collection(db, nameCollection));

        //массив тайтлов
        const arr = []
        //Перечисляет все документы в QuerySnapshot.
        querySnapshot.forEach((doc) => {
            // console.log(`${nameCollection} if getCollections:  ${doc.id} => ${doc.data().title}`);
            arr.push(doc.data())
        });
        return arr

    } catch (e) {
        console.error("Error adding document: ", e);
        return null
    }
}

export const getProducts = async (db) => {
    return await getCollections(db, 'products')
}