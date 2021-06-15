import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/post.css';
import {
  Link,Redirect,
} from "react-router-dom";

export default  function Post(){

    const [posts, getPosts] = useState('');

    useEffect ( ()=> {
        getAllPosts();
        
    },[] );

    const getAllPosts = () => {

    axios.get('http://127.0.0.1:8000/api/posts')
    .then(res => {
      let newData = res.data;
      getPosts(newData)
      console.log(newData);
    })
    .catch(err => console.log("Couldn't fetch data. Error: " + err));
    console.log(posts);
    
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
      .catch(err => console.log("Couldn't fetch data. Error: " + err));
    }

    
    return (
      
        <div className='ArticleContainer'>
          
           <h1>Simple blog with React</h1>
           {
             
             posts.length === 0 ?
               <p>Loading Posts...</p>
             :
             posts.map((post, index) => (
                 <article key={index}>
                   <h2>{index + 1}. {post.title}</h2>
                   <p>{post.body.substr(0, 100)}...</p>
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
               ))
           }
          
         </div>


     );

        
      
}