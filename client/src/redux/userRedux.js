import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    token: null,
  },
  reducers: {
    loginUser: (state, action) => {
      const { id, name, token } = action.payload;
      state.id = id;
      state.name = name;
      state.token = token;
    },
    logoutUser: (state, action) => {
      state.id = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
