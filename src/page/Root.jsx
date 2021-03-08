import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// 鉴权
import RouteAuth from '../util/RouteAuth';
// 界面
import Home from './Home';
import SignIn from './SignIn';
import Test from './Test';
import User from './User';
import Login from "./Login";
const Root = () => {
    return (
        <Router>
            <div>
                <Link to='/'><b style={{ color: '#fff' }}>home</b></Link> |  
                <Link to='/SignIn'><b style={{ color: '#fff' }}>signin</b></Link> |  
                <Link to='/user'><b style={{ color: '#fff' }}>user</b></Link> |  
                <Link to='/test'><b style={{ color: '#fff' }}>test</b></Link> |  
                <Link to='/login'><b style={{ color: '#fff' }}>login</b></Link>
            </div>
            <div>
                <Switch>
                    <Route path='/SignIn'>
                        <SignIn />
                    </Route>
                    <Route path='/test'>
                        <Test />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <RouteAuth path='/user'>
                        <User />
                    </RouteAuth>
                    <Route path='/'>
                        <Home />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}
export default Root;