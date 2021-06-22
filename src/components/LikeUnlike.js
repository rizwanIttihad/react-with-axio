import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateStatus } from '../redux/like-unlike'
import axios from 'axios';

export default function LikeUnlike(props){

    const [posts, setPosts] = useState('');
    //const posts = useSelector((state) => state.counter.posts)
    const id = useSelector((state) => state.likeUnlike.id)
    const likes = useSelector((state) => state.likeUnlike.likes)
    const likeStatus = useSelector((state) => state.likeUnlike.likeStatus)
    const dispatch = useDispatch()
    const userId = localStorage.getItem('user_id');


   


    useEffect ( ()=> {
        getAllPosts();
        
    },[] );

    const getAllPosts = () => {

    axios.get('http://127.0.0.1:8000/api/posts')
    .then(res => {
      let newData = res.data;
      setPosts(newData)
      //posts = newData;
    })
    .catch(err => {
      console.log(err)
    });
    
    }

    // const likePost = (id,likes,event) => {
    //     console.log('id',id);
    //     //dispatch(increment({id:id,likes:likes}));
    //     //return likes + 1;
    //     let index = posts.findIndex(x => x.id === id); 
    //     if (index !== -1){
    //         let temporaryarray = posts.slice();
    //         temporaryarray[index]['likes_count'] = likes + 1;
    //         console.log('temp',temporaryarray);
    //         setPosts(temporaryarray);
    //     }
    //     else {
    //         console.log('no match');
    //     }
    //     dispatch(increment({id:id,likes:likes}));
        
    // }
  
    // const unlikePost = (id,likes,event) => {

    //     let index = posts.findIndex(x => x.id === id); 
    //     if (index !== -1){
    //         let temporaryarray = posts.slice();
    //         temporaryarray[index]['likes_count'] = likes - 1;
    //         console.log('temp',temporaryarray);
    //         setPosts(temporaryarray);
    //     }
    //     else {
    //         console.log('no match');
    //     }

    //     dispatch(decrement({id:id,likes:likes}));
    
    // }


    const updateLikeStatus = (id,likes,likeStatus,event) => {
        console.log('status',likeStatus);
        if(likeStatus == 'Like'){
            let index = posts.findIndex(x => x.id === id); 
            if (index !== -1){
            let temporaryarray = posts.slice();
            temporaryarray[index]['likes_count'] = likes + 1;
            console.log('temp',temporaryarray);
            setPosts(temporaryarray);
            }
            else {
                console.log('no match');
            }
        }else{
            console.log('inside else status',likeStatus);
            let index = posts.findIndex(x => x.id === id); 
            if (index !== -1){
            let temporaryarray = posts.slice();
            temporaryarray[index]['likes_count'] = likes - 1;
            console.log('temp',temporaryarray);
            setPosts(temporaryarray);
            }
            else {
                console.log('no match');
            }
        }
        dispatch(updateStatus({id:id,likes:likes,likeStatus:likeStatus}));
        
      }


    if(props.postDetails){
        //console.log('useeis',props.postDetails.user_id)
        if(props.postDetails.user_id == props.userId){
            
            return (
                
                <button id={props.post.id} 
        
                onClick={(event) => updateLikeStatus(props.post.id,props.post.likes_count,props.post.id == id ? likeStatus : 'UnLike' ,event)} 
                key={props.postDetails.id}>
                {props.post.id == id ? likeStatus : 'UnLike' } {props.post.id == id ? likes  : props.post.likes_count } 
               
                </button>
                );
        }else{
            return (
            <button id={props.post.id} 
            onClick={(event) => updateLikeStatus(props.post.id,props.post.likes_count,props.post.id == id ? likeStatus : 'Like',event)} 
            key={props.post.id}>{props.post.id == id ? likeStatus : 'Like' } {props.post.id == id ?likes  : props.post.likes_count } 
            </button>
            );
        }
    }else{
        return (
            <button id={props.post.id} 
            onClick={(event) => updateLikeStatus(props.post.id,props.post.likes_count,props.post.id == id ? likeStatus : 'Like',event)} 
            key={props.post.id}>{props.post.id == id ? likeStatus : 'Like' } {props.post.id == id ?likes  : props.post.likes_count } 
            </button>
        );
    }
    
}