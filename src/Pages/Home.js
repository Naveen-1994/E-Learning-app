import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import '../stylesheet/custom.css'
import ladingBG from '../images/landingBG.jpg'


const Homepage = (props) => {

    return (
        <div>
            <Navbar />
            <div>
                <div id="fill-screen">
                    <img src={require('../images/landingBG.jpg')} width="600" height="400" className="img-fill-screen" />
                </div>
            </div>
        </div>
    )
}

export default Homepage