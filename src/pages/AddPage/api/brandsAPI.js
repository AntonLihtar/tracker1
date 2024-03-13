import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

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

        // const docRef = await addDoc(collection(db, "brands"), {
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        // });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
        return null
    }
}

export const getModels = async (db) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'models'));

        //массив тайтлов
        const arr = []
        //Перечисляет все документы в QuerySnapshot.
        querySnapshot.forEach((doc) => {
                // console.log(`models if getModels: ${doc.id} => ${doc.data().title}`);
                // console.log('BRANDSAPI 37', doc.data().models)
                arr.push({
                    title: doc.id,
                    models: doc.data().models
                })
            }
        )
        ;
        return arr

        // const docRef = await addDoc(collection(db, "brands"), {
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        // });
        // console.log("Document written with ID: ", docRef.id);
    } catch
        (e) {
        console.error("Error adding document: ", e);
        return null
    }
}

export const setCollections = async (db, nameCollection, data) => {
    try {
        const docRef = await addDoc(collection(db, nameCollection), data);
        return  docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const setCollectionsToID = async (db, id, data) => {

    try {
        await setDoc(doc(db, 'models', id), data);
        return 'OK'
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}