import styled from "styled-components";

export const StyledNotification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) => (type === "success" ? "green" : "red")};
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
`;

export const StyledNotificationMessage = styled.span`
  flex-grow: 1;
  margin-right: 10px;
`;
