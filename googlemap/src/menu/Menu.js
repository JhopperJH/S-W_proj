import "./menu.css";
import backPic from "../assets/back.png";
import pinPic from "../assets/pin.png";
import micPic from "../assets/mic.png";
import starPic from "../assets/star.png";
import arrowPic from "../assets/arrow.png";
import historyPic from "../assets/history.png";
import busPic from "../assets/bus.png";

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Menu() {
  const navigate = useNavigate()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  return isLoaded ? (
    <div className="menu-container">
      <div className="header">CallBus</div>
      <div className="background-overlay"></div>
      <button id="go-back-button" onClick={() => {navigate('/register')}}>
        <img src={backPic} style={{ width: "30px", height: "auto" }}></img>
      </button>
      <div className="registration-form">
        <div className="right">
          <button id="next-button" onClick={() => {navigate('/map')}}>
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
            alt="Small Image"
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
          <img
            src={micPic}
            alt="Small Image"
            style={{ width: "20px", height: "auto" }}
          ></img>
        </div>
      </div>
      <div className="container">
        <div style={{ alignItems: "center", height: "30px", display: "flex" }}>
          <p style={{ fontSize: "25px" }}>เส้นทางโปรด</p>
          <img
            src={starPic}
            alt="Small Image"
            style={{ width: "25px", height: "auto", margin: "10px" }}
          ></img>
        </div>
        <br />
        <div style={{ alignItems: "center", height: "30px", display: "flex" }}>
          <p style={{ fontSize: "25px" }}>จุฬาลงกรณ์มหาวิทยาลัย</p>
          <img
            src={arrowPic}
            alt="Small Image"
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
            alt="Small Image"
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
        <img src={busPic} alt="Small Image"></img>
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
