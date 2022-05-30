import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import CountUp from "react-countup";
import { ModalContexts } from "../contexts/ModalContexts";
import styles from "../styles/Main.module.css";

export default function Main(props) {
  const [amount, setAmount] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [countUp, setCountUp] = useState(false);
  const [totalValue, setTotalValue] = useState(0.0);
  const [marketCapAtTargetPrice, setMarketCapAtTargetPrice] =
    useState("0.0000");
  const [difference, setDifference] = useState(0.0);
  const countUpRef = React.useRef(null);
  const { currency, currencySelect } = useContext(ModalContexts);
  const {
    MainWrapper,
    CryptoDetails,
    Calculator,
    FormWrapper,
    Amount,
    Price,
    Button,
    EclipsLg,
    EclipsMd,
    EclipsSm,
    ResultWrapper,
    TotalValue,
    Difference,
    MarketCap,
    InputWrapper,
    iframeLogo,
    iframe,
  } = styles;
  const fontDarkStyle = props.night ? { color: "#fff" } : { color: "#000" };
  const price = props.sol?.price;
  const marketCap = props.sol?.marketCap;
  const total = props.sol?.totalSupply;
  const availableSupply = props.sol?.availableSupply;
  const onAmountChange = (e) => {
    const re = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const onPriceChange = (e) => {
    const re = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setTargetPrice(e.target.value);
    }
  };
  const onCalculate = () => {
    setCountUp(true);
    setTotalValue(amount * targetPrice);
    setMarketCapAtTargetPrice(availableSupply * targetPrice);
    setDifference(((targetPrice - price) / price) * 100);
  };
  const totalVal = totalValue.toFixed(3);

  useEffect(() => {}, []);

  return (
    <div className={MainWrapper}>
      <div>
        <iframe
          className={iframe}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            top: "0",
          }}
          src="https://my.spline.design/devicemodelcopy-0ce13ce3a9e75498edbbd02f26000b4b/"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
        <div className={iframeLogo}></div>
      </div>
      {/* <div className={EclipsLg}>
        <Image width={500} height={500} src="/bg_elips.svg" alt="elips" />
      </div>
      <div className={EclipsSm}>
        <Image width={60} height={60} src="/bg_elips.svg" alt="elips" />
      </div>
      <div className={EclipsMd}>
        <Image width={320} height={320} src="/bg_elips.svg" alt="elips" />
      </div> */}
      <div className={CryptoDetails}>
        <div className={ResultWrapper}>
          <div className={TotalValue}>
            <p style={fontDarkStyle}>Price</p>
            <span style={fontDarkStyle}>
              <CountUp
                end={price}
                duration={6}
                separator=","
                decimals={8}
                decimal="."
              />
              &nbsp;
              {currencySelect ? currency : "USD"}
            </span>
          </div>
          <div className={MarketCap}>
            <p style={fontDarkStyle}>Market Cap</p>
            <span style={fontDarkStyle}>
              <CountUp
                end={marketCap}
                duration={9}
                separator=","
                decimals={3}
                decimal="."
              />
              &nbsp;USD
            </span>
          </div>
          <div className={Difference}>
            <p style={fontDarkStyle}>Total Supply</p>
            <span style={fontDarkStyle}>
              <CountUp
                end={total}
                duration={6}
                separator=","
                decimals={3}
                decimal="."
              />{" "}
              SOL
            </span>
          </div>
        </div>
      </div>
      <div className={Calculator}>
        <h4 style={props.night ? { color: "#fff" } : { color: "#000" }}>
          CALCULATE <br /> SOLANA VALUE
        </h4>
        <div className={FormWrapper}>
          <label
            style={props.night ? { color: "#fff" } : { color: "#828282" }}
            for="amount"
          >
            Amount
          </label>
          <div className={InputWrapper}>
            <span style={fontDarkStyle}>SOL</span>
            <input
              className={Amount}
              value={amount}
              onChange={onAmountChange}
              style={fontDarkStyle}
              id="amount"
              name="amount"
            />
          </div>
          <label
            style={props.night ? { color: "#fff" } : { color: "#828282" }}
            for="target-price"
          >
            Target Price
          </label>
          <div className={InputWrapper}>
            <span style={fontDarkStyle}>USD</span>
            <input
              className={Price}
              value={targetPrice}
              onChange={onPriceChange}
              style={fontDarkStyle}
              id="price"
              name="price"
            />
          </div>
          <input
            style={
              props.night
                ? { background: "#000", color: "#fff" }
                : { background: "#c4c4c499", color: "#000" }
            }
            className={Button}
            type="submit"
            onClick={onCalculate}
            value="CALCULATE"
          />
        </div>
        <div className={ResultWrapper} style={{ marginTop: "1.5rem" }}>
          <div className={TotalValue}>
            <p style={fontDarkStyle}>Total Value</p>
            <span style={fontDarkStyle}>
              <CountUp
                end={countUp ? totalValue : ""}
                duration={1}
                separator=","
                decimals={1}
                decimal="."
              />
              &nbsp; USD
            </span>
          </div>
          <div className={Difference}>
            <p style={fontDarkStyle}>Difference To Current Price</p>
            <span style={fontDarkStyle}>
              <CountUp
                end={countUp ? difference : ""}
                duration={1}
                separator=","
                decimals={2}
                decimal="."
              />
              &nbsp; %
            </span>
          </div>
          <div className={MarketCap}>
            <p style={fontDarkStyle}>Market Cap at Target Price</p>
            <span style={fontDarkStyle}>
              <CountUp
                end={countUp ? marketCapAtTargetPrice : ""}
                duration={1}
                separator=","
                decimals={3}
                decimal="."
              />
              &nbsp; USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
