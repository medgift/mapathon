import React, {useState, useEffect} from "react";
import "./Home.css";
import {useAuth0} from "../react-auth0-spa";
import request from "../utils/request";
import endpoints from "../endpoints";
import POI from "./POI";
import createAuth0Client from "@auth0/auth0-spa-js";

export default function POIList(props){
    let usr = useAuth0();

    let singlePoiClick = (id) => {
        props.singlePoiClick(id);
    }

    useEffect(() => {
        props.poisClick();
    }, []);
    // Check if the user is authenticated
    if(!usr.isAuthenticated){
        return <a href="#" onClick={usr.loginWithRedirect}>You need to login to see the points of interests</a>
    };

    //Call the function to receive all poi's
    //props.poisClick();
    return (
        <header className="poi-list">
             {props.pois && props.pois.length > 0 && (
                <ul className="POI-List">
                    {props.pois.map(poi => (
                        <li key={poi.id}>
                            {poi.name.length > 0 &&(
                            <POI {...poi} singlePoiClick={singlePoiClick} />)}
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}