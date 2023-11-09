import './register.css'
import backIcon from '../assets/back.png'
import bus from '../assets/bus.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {

  const navigate = useNavigate()  

  const [title, setTitle] = useState(null)
  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)
  const [id, setId] = useState(null)

  
  const getTitle = (event) => {setTitle(event.target.value.trim())}
  const getName = (event) => {setName(event.target.value.trim())}
  const getSurName = (event) => {setSurname(event.target.value.trim())}
  const getId = (event) => {setId(event.target.value.trim())}

  const validateInput = (event) => {
    event.preventDefault()

    const userTitle = title
    const userName = name
    const userSurname = surname
    const userId = id

    if (userTitle == '') {alert('โปรดเลือกคำนำหน้าชื่อ')}
    else if(!userName || !userSurname || !userId) {alert('โปรดกรอกช้อมูลของท่านให้ครบถ้วน')}
    else if(isNaN(userId)) {alert('กรุณาใส่แค่ตัวเลขลงช่องหมายเลขบัตรประชาชน')}
    else if(userId.length != 13 ) {alert('กรุณาใส่หมายเลขบัตรประชาชนให้ครบ 13 หลัก')}
    else{
        navigate('/menu')
    }
  }

  return (
    <div className="register-body">
      <div className="header">CallBus</div>
      <div className="background-overlay"></div>
      <button id="go-back-button" onClick={() => {navigate('/')}}>
        <img src={backIcon} style={{width : '30px', height : 'auto'}}></img>
      </button>
      <div className="container">
        <div className="registration-form">
          <label for="title">คำนำหน้าชื่อ</label>
          <select
            type={'text'}
            value={title}
            onChange={getTitle}
            name="title"
            class="custom-select"
            required
          >
            <option value="" disabled selected>
              คำนำหน้าชื่อ
            </option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>

          <label for="name">ชื่อจริง</label>
          <input
            type={'text'}
            value={name}
            onChange={getName}
            name="name"
            placeholder="ชื่อจริง"
            required
          ></input>

          <label for="surname">นามสกุล</label>
          <input
            type={'text'}
            value={surname}
            onChange={getSurName}
            name="surname"
            placeholder="นามสกุล"
            required
          ></input>

          <label for="id">เลขบัตรประชาชน:</label>
          <input
            type={'text'}
            value={id}
            onChange={getId}
            name="id"
            placeholder="หมายเลขบัตรประชาชน"
            required
          ></input>
        </div>
      </div>
      <div className="mid">
        <button id="next-button" onClick={validateInput}>
          Next
        </button>
      </div>
      <div className="image-container">
        <img src={bus} alt="Small Image"></img>
      </div>
      <label className="ending">
        2023 CallBus Inc. Term and Condition <br></br>
        Invisible reCAPTCHA by Google Privacy Policy and Terms of use
      </label>
    </div>
  );
}

export default Register;
