import React from 'react';
import HeaderMain from '../Header/HeaderMain';
import HeaderSub from '../Header/HeaderSub';
import FooterMain from '../Footer/FooterMain';
import FooterSub from '../Footer/FooterSub';
import { Outlet } from 'react-router-dom';
import SideBar from '../Header/SideBar';

const Layout = () => {
  return (
    <>
      <HeaderSub/>
      <HeaderMain/>
      <SideBar/>
      <Outlet/>
      <FooterMain/>
      <FooterSub/>
    </>
  )
}

export default Layout