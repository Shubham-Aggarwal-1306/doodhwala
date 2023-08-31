import React from 'react'
import "./FooterSub.css";
import Links from '../../config/Links';

const FooterSub = () => {
  return (
    <div className='footer-sub__container'>
      <div className='footer-sub__text'>
        Download ApkaDoodhwala App
      </div>
      <a className='footer-sub__download' href={Links.playstore}>
        <div className='footer-sub-download--icon'>
          <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4539 15.157L5.67099 0.890697L25.7519 11.2826L21.4539 15.157ZM1.55184 0.0526428C0.622164 0.49101 0 1.29038 0 2.32828V30.777C0 31.8149 0.622164 32.6143 1.55184 33.0526L19.9021 16.5494L1.55184 0.0526428ZM31.9592 14.5961L27.7471 12.3978L23.0487 16.5559L27.7471 20.7139L32.045 18.5156C33.3323 17.5938 33.3323 15.518 31.9592 14.5961ZM5.67099 32.221L25.7519 21.8292L21.4539 17.9548L5.67099 32.221Z" fill="#50A8DC" />
          </svg>
        </div>
        <div className='footer-sub__download--text'>
          <div className='footer-sub__download--text--small'>
            Get in
          </div>
          <div className='footer-sub__download--text--large'>
            Google Play
          </div>
        </div>
      </a>
    </div>
  )
}

export default FooterSub