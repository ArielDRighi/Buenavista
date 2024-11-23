import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appointmentsReducer from "./appointmentsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  appointments: appointmentsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
