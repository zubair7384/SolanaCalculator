import React, { useState, useEffect } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Main from "../components/Main.jsx";
import { Spinner } from "react-bootstrap";
import { ModalContexts } from "../contexts/ModalContexts";
import Axios from "axios";
import { useQuery } from "react-query";

export default function Home() {
  const [currency, setCurrency] = useState(null);
  const [ampm, setAmpm] = useState(null);
  const [time, setTime] = useState(null);
  const [currencySelect, setCurrencySelect] = useState(false);
  const [dark, setDark] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [sol, setSol] = useState({});
  const handleDark = () => {
    setDark(!dark);
  };
  const now = new Date();
  const _ampm = now.toLocaleTimeString().split(" ");
  const _time = now.toLocaleTimeString().split(":");
  const { isLoading, error, data } = useQuery("cryptoData", () =>
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=10").then(
      (res) => res.data
    )
  );

  const getCryptoData = async () => {
    const coin = await data?.coins?.filter((coin) => coin.id == "solana");
    const solanal = coin && coin[0];
    setSol(solanal);
    setCryptoData(data?.coins);

    setAmpm(_ampm[1]);
    setTime(_time[0]);
    if ((time >= 7 && ampm === "PM") || (time >= 12 && ampm === "AM")) {
      setDark(true);
    }
    if (time >= 6 && ampm === "AM") {
      setDark(false);
    }
  };

  useEffect(() => {
    getCryptoData();
  }, [data]);
  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <div
      className={styles.container}
      style={dark ? { background: "#000" } : { background: "#fff" }}
    >
      <Head>
        <title>Solana Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tomorrow:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&family=Tomorrow:wght@100;400;500&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <ModalContexts.Provider
        value={{ currency, setCurrency, setCurrencySelect, currencySelect }}
      >
        <Header className="header" handleDark={handleDark} night={dark} />
        <Main sol={sol} night={dark} />
      </ModalContexts.Provider>
      <Footer night={dark} cryptoData={cryptoData} />
    </div>
  );
}
