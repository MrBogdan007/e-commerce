import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { useState } from "react";

import { useAppSelector } from "../../hooks/reduxHooks";

import { ModalInt } from "../../types/form";
import { ProductType } from "../../types/product";

import { RootState } from "../store";

const initialState: ProductType[] = []
 
   

export const fetchPagination = createAsyncThunk("fetchPagination", async (offset:number) => {
   
   const result = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=12`)
   //"https://api.escuelajs.co/api/v1/products"
   //`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10}`
   const data = result.data
   return data
} )
export const fetchCategory = createAsyncThunk("fetchCategory", async (id:number) => {
   
   const result = await axios.get(`https://api.escuelajs.co/api/v1/products`)
   const data = result.data

   return data.filter((item: { category: { id: number; }; }) =>  id === item.category.id );
    
} )

export const fetchProducts = createAsyncThunk("fetchAll", async () => {
   
   const result = await axios.get("https://api.escuelajs.co/api/v1/products")
   //"https://api.escuelajs.co/api/v1/products"
   const data = result.data
   return data
} )
export const deleteProducts = createAsyncThunk("delete", async (id:number) => {
   
  

} )



const productSlicer = createSlice({
   name: "incomes",
   initialState,
   reducers: {
      //methods of reducers object
      setForm: (state,action: PayloadAction<boolean>) => {

      },

   },
   extraReducers : (build) => {
      build
      .addCase(fetchPagination.fulfilled, (state,action) =>{
         return action.payload
      })
      .addCase(fetchCategory.fulfilled, (state,action) =>{
         return action.payload
      })
      .addCase(fetchProducts.fulfilled, (state,action) =>{
         return action.payload
      })
      .addCase(deleteProducts.fulfilled, (state,action)=> {
         
      })
   }
})
// Points to global state withous s at the end
const productReducer = productSlicer.reducer


export const { setForm} = productSlicer.actions

export default productReducer