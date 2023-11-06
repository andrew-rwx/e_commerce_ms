import { useEffect,useState } from "react";
import Nav from "../nav/Nav";
import "./Homepage.css"
function Homepage(){
    return(
        <div>
            <Nav/>
            <div className="header-homepage">
                <h1>RetroShop</h1>
                <h2>All the games you can think are here</h2>
            </div>
        </div>
        
    )
}


export {Homepage};