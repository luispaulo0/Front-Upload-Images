import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from './components/Login'
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

class App extends React.Component{
    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Login}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path={"/home"} component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default App;