import { render, screen } from "@testing-library/react";
import TickersList from "./TickersList";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "../../store/store";

describe("<TickersList /> component", () => {
  const store = createStore(rootReducer, {
    tickers: {
      actualTickers: [],
      previousTickers: [],
      loading: false,
      error: false,
    },
  });
  it("should render 'loading' text", () => {
    render(
      <Provider store={store}>
        <TickersList />
      </Provider>
      );
    screen.debug();
    screen.getByText(/loading/i);
  });
});