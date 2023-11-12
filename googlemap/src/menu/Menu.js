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

import React, { useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";

function Menu(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [datas, setData] = useState([])

  const state = location.state || {};

  const isLogin = state.isLogin || false;
  const phoneNumber = state.phoneNumber;
  const uid = state.uid;

  const [message, setMessage] = useState("");

  const commands = [
    {
      command: "*ไป*",
      callback: (location1, location2) => {
        setMessage(`จุดรับ: ${location1}, จุดหมาย: ${location2}`);
        SpeechRecognition.stopListening();
      },
    },
    {
      command: "ไป*",
      callback: (location) => {
        setMessage(`จุดหมาย: ${location}`);
        SpeechRecognition.stopListening();
      },
    },
    {
      command: "ไปที่*",
      callback: (location) => {
        setMessage(`จุดหมาย: ${location}`);
        SpeechRecognition.stopListening();
      },
    }
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });
  
    if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleMic = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true, language: "th-TH" });
    } else {
      SpeechRecognition.stopListening();
    }
  };

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

  const id = {uid : uid}

  return isLogin ? (
    <div className="menu-container">
      <p>Login {phoneNumber}</p>
      <div className="header">CallBus</div>
      {phoneNumber}
      <div className="background-overlay"></div>
      <button
        id="go-back-button"
        onClick={() => {
          navigate("/register");
        }}
      >
        <img
          src={backPic}
          alt=""
          style={{ width: "30px", height: "auto" }}
        ></img>
      </button>
      <div className="registration-form">
        <div className="right">
          <button
            id="next-button"
            onClick={() => {
              navigate("/map");
            }}
          >
            แผนที่
          </button>
        </div>
        <label for="location" style={{ fontSize: "25px" }}>
          การเดินทาง
        </label>
        <label for="location" style={{ fontSize: "15px" }}>
          สำหรับผู้พิการ
        </label>
        <div
          className="container"
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "30px",
            display: "flex",
          }}
        >
          <img
            src={pinPic}
            alt=""
            style={{ width: "20px", height: "auto" }}
          ></img>
          <Autocomplete>
            <input
              type="text"
              name="location"
              placeholder="ไปที่ไหน?"
              required
            ></input>
          </Autocomplete>
          <IconButton onClick={handleMic}>
            <MicIcon />
          </IconButton>
          <p>{message}</p>
        </div>
      </div>
      <div className="container">
        <div style={{ alignItems: "center", height: "30px", display: "flex" }}>
          <p style={{ fontSize: "25px" }}>เส้นทางโปรด</p>
          <img
            src={starPic}
            alt=""
            style={{ width: "25px", height: "auto", margin: "10px" }}
          ></img>
        </div>
        <br />
        <div style={{ alignItems: "center", height: "30px", display: "flex" }}>
          <p style={{ fontSize: "25px" }}>จุฬาลงกรณ์มหาวิทยาลัย</p>
          <img
            src={arrowPic}
            alt=""
            style={{ width: "30px", height: "auto", margin: "10px" }}
          ></img>
        </div>
        <p>254 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330</p>
      </div>
      <div className="container">
        <div style={{ alignItems: "center", height: "30px", display: "flex" }}>
          <p style={{ fontSize: "25px" }}>ประวัติการเดินทาง</p>
          <img
            src={historyPic}
            alt=""
            style={{ width: "30px", height: "auto", margin: "10px" }}
          ></img>
        </div>
              {datas.map((value, index) => {
                return <History data = {value} key = {index}></History>
              })}
      </div>
      <div className="image-container">
        <img src={busPic} alt=""></img>
      </div>
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
