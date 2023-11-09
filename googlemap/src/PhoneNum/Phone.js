import "./Phone.css";
import busImg from "../assets/bus.png";
import { useState } from "react";
import { Link, useHref, useNavigate } from "react-router-dom";

function Phone() {
  const navigate = useNavigate()


  const [phoneNum, setPhoneNum] = useState(null);

  const getPhoneNum = (event) => {
    setPhoneNum(event.target.value);
  };

  const validateInput = (event) => {
    event.preventDefault()
    const userInput = phoneNum.trim()
    console.log(userInput)
    if (!userInput) {
      alert("กรุณากรอกเบอร์โทรศัพท์");
    }else if(isNaN(userInput)) {
        alert('กรุณากรอกแค่ตัวเลขลงช่องเบอร์โทรศัพท์')
    }else if(userInput.length != 10) {
        alert('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก')
    }else{
        //link to register page
        navigate('/register')
    }
  }
  return (
    <div className="phoneContainer">
      <div className="header">CallBus</div>
      <div className="background-overlay"></div>
      <div className="container">
        <form>
          <label for="phone">กรุณากรอกเบอร์โทรศัพท์</label>
          <input
            type={"tel"}
            value={phoneNum}
            onChange={getPhoneNum}
            placeholder="Enter your phone number"
            required
          ></input>
        </form>
      </div>
      <Link to = '/register'>
      <button id="next-button" type="submit" onClick={validateInput}>
        ต่อไป
      </button>
      </Link>
      <div className="image-container">
        <img src={busImg} alt="Small Image"></img>
      </div>
      <label className="ending">
        2023 CallBus Inc. Term and Condition <br></br>
      </label>
    </div>
  );
}

export default Phone;
