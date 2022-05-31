import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import Sidebar from "./Sidebar";
import CurrencyModal from "./CurrencyModal";
import styles from "../styles/Header.module.css";

export default function Header(props) {
  const [width, setWidth] = useState(null);
  const [openSidebar, SetOpenSidebar] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    Container,
    AppHeader,
    AppLogo,
    TooglerWrapper,
    DropDown,
    DarkModeButton,
    DarkModeButtonImage,
    HamburgerWrapper,
    ToggleNight,
    ToggleDay,
  } = styles;
  useEffect(() => {
    setWidth(window.innerWidth);
  });
  const handleSidebar = () => {
    SetOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    SetOpenSidebar(false);
  };
  const fontDarkStyle = props.night ? { color: "#fff" } : { color: "#000" };
  return (
    <div className={Container}>
      <header className={AppHeader}>
        <div className={AppLogo}>
          {props.night ? (
            <Image
              width={width > 600 ? 50 : 30}
              height={width > 600 ? 50 : 30}
              src="/calculator_logo_night.svg"
              alt="solana-calculator-night"
            />
          ) : (
            <Image
              width={width > 600 ? 50 : 30}
              height={width > 600 ? 50 : 30}
              src="/calculator_logo.svg"
              alt="solana-calculator"
            />
          )}

          <h2 style={fontDarkStyle}>
            SOLANA <br />
            CALCULATOR
          </h2>
        </div>
        <div className={TooglerWrapper}>
          <div
            className={DropDown}
            style={
              props.night ? { background: "#333333" } : { background: "#fff" }
            }
          >
            <Dropdown
              onClick={handleShow}
              style={
                props.night
                  ? { background: "#333333" }
                  : { background: "#f3f3f3" }
              }
            >
              <Image
                width={width > 600 ? 30 : 20}
                height={width > 600 ? 30 : 20}
                src="/dollor_icon.svg"
                alt="dollor-icon"
              />
              <p style={fontDarkStyle}>USD</p>
              <Dropdown.Toggle
                className={props.night ? ToggleNight : ToggleDay}
                variant="dark"
                id="dropdown-basic"
              >
                <span style={fontDarkStyle}>^</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div onClick={props.handleDark} className={DarkModeButton}>
            {props.night ? (
              <Image
                width={width > 600 ? 40 : 27}
                height={width > 600 ? 40 : 27}
                src="/day_icon.svg"
                alt="day-icon"
              />
            ) : (
              <Image
                width={width > 600 ? 40 : 27}
                height={width > 600 ? 40 : 27}
                src="/night_icon.svg"
                alt="night-icon"
              />
            )}
          </div>
          <div className={HamburgerWrapper} onClick={handleSidebar}>
            {props.night ? (
              <Image
                width={width > 600 ? 35 : 27}
                height={width > 600 ? 35 : 27}
                src="/hamburger_night.svg"
                alt="solana-calculator-hamburger-night"
              />
            ) : (
              <Image
                width={width > 600 ? 35 : 27}
                height={width > 600 ? 35 : 27}
                src="/hamburger.svg"
                alt="solana-calculator-hamburger"
              />
            )}
          </div>
        </div>
        <Sidebar
          openSidebar={openSidebar}
          handleSidebarClose={handleSidebarClose}
          handleSidebar={handleSidebar}
          night={props.night}
        />
        <CurrencyModal
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
        />
      </header>
    </div>
  );
}
