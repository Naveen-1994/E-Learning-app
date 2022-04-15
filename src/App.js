import React from "react";
import Homepage from "./Pages/Home";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";
import StudentsPage from "./Pages/Students";
import CoursesPage from "./Pages/Courses";
import LecturePage from "./Pages/Lectures";
import LectureDetails from "./Pages/LectureDetails";
import { Route } from "react-router-dom";

const App = (props) => {
    return (
        <div>
            <Route path="/" component={Homepage} exact={true}></Route>
            <Route path="/admin/login" component={Login} exact={true}></Route>
            <Route path="/student/login" component={Login} exact={true}></Route>
            <Route path="/admin/signup" component={Signup} exact={true}></Route>
            <Route path="/admin/account" component={Account} exact={true}></Route>
            <Route path="/admin/students" component={StudentsPage} exact={true}></Route>
            <Route path="/admin/courses" component={CoursesPage} exact={true}></Route>
            <Route path="/admin/courses/:name" component={LecturePage} exact={true}></Route>
            <Route path="/admin/courses/lecture/:name" component={LectureDetails} exact={true}></Route>
        </div>
    )
}

export default App