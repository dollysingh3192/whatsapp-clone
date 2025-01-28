// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { configureStore } from "@reduxjs/toolkit";
// This is how you import a reducer, based on the prior export.
import counterReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    // You are free to call the LHS what you like, but it must have a reducer on the RHS.
    counter: counterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;