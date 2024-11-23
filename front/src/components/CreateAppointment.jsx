/* eslint-disable react/prop-types */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAppointment } from "../redux/appointmentsSlice";
import { StyledForm, StyledInput, StyledButton, StyledLabel, StyledMessage } from "../styles/Form.styles";

const CreateAppointment = ({ onClose }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    date: "",
    time: "",
    status: "pending",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.time) {
      setError("Ambos campos son necesarios");
      return;
    }

    const selectedDateTime = new Date(`${form.date}T${form.time}`);
    const currentDateTime = new Date();

    // Comparar la fecha seleccionada con la fecha actual
    if (selectedDateTime < currentDateTime) {
      setError("La fecha seleccionada no puede ser anterior a la fecha actual");
      return;
    }

    // Verificar horario de atención
    const openingTime = new Date(`2000-01-01T10:00`);
    const closingTime = new Date(`2000-01-01T22:00`);
    const selectedTime = new Date(`2000-01-01T${form.time}`);

    if (selectedTime < openingTime || selectedTime > closingTime) {
      setError("La hora seleccionada debe estar entre las 10:00 y las 22:00");
      return;
    }

    try {
      await dispatch(createAppointment({ ...form, userId: user.id })).unwrap();
      onClose("Turno creado con éxito");
      setError(null);
      setForm({
        date: "",
        time: "",
        status: "pending",
      });
    } catch (error) {
      console.error("Error creating appointment:", error); // Log para verificar el error en la consola del navegador
      setError(error.response?.data?.message || "No se pueden agendar turnos en sábados y domingos.");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <p>El horario de atención es de Lunes a Viernes de 10:00hs a 22:00hs</p>

      <StyledLabel htmlFor="date">Fecha:</StyledLabel>
      <StyledInput name="date" type="date" value={form.date} onChange={handleChange} />

      <StyledLabel htmlFor="time">Hora:</StyledLabel>
      <StyledInput name="time" type="time" value={form.time} onChange={handleChange} />

      <StyledButton type="submit">Crear turno</StyledButton>

      {error && <StyledMessage>{error}</StyledMessage>}
    </StyledForm>
  );
};

export default CreateAppointment;
