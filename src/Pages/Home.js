import React, { useEffect } from "react";
import Navbar from "../Navbar";
import '../stylesheet/custom.css'
import { useSelector } from "react-redux";


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