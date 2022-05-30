import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import currencyArr from "./helperData/currencyData";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { ModalContexts } from "../contexts/ModalContexts";
import { useQuery } from "react-query";
import styles from "../styles/CurrencyModal.module.css";

const CurrencyModal = (props) => {
  const [toLocal, setToLocal] = useState({});
  const [newArr, setNewArr] = useState([]);
  const [currencyRates, setCurrencyRates] = useState([]);
  const { currency, setCurrency, setCurrencySelect } =
    useContext(ModalContexts);

  const [activeCurrency, setActiveCurrency] = useState("");
  const { ModalCurrency, currencyWrapper, CurrencyContainer, ActiveList } =
    styles;

  const handleCurrency = (name, value, index, notation) => {
    setToLocal({
      name: name,
      value: value,
    });
    setCurrency(notation);
    setActiveCurrency(index);
    setCurrencySelect(true);
  };
  const requestOptions = {
    redirect: "follow",
  };
  // const { isLoading, error, data } = useQuery("exchageRates", () =>
  //   Axios({
  //     method: "get",
  //     url: "https://api.apilayer.com/exchangerates_data/latest?base=USD&apikey=zWveZDhWJCpDbtQPewIRNqjJiPzfjDPz",
  //     requestOptions,
  //   }).then((res) => res.data)
  // );
  const getCurrencyData = async () => {
    // const res = await Axios({
    //   method: "get",
    //   url: "https://api.apilayer.com/exchangerates_data/latest?base=USD&apikey=zWveZDhWJCpDbtQPewIRNqjJiPzfjDPz",
    //   requestOptions,
    // });
    // const arr = Object.keys(data?.rates).map((key) => ({
    //   name: key,
    //   value: data?.rates[key],
    // }));
    // setCurrencyRates(arr);
  };
  useEffect(() => {
    const data = localStorage.getItem("toLocal");
    data ? setToLocal(JSON.parse(data)) : "";
  }, []);
  useEffect(() => {
    getCurrencyData();
    localStorage.setItem("toLocal", JSON.stringify(toLocal));
  }, [toLocal]);

  return (
    <>
      <Modal
        className={ModalCurrency}
        show={props.show}
        onHide={props.handleClose}
        animation={false}
      >
        <Modal.Header>
          <Image
            style={{ cursor: "pointer" }}
            onClick={props.handleClose}
            width={20}
            height={20}
            src="/close.svg"
            alt="close"
          />
        </Modal.Header>
        <Modal.Body>
          <ul className={currencyWrapper}>
            {currencyArr?.map((item, index) => (
              <li
                className={activeCurrency == index ? "ActiveList" : ""}
                key={item.id}
                onClick={() =>
                  handleCurrency(item.name, item.value, index, item.notation)
                }
              >
                {item.name}
                <span>
                  {item.currency}-{item.notation}
                  {/* {item.value.toFixed(3)} */}
                </span>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default CurrencyModal;
