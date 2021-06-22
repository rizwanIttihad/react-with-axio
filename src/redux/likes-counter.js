import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Component } from 'react';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    id:"" ,
    likes: 0,
  },
  reducers: {
    increment: (state,action) => {
        console.log(action.payload.id,action.payload.likes);
        //action.payload.likes += 1;
    
        state.id = action.payload.id;
        state.likes = action.payload.likes += 1;
        
        axios.post('http://127.0.0.1:8000/api/like/post',{
            id: state.id,
            likes_count: state.likes
        }).then(res => {
            console.log(res);
        });
    },
    decrement: (state,action) => {

       
        state.id = action.payload.id;
        state.likes = action.payload.likes -= 1;

        axios.post('http://127.0.0.1:8000/api/unlike/post',{
            id: state.id,
            likes_count: state.likes
        }).then(res => {
            console.log(res);
        });
    },
    // incrementByAmount: (state, action) => {
    //   state.count += action.payload
    // },
  },

  
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer