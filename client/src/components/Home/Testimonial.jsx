import React from 'react';
import TestimonialMessage from './TestimonialMessage';
import profileSample from '../../Assets/profileSample.jpg';
import './Testimonial.css';
const Testimonial = () => {
    return (
        <div className='testimonial'>
            <div className='testimonial__title'>
                Testimonial
            </div>
            <div className='testimonial__text'>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            </div>
            <div className='testimonial__messages'>
                <div className='testimonial__messages--one'>
                    <TestimonialMessage
                        image={profileSample}
                        text={"Apna Doodhwala has been a lifesaver for me. I love that I can have fresh, high-quality milk delivered right to my door, without having to make a trip to the supermarket. It's reassuring to know that I'm supporting local farmers while also getting the best possible milk for my family. I don't know what I would do without them."}
                        name= {'Radhika, Finance Professional'}
                    />
                </div>
                <div className='testimonial__messages--two'>
                    <TestimonialMessage
                        image={profileSample}
                        text={"Their milk is so fresh and delicious, and I love the convenience of having it delivered right to my door. I feel good knowing that I am supporting local farmers and getting high-quality milk without any chemicals."}
                        name= {'Amit, Businessman'}
                    />
                </div>
                <div className='testimonial__messages--three'>
                    <TestimonialMessage
                        image={profileSample}
                        text={"I am a working mom and I hardly get time to even think before ordering the essentials.I love the convenience of having milk delivered right to my door. It saves me so much time and hassle, and I don't have to worry about running out of milk.The milk from Apna Doodhwala is so delicious, my kids love it. I don't think I can ever go back to supermarket milk."}
                        name= {'Sapna, Housewife'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Testimonial;
