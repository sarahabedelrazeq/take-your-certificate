import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
  userName: ""
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload
    },
  },
});

export const { setUserName } = appSlice.actions;
export default appSlice.reducer;
