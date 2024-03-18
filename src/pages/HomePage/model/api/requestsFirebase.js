import { collection, getDocs } from "firebase/firestore";
import { createAsyncThunk} from '@reduxjs/toolkit'

// First, create the thunk
export const getCollectionThunk = createAsyncThunk(
    'products/getCollection',
    async (db) => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        console.log('getCollectionThunk work')
        const obj = {}
        querySnapshot.forEach((doc) => {
            obj[doc.id] = doc.data()
        });
        return obj
    },
)
