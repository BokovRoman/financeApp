import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import tickersReducer from "./tickers/reducer";

export const rootReducer = combineReducers({
  tickers: tickersReducer,
});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devTools)
);

export default store;