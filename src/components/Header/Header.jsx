import React, { useState } from "react";
import "./Header.scss";

const Header = (props) => {
  return (
    <>
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h2>
              {props.item}
              {props.head}
            </h2>
            <p>Главная / Товары</p>
          </div>
          <div className="header-text">
            <button onClick={() => props.setLoginClick(true)}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              <p>Выйти</p>
            </button>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Header;
