import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Post from './components/Post'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import Login from './components/login'
import LogOut from './components/logout'
import {
  BrowserRouter as Router,
  Route,Link,
  Switch
} from "react-router-dom";

function App() {
  return (
   
    <div className="App">
      
      <Router>
      <div>
        <header>
          <ul class="header">
            <li>
              <Link to="/list">Posts</Link>
            </li>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          </ul>
        </header>

          <h1>Blog post crud</h1>
          <h4>Use navigation</h4>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/list">
            <Post />
          </Route>
          <Route path="/create">
            <CreatePost />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path='/editpost' component={EditPost} />
          <Route exact path='/logout' component={LogOut} />
        </Switch>
      </div>
    </Router>
    
    </div>
  );
}

export default App;
