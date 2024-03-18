import { configureStore } from '@reduxjs/toolkit'
import { productsSliceReducer } from "src/pages/HomePage/model/productsSlice.js";

export const store = configureStore({
    reducer: {
        products: productsSliceReducer
    },
})