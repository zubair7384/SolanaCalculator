import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../styles/Footer.module.css";
import Marquee from "react-fast-marquee";

const Footer = (props) => {
  const { cryptoData, night } = props;
  const {
    AppFooter,
    CryptoWrapper,
    CryptoWrapperDark,
    ItemWrapper,
    CalculatorCopyRight,
    FooterBrand,
    FooterBrandDark,
  } = styles;

  return (
    <div
      className={AppFooter}
      style={
        night
          ? { background: "#000" }
          : {
              background: "#fff",
            }
      }
    >
      {/* <div className={night ? CryptoWrapperDark : CryptoWrapper}>
        <Marquee gradientWidth="0">
          {cryptoData &&
            cryptoData.map((item) => (
              <div className={ItemWrapper} key={item.name}>
                <h3 className={item.id}>{item.name}&nbsp;.</h3>
              </div>
            ))}
        </Marquee>
      </div> */}
      <div className={CalculatorCopyRight}>
        <p>Solana Claculator - Copyright 2022 | solanacalculator.com</p>
      </div>
      <Marquee gradientWidth="0" direction="right">
        <div className={night ? FooterBrandDark : FooterBrand}>
          <h2>SOLANA CALCULATOR</h2>
        </div>
      </Marquee>
    </div>
  );
};
export default Footer;
