import React, { useEffect } from 'react';
import "./Auth.css";
import { useDispatch, useSelector } from 'react-redux';
import authLogo from '../../Assets/authLogo.svg';
import { Login } from '../../Actions/Auth';
const Auth = () => {
  const { loading } = useSelector(state => state.authReducer);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(Login(email, password));
  }
  //Loading screen not working
  useEffect(() => {
    if (loading) {
      document.querySelector('.loadScreen').style.display = 'block';
    } else {
      document.querySelector('.loadScreen').style.display = 'none';
    }
  }, [loading])



  return (
    <>
      <div className='loadScreen'>
      </div>
      <div className='auth'>
        <div className="loadScreen">
        </div>
        <div className='auth__left'>
        <form className='auth__form' onSubmit={handleLogin}>
          <div className='auth__form--default'>
            ID: a1@gmail.com Pass: 123456
          </div>
          <div className='auth__form--input'>
            <input type='text' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='auth__form--input'>
            <input type='password' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='auth__form--button'>
            <button type='submit'>Login</button>
          </div>
        </form>
        </div>
        <div className='auth__right'>
          <img src={authLogo} alt='authLogo' />

          <div className='auth__right--text'>
            Get Quality Milk at Apna Doodhwala
            <br />
            Subscribe now!
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth;