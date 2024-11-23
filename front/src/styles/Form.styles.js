import styled from "styled-components";

export const StyledForm = styled.form`
  background: #fff; /* Fondo blanco para los formularios */
  color: #333; /* Color de texto oscuro para buena legibilidad */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  font-family: "Arial", sans-serif; /* Fuente agradable */
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: "Arial", sans-serif;

  &:focus {
    border-color: #00bcd4; /* Color de borde en enfoque */
    outline: none;
  }
`;

export const StyledButton = styled.button`
  background: #00bcd4; /* Celeste */
  border: none;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  font-family: "Arial", sans-serif;
  font-weight: bold;

  &:hover {
    background: #0097a7; /* Color más oscuro al pasar el cursor */
  }
`;

export const StyledMessage = styled.div`
  margin-top: 1rem;
  color: ${({ success }) => (success ? "green" : "red")};
  font-size: 1rem;
  font-weight: bold;
  font-family: "Arial", sans-serif;
`;
