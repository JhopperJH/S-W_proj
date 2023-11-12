import "./menu.css";
import backPic from "../assets/back.png";
import pinPic from "../assets/pin.png";
import micPic from "../assets/mic.png";
import starPic from "../assets/star.png";
import arrowPic from "../assets/arrow.png";
import historyPic from "../assets/history.png";
import busPic from "../assets/bus.png";

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state.phoneNumber;
  // const uid = location.state.uid

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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAoNWze06RB-8J87kZq7lwicy1AdiTF4i8",
    libraries: ["places"],
  });

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

  const handleText = () => {
    const text = transcript;
    console.log(text.includes("ไป"));
    resetTranscript();
  };

  return isLoaded ? (
    <div className="menu-container">
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
          <p onChange={handleText}>{message}</p>
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
        <p style={{ fontSize: "20px" }}>MBK → สามย่านมิตรทาวน์</p>
        <p>
          เริ่มเดินทาง 12.10 น.
          <br />
          สิ้นสุดการเดินทาง 12.22 น.
          <br />
          ต่าโดยสาร 10 บาท
        </p>
      </div>
      <div className="image-container">
        <img src={busPic} alt=""></img>
      </div>
      <label className="ending">
        2023 CallBus Inc. Term and Condition <br></br>
        Invisible reCAPTCHA by Google Privacy Policy and Terms of use
      </label>
    </div>
  ) : (
    <></>
  );
}

export default Menu;
