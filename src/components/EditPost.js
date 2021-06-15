import React, { useState } from 'react';
import axios from 'axios';
import '../css/form.css';
import { Redirect } from 'react-router-dom';

export default function EditPost(props){

    const [data, setData] = useState({
        id: props.location.postDetails.id,
        title: props.location.postDetails.title,
        body: props.location.postDetails.body,
    });

    console.log(props.location.postDetails.id)

    function handleSubmit(event){
        //console.log(data);
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/update/post',{
            id: data.id,
            title: data.title,
            body: data.body
        }).then(res => {
            
            console.log(res);
            props.history.push('/list')
            
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
            <h3>Edit Post</h3>
                <input type="hidden" name="id" value={data.id} />
               <fieldset> 
              <input onChange={(event) => handleChange(event)}  type="text" name="title" value={data.title} /><br />
              </fieldset>
              <fieldset>
              <label>Body</label>
              <textarea onChange={(event) => handleChange(event)}  type="text" name="body" value={data.body} >
                </textarea>
                </fieldset>
              <button type="submit" >Submit </button>
            </form>
        

        </div>
    )
}