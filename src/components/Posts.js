import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import '../css/post.css';
import {
  Link,Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateStatus } from '../redux/like-unlike'
import LikeUnlike from './LikeUnlike'

export default function Posts(){


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


    function handleClick(event){
      
        console.log(event.target.id);
        axios.post('http://127.0.0.1:8000/api/delete/post',{
          id: event.target.id,
        })
        .then(res => {
          if(res.status === 200){
            window.location = '/list';
          }
        })
        .catch(err => {
          console.log(err)
        });
      }
  
  
      
    //   const likePost = (id,likes,event) => {
    //     let index = posts.findIndex(x => x.id === id); 
    //     if (index !== -1){
    //       let temporaryarray = posts.slice();
    //       temporaryarray[index]['likes_count'] = likes + 1;
    //       console.log('temp',temporaryarray);
    //       setPosts(temporaryarray);
    //     }
    //     else {
    //         console.log('no match');
    //     }
    //     dispatch(increment({id:id,likes:likes}));
        
    //   }

      const updateLikeStatus = (id,likes,likeStatus,event) => {
        //console.log(likeStatus);
        
        if(likeStatus === 'Like'){
            
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



      return (
      
        <div className='ArticleContainer'>
          
    <h1>Simple blog with React</h1>
           {
             
             posts.length === 0 ?
               <p>Loading Posts...</p>
             :
             posts.map((post, index) => {
              
                 return <article key={index}>
                 
                  <h2>{index + 1}. {post.title} From <small>{post.user.name}</small></h2>
                   <p>{post.body.substr(0, 100)}...</p>

                   {
                     
                    post.post_like_by.length > 0 ?
                    
                    post.post_like_by.map((postLikeBy, index) => {
                       
                       //return checkUserId(postLikeBy,post) 
                      //console.log('test',checkUserId(postLikeBy,post))
                     return <LikeUnlike postDetails={postLikeBy} post={post} userId={userId} 
                       likes={likes} /> 
                   
                    })
                    :
                    (
                    <button id={post.id} onClick={(event) => updateLikeStatus(post.id,post.likes_count,post.id == id ? likeStatus : 'Like',event)} key={post.id}> {post.id == id ? likeStatus: 'Like' }   {post.id == id ?likes  : post.likes_count } </button>
                    )
                   }
                  
                    
                   <button id={post.id} onClick={(event) => handleClick(event)}>Delete</button>
                   
                   <Link
                    to={{
                      pathname: "/editpost",
                      postDetails: {
                        id: post.id,
                        title: post.title,
                        body:post.body,
                      },
                    }}
                  >
                    Edit
                  </Link>
                  
                 </article>
              })
           }
          
         </div>


     );
}