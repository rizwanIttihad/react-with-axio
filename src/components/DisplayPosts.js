import React from 'react';

import '../css/post.css';

export default function DisplayPosts(props){

    
    return (
        <div className='ArticleContainer'>
          <h1>Simple blog with React</h1>
          {
            props.posts.length === 0 ?
              <p>Loading Posts...</p>
            :
            props.posts.map((post, index) => (
                <article key={index}>
                  <h2>{index + 1}. {post.title}</h2>
                  <p>{post.body.substr(0, 100)}...</p>
                  <button className='delete'>Delete</button>
                  <button className='edit'>Edit</button>
                </article>
              ))
          }
        </div>
      );
    

}