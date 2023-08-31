import React from 'react';
import mainLogo from "../../Assets/mainLogo.png";
import OAuth from '../OAuth/OAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const handleSignup = (e) => {
    e.preventDefault();
    //Check if email and password are valid
    if (email === '' || password === '' || confirmPassword === '') {
      toast.error('Please fill all the fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    //Signup the user
    navigate('/location', { state: { email, password } });
  }
  return (
    <>
      <div className='mainlogo'>
        <img src={mainLogo} alt='logo' />
      </div>
      <div className='auth--heading'>
        Sign Up
      </div>
      <div className='auth__form--container'>
        {/* Login Form with Google Oauth and Phone OTP */}
        <OAuth />
        <div className='auth__form--or'>
          <div className='auth__form--or--text'>or</div>
        </div>
        <form className='auth__form' onSubmit={handleSignup}>
          <div className='auth__form--input'>
            <input type='text' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='auth__form--input'>
            <input type='password' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='auth__form--input'>
            <input type='password' placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className='auth__form--button'>
            <button type='submit'>Sign up</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup;