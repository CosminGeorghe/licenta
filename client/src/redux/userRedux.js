import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    img: null,
    token: null,
  },
  reducers: {
    loginUser: (state, action) => {
      const { id, name, img, token } = action.payload;
      state.id = id;
      state.name = name;
      state.img = img;
      state.token = token;
    },
    logoutUser: (state, action) => {
      state.id = null;
      state.name = null;
      state.img = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      const { name, img } = action.payload;
      state.name = name;
      state.img = img;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
