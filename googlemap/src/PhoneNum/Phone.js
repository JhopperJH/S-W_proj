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
  const [phoneNum, setPhoneNum] = useState("+66923629551");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null)
  const [loginState, setLoginState] = useState(false)

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
      setLoginState(true)
      // console.log(loginState)
      // createUser(res.user.uid)
      console.log(res.user.uid)
      navigate('./menu', {state : {uid : res.user.uid, phoneNumber : res.user.phoneNumber, isLogin : true}})
    })
    // Handle OTP submission logic here
    // You can use the 'otp' state to verify the OTP
    // and proceed with authentication
    
  };

  return (
    <div className="phoneContainer">
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
      {hasFilled ? (
        <form onSubmit={handleOTPSubmission}>
          <div className="container">
            <label htmlFor="phone">กรอกรหัส OTP</label>
            <input
              type="tel"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          <div className="center">
            <button id="next-button" type="submit">
              ยืนยัน
            </button>
          </div>
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
          <div className="center">
            <button id="next-button" type="submit">
              ต่อไป
            </button>
          </div>
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
