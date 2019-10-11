import React, {useState} from "react";
import "./Home.css";
import ReactMap from "./Map";
import POIList from "./POIList";
import request from "../utils/request";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";

export default function HomePage(props){


    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [pois, setPois] = useState([]); //Only one POI list (for the state)
    let [lastPoiId, setLastPoi] = useState(0);
    let mapRef = React.createRef();

    // get all the POI informations
    let handlePOIsClick = async e => {
        e.preventDefault();

        let poiList = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (poiList && poiList.length > 0) {
            console.log(poiList);
            setPois(poiList);
        }
    }

    let singlePoiClick = (id) =>{
        let poi = getPoiById(id);

        let newPosition = {
            lat: poi.lat,
            lng: poi.lng,
        };
        mapRef.current.recenterMap(newPosition);
        setLastPoi(id);
    }

    let getPoiById = (id) =>{
        return pois.find(poi => poi.id === id);
    }

    // main div
    return(
        <div className="home-div">
            <div className="map-div">
                <ReactMap pois={pois} lastPoi={lastPoiId} ref={mapRef}></ReactMap>
            </div>
            <div className="poi-list-div">
                <h2>Points of interests</h2>
                {/*Give the POI list*/}
                <POIList pois={pois} poisClick={handlePOIsClick} singlePoiClick={singlePoiClick}/>

            </div>
        </div>
    );

}