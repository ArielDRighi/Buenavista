import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  align-items: flex-start; /* Alinea los elementos en la parte superior */
  justify-content: center; /* Centra los elementos horizontalmente */
  padding: 2rem;
  font-family: "Arial", sans-serif;
  color: #333;
`;

export const ImageWrapper = styled.div`
  flex: 1; /* Permite que la imagen ocupe 1 parte del espacio disponible */
  margin-right: 2rem; /* Espacio entre la imagen y el texto */
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const Title = styled.h1`
  color: #00bcd4;
  margin-bottom: 1rem;
`;

export const Section = styled.section`
  flex: 2; /* Permite que el texto ocupe 2 partes del espacio disponible */
  margin: 1rem auto;
  max-width: 800px;
  text-align: left;
  font-size: 1rem;
`;

export const SubTitle = styled.h2`
  color: #0097a7;
  margin-bottom: 0.5rem;
`;
