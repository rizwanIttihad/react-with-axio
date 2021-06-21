import React, { useState } from 'react';
import axios from 'axios';
import '../css/post.css';
import { Redirect } from 'react-router-dom';

export default function Login(){
    const [data,setData] = useState({
        email: "",
        password: "",
    });


    function handleSubmit(event){
        //console.log(data);
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/login',{
            email: data.email,
            password: data.password
        }).then(res => {
            
            console.log(res);
            

            if(res.status === 200){
                console.log(res);
                localStorage.setItem('token',res.data.access_token);
                localStorage.setItem('user_id',res.data.user_id);
                return window.location = '/list';
                 
            }else{
                return window.location = '/login';
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
            <h3>Login</h3>
              
              <fieldset>
              <input placeholder="Email" onChange={(event) => handleChange(event)}  type="text" name="email" value={data.email} /><br />
              </fieldset>
              
              <fieldset>
              <input placeholder="password" onChange={(event) => handleChange(event)}  type="password" name="password" value={data.password} />
                
                </fieldset>
                <br />
              <button type="submit" >Submit </button>
            </form>
        </div>
    )
}