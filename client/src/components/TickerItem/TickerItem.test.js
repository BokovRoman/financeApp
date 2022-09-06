import { render, screen } from "@testing-library/react";
import TickerItem from "./TickerItem";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "../../store/store";

describe("<TickerItem /> component", () => {
  const store = createStore(rootReducer, {
    tickers: {
      actualTickers: [],
      previousTickers: [],
      loading: false,
      error: false,
    },
  });
  it("should render correct company using 'ticker' value", () => {
    render(
      <Provider store={store}>
        <TickerItem
          tickerData={{
            ticker: "FB",
          }}
        />
      </Provider>
      );
    screen.debug();
    screen.getByText(/facebook/i);
  });

  it("should render correct date using 'last_trade_time' value", () => {
    render(
      <Provider store={store}>
        <TickerItem
          tickerData={{
            last_trade_time: "2022-09-05T08:22:21.000Z",
          }}
        />
      </Provider>
      );
    screen.debug();
    screen.queryByText(/20:25:21 \(05\.09\.2022\)/i);
  });

  it("should render correct arrow using 'previousTickers' value", () => {
    const store = createStore(rootReducer, {
      tickers: {
        actualTickers: [],
        previousTickers: [{ ticker: "FB", change_percent: "0.55" }],
        loading: false,
        error: false,
      },
    });
    render(
      <Provider store={store}>
        <TickerItem
          tickerData={{
            ticker: "FB",
            exchange: "NASDAQ",
            price: 266.77,
            change: 171.92,
            change_percent: 0.75,
            dividend: 0.52,
            yield: 1.31,
            last_trade_time: "2022-09-05T08:23:21.000Z",
          }}
        />
      </Provider>
      );
    screen.debug();
    screen.getByText(/↑/i);
  });
});