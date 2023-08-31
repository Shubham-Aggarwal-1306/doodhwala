import React from 'react';
import "./Login.css";
import mainLogo from "../../Assets/mainLogo.png";
import OAuth from '../OAuth/OAuth';
import { useDispatch } from 'react-redux';
import { loginWithEmail } from '../../Actions/User';
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithEmail(email, password));
  }
  return (
    <>
      <div className='mainlogo'>
        <img src={mainLogo} alt='logo' />
      </div>
      <div className='auth--heading'>
        Login
      </div>
      <div className='auth__form--container'>
        {/* Login Form with Google Oauth and Phone OTP */}
        <OAuth />
        <div className='auth__form--or'>
          <div className='auth__form--or--text'>or</div>
        </div>
        <form className='auth__form' onSubmit={handleLogin}>
          <div className='auth__form--input'>
            <input type='text' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='auth__form--input'>
            <input type='password' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='login__form--forgot'>
            <a href='/forgot'>Forgot Password?</a>
          </div>
          <div className='auth__form--button'>
            <button type='submit'>Login</button>
          </div>
        </form>
        <div className='login__form--signup'>
          <div className='login__form--signup--text'>Don’t you have an account?</div>
          <div className='login__form--signup--link'>
            <a href='/signup'>Sign Up</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;