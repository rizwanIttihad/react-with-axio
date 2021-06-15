import React, { useState } from 'react';
import axios from 'axios';
import '../css/post.css';
import { Redirect } from 'react-router-dom';

export default function CreatePost(){
    const [data,setData] = useState({
        title: "",
        body: "",
    });


    function handleSubmit(event){
        //console.log(data);
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/create/post',{
            title: data.title,
            body: data.body
        }).then(res => {
            //console.log(res);
            

            if(res.status === 200){
                console.log(res);
                   return window.location = '/list';
                 
            }
                
            
        });

        
    }

    function handleChange(event){
        const newData = {...data}
        newData[event.target.name] = event.target.value
        setData(newData) 
    }

    

    return (
        <div class="container">
            
            <form id="contact" onSubmit={(event) => handleSubmit(event)}>
            <h3>Create Post</h3>
              
              <fieldset>
              <input placeholder="Title" onChange={(event) => handleChange(event)}  type="text" name="title" value={data.name} /><br />
              </fieldset>
              
              <fieldset>
              <textarea placeholder="Description" onChange={(event) => handleChange(event)}  type="text" name="body" value={data.body} >
                </textarea>
                </fieldset>
                <br />
              <button type="submit" >Submit </button>
            </form>
        </div>
    )
}