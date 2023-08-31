import React from 'react';
import "./PhoneAuth.css";
import { useDispatch } from 'react-redux';
import { loginWithPhone } from '../../Actions/User';
import VerifyOTP from './VerifyOTP';


const PhoneAuth = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = React.useState('');
  const handlePhone = (e) => {
    e.preventDefault();
    dispatch(loginWithPhone(`+91${phone}`));

  }
  return (
    <div className="phone-auth">
      <div className="phone-auth__form--container">
        <form className="auth__form">
          <div className="auth__form--input">
            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="auth__form--button">
            <button type="submit" onClick={handlePhone}>Send OTP</button>
          </div>
          <div className="recaptcha" id="recaptcha-container"></div>
        </form>
      </div>
      <VerifyOTP/>
    </div>
  )
}

export default PhoneAuth;