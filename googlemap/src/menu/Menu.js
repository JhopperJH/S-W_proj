import "./menu.css";
import backPic from "../assets/back.png";
import pinPic from "../assets/pin.png";
import micPic from "../assets/mic.png";
import starPic from "../assets/star.png";
import arrowPic from "../assets/arrow.png";
import historyPic from "../assets/history.png";
import busPic from "../assets/bus.png";
import Map from "../Map/Map";
import History from "../history/history";

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {db} from '../firebase.db'
import {ref, onValue} from 'firebase/database'

function Menu(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [datas, setData] = useState([])

  const state = location.state || {};

  const isLogin = state.isLogin || false;
  const phoneNumber = state.phoneNumber;
  const uid = state.uid;


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAoNWze06RB-8J87kZq7lwicy1AdiTF4i8",
    libraries: ["places"],
  });


  useEffect( () => {
    const dataRef = ref(db,`user/` + uid)
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val()
      
      if(snapshot.exists()) {
        setData(Object.values(data))
      }
    })
  
  return () => {
  }
  }, [uid])

  const data_test = [
    {
      date: "12/12/2565",
      origin: "test1",
      destination: "test2",
    },
    {
      date: "15/12/2565",
      origin: "test3",
      destination: "test4",
    },
  ];

  const id = {uid : uid}

  return isLogin ? (
    <div>
      <p>Login {phoneNumber}</p>
      {datas.map((value, index) => {
        return <History data = {value} key = {index}></History>
      })}
      <div className="map-container">
        {console.log(datas)}
        <Map data={id}></Map>
      </div>
    </div>
  ) : (
    <div>
      <p>Error</p>
    </div>
  );


}

export default Menu;
