import { createStore } from "redux";

const initialState = { value: "" };
const CHANGE_VALUE = "CHANGE_VALUE";

function rootReducer(prevState, action) {
  if (action.type === CHANGE_VALUE) {
    return { ...prevState, value: action.payload };
  }
  return prevState;
}

export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export function changeValue(payload) {
  return { type: CHANGE_VALUE, payload };
}
