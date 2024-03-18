import { createSlice } from '@reduxjs/toolkit'
import { getCollectionThunk } from "src/pages/HomePage/model/api/requestsFirebase.js";

export const productsSlice = createSlice({
    name: 'products',
    initialState: {products: {}},
    reducers: {
        setProducts: (state, action) => {

            console.log('state', state)
            state.products = action.payload
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCollectionThunk.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

// Action creators are generated for each case reducer function

export const { actions: productsSliceActions } = productsSlice;
export const { reducer: productsSliceReducer } = productsSlice;

