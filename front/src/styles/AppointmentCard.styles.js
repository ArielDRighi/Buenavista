import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #f9f9f9;
  position: relative; /* Para posicionar el botón de cancelar dentro de la tarjeta */
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem; /* Espacio entre la información y el estado */
`;

export const Info = styled.div`
  display: flex;
  gap: 2rem; /* Espacio entre cada dato */
  align-items: center;

  p {
    margin: 0;
    padding: 0;
    font-size: 0.9rem;
  }
`;

export const Status = styled.div`
  border: 2px solid;
  border-radius: 4px;
  padding: 0.5rem;
  font-weight: bold;
  text-align: center;
  min-width: 120px; /* Ajusta el ancho según sea necesario */
  white-space: nowrap; /* Asegura que el texto no se rompa en múltiples líneas */
  color: white;
`;

export const CancelButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem; /* Espacio superior para el botón */
`;
