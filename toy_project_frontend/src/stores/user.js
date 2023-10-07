import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  userID: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoggedInOn: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
      };
    },
    isLoggedInOff: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
      };
    },
    setUserID: (state, action) => {
      return Object.assign({}, state, { userID: action.payload });
    },
    clearUserID: (state) => {
      return Object.assign({}, state, { userID: "" });
    },
    setUserEmail: (state, action) => {
      return Object.assign({}, state, { userEmail: action.payload });
    },
    setUsername: (state, action) => {
      return Object.assign({}, state, { Username: action.payload });
    },
  },
});

export default slice.reducer;

export const {
  isLoggedInOn,
  isLoggedInOff,
  setUserID,
  clearUserID,
  setUserEmail,
  setUsername,
} = slice.actions;
