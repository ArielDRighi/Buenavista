/* eslint-disable react/prop-types */

import { Card, CardContent, Info, Status, CancelButtonContainer } from "../styles/AppointmentCard.styles";
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../redux/appointmentsSlice";
import { StyledButton } from "../styles/Form.styles";

const AppointmentCard = ({ appointment, onCancel }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(cancelAppointment(appointment.id))
      .unwrap()
      .then(() => {
        onCancel("Turno cancelado con éxito");
      })
      .catch(() => {
        onCancel("Error al cancelar el turno");
      });
  };

  const statusColor = appointment.status === "active" ? "green" : "red";

  return (
    <Card>
      <CardContent>
        <Info>
          <p>
            <strong>Fecha:</strong> {appointment.date}
          </p>
          <p>
            <strong>Hora:</strong> {appointment.time}
          </p>
          <p>
            <strong>Nombre:</strong> {appointment.user.name}
          </p>
          <p>
            <strong>DNI:</strong> {appointment.user.nDni}
          </p>
        </Info>
        <Status style={{ backgroundColor: statusColor, color: "white" }}>
          <strong>Estado:</strong> {appointment.status}
        </Status>
      </CardContent>

      {/* Mensaje sobre la política de cancelación */}
      {appointment.status !== "cancelled" && (
        <>
          <p style={{ marginTop: "10px", color: "red" }}>
            Los turnos pueden ser cancelados hasta 24 horas antes de la cita.
          </p>
          <CancelButtonContainer>
            <StyledButton onClick={handleCancel}>Cancelar Turno</StyledButton>
          </CancelButtonContainer>
        </>
      )}
    </Card>
  );
};

export default AppointmentCard;
