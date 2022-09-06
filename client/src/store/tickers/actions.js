export const getTickersRequested = () => {
  return {
    type: "GET_TICKERS_REQUESTED",
  };
};

const getTickersActual = (tickers) => {
  return {
    type: "GET_TICKERS_ACTUAL",
    payload: tickers,
  };
};

const getTickersPrevious = (tickers) => {
  return {
    type: "GET_TICKERS_PREVIOUS",
    payload: tickers,
  };
};

export const getTickersError = () => {
  return {
    type: "GET_TICKERS_ERROR",
  };
};

export const getTickers = (tickers) => (dispatch, getState) => {
  dispatch(
    getTickersPrevious(
      getState().tickers.actualTickers.map((ticker) => ({
        ticker: ticker.ticker,
        change_percent: ticker.change_percent,
      }))
    )
  );
  dispatch(getTickersActual(tickers));
};