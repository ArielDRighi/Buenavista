import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAppointments } from "../redux/appointmentsSlice";
import AppointmentCard from "../components/AppointmentCard";
import CreateAppointment from "../components/CreateAppointment";
import Notification from "../components/Notification";
import { Container, Heading } from "../styles/MisTurnos.styles";
import { useNavigate } from "react-router-dom";

const MisTurnos = () => {
  const user = useSelector((state) => state.user.user);
  const appointments = useSelector((state) => state.appointments.userAppointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/home");
    } else {
      dispatch(getUserAppointments(user.id));
    }
  }, [user, dispatch, navigate]);

  const handleCancelMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCreateMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <Container>
      <Heading>Mis Turnos</Heading>
      <CreateAppointment onClose={handleCreateMessage} />
      <Notification message={message} type={message ? "success" : "error"} onClose={() => setMessage(null)} />
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} onCancel={handleCancelMessage} />
        ))
      ) : (
        <p>Aún no hay turnos agendados para este usuario.</p>
      )}
    </Container>
  );
};

export default MisTurnos;
