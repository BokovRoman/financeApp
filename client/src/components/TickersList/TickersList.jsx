import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  getTickers,
  getTickersRequested,
  getTickersError,
} from "../../store/tickers/actions";
import { tickersData } from "../../store/tickers/reducer";
import TickerItem from "../TickerItem";
import { Audio } from "react-loader-spinner";
import styles from "./TickersList.module.css";

const socket = io("http://localhost:4000");

const TickersList = () => {
  const dispatch = useDispatch();
  const { actualTickers, loading, error } = useSelector(tickersData);

  useEffect(() => {
    dispatch(getTickersRequested());
    socket.emit("start");
    socket.on("ticker", (quotes) => dispatch(getTickers(quotes)));
    socket.on("connect_error", function () {
      dispatch(getTickersError());
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch]);

  const tickerItems = actualTickers.map((tickerData) => (
    <TickerItem key={tickerData.ticker} tickerData={tickerData} />
  ));

  const tableTitles = [
    "company",
    "ticker",
    "price",
    "change",
    "change percent",
    "dividend",
    "yield",
    "last trade time",
  ];

  const titleItems = tableTitles.map((title) => <th key={title}>{title}</th>);

  return (
    <main className={styles.Section}>
      {loading && (
        <div className={styles.Loader}>
          <Audio
            heigth="85"
            width="85"
            color="#bef557"
            ariaLabel="loading-indicator"
          />
          <p className={styles.loaderText}>Loading</p>
        </div>
      )}
      {error && (
        <p className={styles.Error}>
          Sorry, something went wrong. Please, you can visit our service later.
        </p>
      )}
      {!loading && !error && (
        <>
          <h3 className={styles.Title}>Our Finance Service</h3>
          <table className={styles.Table}>
            <thead>
              <tr className={styles.Head}>{titleItems}</tr>
            </thead>
            <tbody>{tickerItems}</tbody>
          </table>
        </>
      )}
    </main>
  );
};

export default TickersList;