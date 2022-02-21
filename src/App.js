import React from "react";
import Homepage from "./Pages/Home";
import Login from "./Pages/Login"
import Signup from "./Pages/signup";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";

const App = (props) => {

    return (
        <div>
            <Route path="/" component={Homepage} exact={true}></Route>
            <Route path="/admin/login" component={Login} exact={true}></Route>
            <Route path="/student/login" component={Login} exact={true}></Route>
            <Route path="/admin/signup" component={Signup} exact={true}></Route>
        </div>
    )
}

export default App