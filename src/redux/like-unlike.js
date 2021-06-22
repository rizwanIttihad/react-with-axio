import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Component } from 'react';

export const likeUnlikeSlice = createSlice({
  name: 'likeUnlike',
  initialState: {
    id:"" ,
    likeStatus: "",
    likes: 0,
  },
  reducers: {

    updateStatus: (state,action) => {
        console.log('status',action.payload.likeStatus);
        if(action.payload.likeStatus == 'Like'){
            state.id = action.payload.id;
            state.likes = action.payload.likes += 1;
            state.likeStatus = 'UnLike';

            axios.post('http://127.0.0.1:8000/api/like/post',{
                id: state.id,
                likes_count: state.likes
            }).then(res => {
                console.log(res);
            });
        }else{
            state.id = action.payload.id;
            state.likes = action.payload.likes -= 1;
            state.likeStatus = 'Like';
            console.log('check status',state.likeStatus);
            axios.post('http://127.0.0.1:8000/api/unlike/post',{
                id: state.id,
                likes_count: state.likes
            }).then(res => {
                console.log(res);
            });
        }
    }
    
  },

  
})

// Action creators are generated for each case reducer function
export const { updateStatus } = likeUnlikeSlice.actions

export default likeUnlikeSlice.reducer