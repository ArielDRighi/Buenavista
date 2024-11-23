/* eslint-disable react/prop-types */
import { StyledNotification, StyledNotificationMessage } from "../styles/Notification.styles";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <StyledNotification type={type}>
      <StyledNotificationMessage>{message}</StyledNotificationMessage>
      <button onClick={onClose}>X</button>
    </StyledNotification>
  );
};

export default Notification;
