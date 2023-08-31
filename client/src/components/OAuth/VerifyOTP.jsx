import React from 'react';
import "./PhoneAuth.css";
import { useDispatch } from 'react-redux';
import { verifyOTP } from '../../Actions/User';


const VerifyOTP = () => {
    const dispatch = useDispatch();
    const [otp, setOtp] = React.useState('');
    const handlePhone = (e) => {
        e.preventDefault();
        dispatch(verifyOTP(otp));
    }
    return (
        <div className="verify-otp">
            <div className="verify-otp__form--container">
                <form className="auth__form">
                    <div className="auth__form--input">
                        <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <div className="auth__form--button">
                        <button type="submit" onClick={handlePhone}>Submit</button>
                    </div>
                    <div className="recaptcha" id="recaptcha-container"></div>
                </form>
            </div>
        </div>
    )
}

export default VerifyOTP;