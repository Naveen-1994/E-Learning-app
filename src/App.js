import React from "react";
import Homepage from "./Pages/Home";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";
import { Route } from "react-router-dom";

const App = (props) => {
    return (
        <div>
            <Route path="/" component={Homepage} exact={true}></Route>
            <Route path="/admin/login" component={Login} exact={true}></Route>
            <Route path="/student/login" component={Login} exact={true}></Route>
            <Route path="/admin/signup" component={Signup} exact={true}></Route>
            <Route path="/admin/account" component={Account} exact={true}></Route>
        </div>
    )
}

export default App