import { createSlice } from "@reduxjs/toolkit";

// Recuperar el usuario de localStorage, si existe
const storedUser = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      // Guardar el usuario en localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      // Remover el usuario de localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
