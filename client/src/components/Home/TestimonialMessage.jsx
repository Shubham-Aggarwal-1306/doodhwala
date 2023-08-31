import React from 'react';
import './TestimonialMessage.css';

const TestimonialMessage = ({ image, text, name }) => {
  return (
    <div className='testimonial-message'>
      <div className='testimonial-message__text'>
        {text}
      </div>
      <div className='testimonial-message__profile'>
        <div className='testimonial-message__image'>
          <img src={image} alt='profile' />
        </div>
        <div className='testimonial-message__name'>
          {name}
        </div>
      </div>

    </div>
  )
}

export default TestimonialMessage
