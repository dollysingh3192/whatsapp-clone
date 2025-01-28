// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import InitialState, { UpdateCounterAction } from "../types/counter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: UpdateCounterAction,
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setCounter: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setCounter } =
  counterSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default counterSlice.reducer;