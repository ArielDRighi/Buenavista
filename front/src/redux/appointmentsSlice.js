import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userAppointments: [],
  status: "idle",
  error: null,
};

export const getUserAppointments = createAsyncThunk("appointments/getUserAppointments", async (userId) => {
  const response = await axios.get(`http://localhost:3000/appointments/user/${userId}`);
  return response.data;
});

export const cancelAppointment = createAsyncThunk("appointments/cancelAppointment", async (appointmentId) => {
  const response = await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
  return response.data;
});

export const createAppointment = createAsyncThunk("appointments/createAppointment", async (appointment) => {
  const response = await axios.post("http://localhost:3000/appointments/schedule", appointment);
  return response.data;
});

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearAppointments: (state) => {
      state.userAppointments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAppointments = action.payload;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAppointments = state.userAppointments.map((appointment) =>
          appointment.id === action.payload.id ? { ...appointment, status: "cancelled" } : appointment
        );
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAppointments.push(action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      );
  },
});

export const { clearAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
