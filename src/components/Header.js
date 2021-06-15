import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import CreatePost from './CreatePost';
import EditPost from './EditPost';

export default function Header(){
    return (
        
        <Router>
            <div>
            <Switch>
                <Route exact path='/createpost' component={CreatePost} />
                   
                <Route exact path='/editpost' component={EditPost} />
                   
            </Switch>
            </div>
        </Router>
    )
}