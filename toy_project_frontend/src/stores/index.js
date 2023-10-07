import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import { save, load } from "redux-localstorage-simple";

const reducer = combineReducers({
  user: userReducer,
});
const store = configureStore({
  reducer,
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
});

export default store;
