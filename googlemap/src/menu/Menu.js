import "./menu.css";
import backPic from "../assets/back.png";
import pinPic from "../assets/pin.png";
import micPic from "../assets/mic.png";
import starPic from "../assets/star.png";
import arrowPic from "../assets/arrow.png";
import historyPic from "../assets/history.png";
import busPic from "../assets/CallBus-removebg.png";
import Map from "../Map/Map";
import History from "../history/history";

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { db } from "../firebase.db";
import { ref, onValue } from "firebase/database";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";

function Menu(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [datas, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  const state = location.state || {};

  const isLogin = state.isLogin || false;
  const phoneNumber = state.phoneNumber;
  const uid = state.uid;
  const initMapvalue = {uid : uid}

  const [message, setMessage] = useState("");
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [mapData, setMapData] = useState(initMapvalue)
  const [confirmation, setConfirmation] = useState(false)

  const handleComfirmation = () => {
    setConfirmation(true)
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAoNWze06RB-8J87kZq7lwicy1AdiTF4i8',
    libraries: ["places"],
  });

  useEffect(() => {
    // Update the mapData state when origin or destination changes
    setMapData({
      uid: uid,
      origin: origin,
      destination: destination,
    });
  }, [uid, origin, destination]);

  useEffect(() => {
    const dataRef = ref(db, `user/` + uid + `/history/`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setData(data);
        console.log(datas);
      }
    });

    return () => {};
  }, [uid]);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyAoNWze06RB-8J87kZq7lwicy1AdiTF4i8",
  //   libraries: ["places"],
  // });

  const commands = [
    {
      command: "*ไป*",
      callback: (location1, location2) => {
        setMessage(`จุดรับ: ${location1}, จุดหมาย: ${location2}`);
        SpeechRecognition.stopListening();
        setOrigin(location1)
        setDestination(location2)
        const id = { uid: uid,
          origin : origin,
          destination : destination };
        setMapData(id)
      },
    },
    {
      command: "ไป*",
      callback: (location) => {
        setMessage(`จุดหมาย: ${location}`);
        setDestination(location)
        SpeechRecognition.stopListening();
        const id = { uid: uid,
          origin : origin,
          destination : destination };
        setMapData(id)
      },
    },
    {
      command: "ไปที่*",
      callback: (location) => {
        setMessage(`จุดหมาย: ${location}`);
        setDestination(location)
        SpeechRecognition.stopListening();
        const id = { uid: uid,
          origin : origin,
          destination : destination };
        setMapData(id)
      },
    },
    {
      command : "ยืนยัน",
      callback : () => {
        handleComfirmation()
        SpeechRecognition.stopListening();
      }
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


  return isLogin ? (
    <div className="menu-container">
      <div className="header">
        {/* Include Google Fonts CSS */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
      />
        CallBus
      <link
        href="https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap"
        rel="stylesheet"
      />
      </div>
      <div className="background-overlay"></div>
      <button id="go-back-button" onClick={() => {navigate('/')}}>
        <img src={backPic} style={{ width: "30px", height: "auto" }}></img>
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
            width: "80%",
            display: "flex",
          }}
        >
          <img
            src={pinPic}
            alt=""
            style={{ width: "20px", height: "auto" }}
          ></img>
          {/* <Autocomplete>
            <input
              type="text"
              name="location"
              placeholder="ไปที่ไหน?"
              style={{ width: "100%", height: "auto" }}
              required
            ></input>
          </Autocomplete> */}
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
        <div>
          {Object.keys(datas).map((key, index) => {
            datas[key].uid = mapData.uid;
            datas[key].key = key;
            if(datas[key].isFavorite) {
              return <History data={datas[key]} key={index}></History>;
            }
            else {
            }
          })}
        </div>
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

        {datas !== null ? (
          Object.keys(datas).map((key, index) => {
            console.log(datas[key]);
            datas[key].uid = mapData.uid;
            datas[key].key = key;
            return <History data={datas[key]} key={index}></History>;
          })
        ) : (
          <p>ไม่มีประวัตรการเดินทาง</p>
        )}
      </div>
      <div className="image-container">
        <img src={busPic} alt=""></img>
      </div>
      <div className="map-container">
        {console.log('MAPDATA : ', mapData)}
        <Map data={mapData} confirmationCallback = {handleComfirmation}></Map>
      </div>
    </div>
  ) : (
    <div>
      <p>Error</p>
    </div>
  );
}

export default Menu;
