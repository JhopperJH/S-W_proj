import "./Phone.css";
import busImg from "../assets/bus.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth} from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {getDatabase, set, ref} from 'firebase/database'
function Phone() {
  const navigate = useNavigate();

  const [hasFilled, setHasFilled] = useState(false);
  const [phoneNum, setPhoneNum] = useState("+66");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null)

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
        },
      },
      auth
    );
  };

  const requestOTP = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNum, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getPhoneNum = (event) => {
    setPhoneNum(event.target.value);
  };

  const createUser = (userId) => {
    const db = getDatabase()
    set(ref(db, 'user/' + userId), {
      phoneNumber : phoneNum
    })
  }

  const handleOTPSubmission = (event) => {
    event.preventDefault();
    window.confirmationResult
    .confirm(otp)
    .then(async (res) => {
      console.log(res);
      setUser(res.user)
      console.log(user)
      createUser(res.user.uid)
      navigate('./menu', {state : {phoneNumber : res.user.phoneNumber, uid : res.user.uid}})
    })
    // Handle OTP submission logic here
    // You can use the 'otp' state to verify the OTP
    // and proceed with authentication
    
  };

  return (
    <div className="phoneContainer">
      <div className="header">CallBus</div>
      <div className="background-overlay"></div>
      {hasFilled ? (
        <form onSubmit={handleOTPSubmission}>
          <div className="container">
            <label htmlFor="phone">กรอกรหัส OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          <button id="submit-otp-button" type="submit">
            ยืนยัน
          </button>
        </form>
      ) : (
        <form onSubmit={requestOTP}>
          <div className="container">
            <label htmlFor="phone">กรุณากรอกเบอร์โทรศัพท์</label>
            <input
              type="tel"
              value={phoneNum}
              onChange={getPhoneNum}
              placeholder="Enter your phone number"
              required
            ></input>
          </div>
          <button id="next-button" type="submit">
            ต่อไป
          </button>
        </form>
      )}
      <div className="image-container">
        <img src={busImg} alt="Small Image"></img>
      </div>
      <label className="ending">
        2023 CallBus Inc. Term and Condition <br></br>
      </label>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Phone;
