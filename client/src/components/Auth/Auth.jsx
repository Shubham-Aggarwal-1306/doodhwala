import React, { useEffect } from 'react';
import "./Auth.css";
// import authLogo from "../../Assets/authLogo.svg";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Auth = () => {
  const { loading } = useSelector(state => state.userReducer);

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
          <Outlet />
        </div>
        <div className='auth__right'>
          {/* <img src={authLogo} alt='authLogo' /> */}

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