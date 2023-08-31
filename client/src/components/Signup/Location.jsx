import React from 'react';
import "./Location.css";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerWithEmail } from '../../Actions/User';

const Location = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [city, setCity] = React.useState('Delhi');
  const [area, setArea] = React.useState('Delhi');
  const state = location.state;
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerWithEmail(state.email, state.password, city, area));
  }
  return (
    <div className="location">
      <div className="location__form--container">
        <form className="auth__form">
          <div className="auth__form--input">
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="select" disabled>Select City</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>
          <div className="auth__form--input">
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              <option value="select" disabled>Select Area</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>
          <div className="auth__form--button">
            <button type="submit" onClick={handleSignup}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Location;