import React from 'react';
import BookTrial from './BookTrial';
import MeetTeam from './MeetTeam';
import Testimonial from './Testimonial';
import Delivery from '../Delivery/Delivery';
import HomeProducts from './HomeProducts';
import HomeHero from './HomeHero';

const Home = () => {
  return (
    <>
      <HomeHero/>
      <HomeProducts/>
      <Delivery/>
      <Testimonial/>
      <MeetTeam/>
      <BookTrial/>
    </>
  )
}

export default Home