import React from "react";
import { Link } from "react-router-dom";
import './SideBar.scss'
import logo from '../../assets/logo.png'

const SideBar = () => {
  return (
    <>
      <div className="flex">
        <header >
          <Link to="/">
            <img src={logo} alt="logo" className="logotip" />
          </Link>
          <Link to={'/add'}><i className="fa-solid fa-basket-shopping text-xl font-size: 1rem; text-white m-[10px] ml-[36px]"></i></Link>
        </header>
      </div>
    </>
  );
};

export default SideBar;
