import React, { useState } from 'react';
import axios from 'axios';

export default function LogOut(){

    const token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/api/logout',{
            token: token
        }).then(res => {
            
            if(res.status === 200){
                return window.location = '/login'; 
            }
            
        });
}