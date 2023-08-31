import React from 'react';
import "./Forgot.css";
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../Actions/User';

const Forgot = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const handleForgot = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }
  return (
    <div className="forgot">
      <div className="forgot__form--container">
        <form className="auth__form">
          <div className="auth__form--input">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="auth__form--button">
            <button type="submit" onClick={handleForgot}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Forgot;