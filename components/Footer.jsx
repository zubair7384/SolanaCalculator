import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../styles/Footer.module.css";

const Footer = (props) => {
  const { cryptoData, night } = props;
  const coinData = cryptoData?.flatMap((i) => [i, i]);
  const {
    AppFooter,
    CryptoWrapper,
    CryptoWrapperDark,
    ItemWrapper,
    CalculatorCopyRight,
    FooterBrand,
    FooterBrandDark,
  } = styles;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 30000,
    autoplaySpeed: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={AppFooter}>
      <div className={night ? CryptoWrapperDark : CryptoWrapper}>
        <Slider {...settings}>
          {cryptoData &&
            cryptoData.map((item) => (
              <div className={ItemWrapper} key={item.name}>
                <h3 className={item.id}>{item.name}&nbsp;.</h3>
              </div>
            ))}
        </Slider>
      </div>
      <div className={CalculatorCopyRight}>
        <p>Solana Claculator - Copyright 2022 | solanacalculator.com</p>
      </div>
      <div className={night ? FooterBrandDark : FooterBrand}>
        <h2>SOLANA CALCULATOR</h2>
      </div>
    </div>
  );
};
export default Footer;
