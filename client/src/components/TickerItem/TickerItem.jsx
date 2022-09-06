import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tickersData } from "../../store/tickers/reducer";
import styles from "./TickerItem.module.css";

const TickerItem = ({ tickerData }) => {
  const {
    ticker,
    price,
    change,
    change_percent,
    dividend,
    yield: income,
    last_trade_time,
  } = tickerData;
  const companies = {
    AAPL: "Apple",
    GOOGL: "Alphabet",
    MSFT: "Microsoft",
    AMZN: "Amazon",
    FB: "Facebook",
    TSLA: "Tesla",
  };

  const [positiveTrend, setPositiveTrend] = useState(false);

  const { previousTickers } = useSelector(tickersData);

  useEffect(() => {
    previousTickers.map((previousData) => {
      if (
        previousData.ticker === ticker &&
        previousData.change_percent > change_percent
      ) {
        setPositiveTrend(false);
      } else if (
        previousData.ticker === ticker &&
        previousData.change_percent < change_percent
      ) {
        setPositiveTrend(true);
      }
      return previousData;
    });
  }, [previousTickers, change_percent, ticker]);

  const getRandomNumber = (min, max) =>
    Math.ceil(Math.random() * (max - min) + min);

  const style = {
    backgroundColor: `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
      0,
      255
    )}, ${getRandomNumber(0, 255)})`,
  };

  const time = new Date(last_trade_time);

  return (
    <tr className={styles.Table}>
      <td>{companies[ticker]}</td>
      <td className={styles.Ticker} style={style}>
        {ticker}
      </td>
      <td>{price}</td>
      <td>{change}</td>
      <td className={positiveTrend ? styles.Positive : styles.Negative}>
        {positiveTrend ? "↑" : "↓"} {change_percent} %
      </td>
      <td>{dividend}</td>
      <td>{income}</td>
      <td>
        {time.toLocaleTimeString()} ({time.toLocaleDateString()})
      </td>
    </tr>
  );
};

export default TickerItem;