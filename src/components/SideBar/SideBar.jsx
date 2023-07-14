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
        </header>
      </div>
    </>
  );
};

export default SideBar;
