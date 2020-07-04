import React, {Fragment, useContext, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { UserContext } from './Providers/UserContext';
import Control from './components/Control';

function App() {
  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    const _user  = localStorage.getItem("User");
    setUser(_user);
  },[]);

  return (
    <BrowserRouter>
        <Switch>
          {user?
          <Fragment>
            <Route path="/dashboard" component={Home} />
          <Route path="/control" component={Control} />
          </Fragment>
          :null}
          <Route path="/" component={Login} />
        </Switch>
  </BrowserRouter>
  );
}

export default App;
