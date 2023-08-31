import React from 'react'
import './OAuth.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../../Actions/User';
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        dispatch(loginWithGoogle());
        console.log('Google Login')
    }
    const handlePhoneLogin = () => {
        console.log('Phone Login');
        navigate('/phone');
    }
    return (
        <div className='oauth'>
            <div className='oauth--form'>
                <button type='submit' onClick={handleGoogleLogin}>
                    <div className='oauth--form--logo'>
                        <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M29.1617 14.3194C29.163 13.3655 29.0797 12.4131 28.913 11.4729H15.2866V16.8647H23.0912C22.7685 18.6048 21.726 20.1417 20.2053 21.1191V24.6189H24.8632C27.5905 22.1826 29.1617 18.5797 29.1617 14.3194Z" fill="#4285F4" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2868 28C19.1861 28 22.4692 26.7593 24.8634 24.6206L20.2054 21.1207C18.9092 21.9723 17.2395 22.4583 15.2868 22.4583C11.5181 22.4583 8.31917 19.9968 7.17536 16.6796H2.37695V20.2865C4.82956 25.0152 9.82478 27.9995 15.2868 28Z" fill="#34A853" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.17535 16.6799C6.57053 14.9418 6.57053 13.0592 7.17535 11.3211V7.71426H2.37694C0.325525 11.6694 0.325525 16.3316 2.37694 20.2867L7.17535 16.6799Z" fill="#FBBC04" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2868 5.54255C17.3474 5.50974 19.3384 6.26418 20.8297 7.64248L24.9537 3.6467C22.3386 1.267 18.8742 -0.0395547 15.2868 0.000912729C9.82478 0.00113147 4.82957 2.98566 2.37695 7.71423L7.17537 11.3211C8.31917 8.00406 11.5181 5.54255 15.2868 5.54255Z" fill="#EA4335" />
                        </svg>
                    </div>
                    <div className='oauth--form--text'>Google</div>
                </button>
            </div>
            <div className='oauth--form' onClick={handlePhoneLogin}>
                <button type='submit'>
                    <div className='oauth--form--logo'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.74159 15.2583C10.4459 17.9628 12.9577 19.4705 14.8269 20.3078C16.4584 21.0387 18.3845 20.4655 19.8861 18.9639L20.2299 18.6201L16.1044 15.9947C15.3197 17.1389 13.8372 17.8088 12.357 17.1839C11.2353 16.7105 9.75186 15.9019 8.42501 14.5749C7.09812 13.248 6.28946 11.7646 5.81598 10.643C5.19119 9.16281 5.86112 7.68025 7.00519 6.89553L4.37985 2.77001L4.03601 3.11385C2.53441 4.61545 1.96128 6.54147 2.69219 8.17311C3.52945 10.0423 5.03722 12.554 7.74159 15.2583ZM13.873 22.4372C11.7558 21.4889 9.00554 19.8221 6.09168 16.9082C3.17783 13.9945 1.51109 11.2441 0.562739 9.127C-0.692256 6.32538 0.452769 3.39726 2.3861 1.46393L2.72994 1.12009C3.78547 0.0645559 5.54698 0.257919 6.34839 1.5173L9.65094 6.70695C9.82828 6.98562 9.87914 7.3264 9.79094 7.64473C9.70274 7.96305 9.48388 8.22909 9.18836 8.37681L8.44909 8.74646C7.94529 8.99835 7.84191 9.44244 7.96565 9.73556C8.36101 10.6722 9.02199 11.8721 10.0749 12.925C11.1279 13.978 12.3277 14.6389 13.2643 15.0343C13.5575 15.158 14.0016 15.0546 14.2534 14.5509L14.6232 13.8115C14.7709 13.5161 15.0369 13.2972 15.3552 13.209C15.6735 13.1208 16.0143 13.1717 16.293 13.3491L21.4827 16.6516C22.742 17.4529 22.9354 19.2145 21.8798 20.27L21.536 20.6138C19.6027 22.5472 16.6745 23.6922 13.873 22.4372Z" fill="black" />
                        </svg>
                    </div>
                    <div className='oauth--form--text'>Phone Number</div>
                </button>
            </div>
        </div>
    )
}

export default OAuth;