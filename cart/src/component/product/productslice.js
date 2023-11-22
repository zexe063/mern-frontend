import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios  from "axios"



export const getproduct = createAsyncThunk(
    "product/getproduct",
    async()=>{
 const {data} = await axios.get("https://mern-backnend.vercel.app/products")
return data.data;
// console.log(data)
    }
)

export const sortproduct = createAsyncThunk(
    "product/sortproduct",
    async(id)=>{
    
    const arr = id.split(":");

        const {data} = await axios.get(`http://localhost:9000/products/sort?${arr[0]}=${arr[1]}`);
     return data;
        // console.log(data)
    }
)



const ProductSlice = createSlice({
    name:"product",

    initialState:{
    item:[],
    Loading:false
    },
extraReducers:((builder)=>{
    builder.addCase(getproduct.pending,(state,action)=>{
        state.Loading = false;
    })
   builder.addCase(getproduct.fulfilled,(state,action)=>{
    state.item = action.payload
    state.Loading = true;
   })
   builder.addCase(sortproduct.pending,(state,action)=>{
    state.Loading =  false;
   })
   builder.addCase(sortproduct.fulfilled,(state,action)=>{
    state.item = action.payload
    state.Loading = true
   })
})

   
})
  export default ProductSlice.reducer;
