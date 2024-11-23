import styled from "styled-components";

export const Nav = styled.nav`
  background: #00bcd4; /* Celeste */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #fff;
  font-family: "Arial", sans-serif; /* Fuente agradable */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled.div`
  color: #fff;
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1rem;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #ffeb3b; /* Color de contraste al pasar el cursor */
    }
  }
`;

export const UserInfo = styled.div`
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 1rem; /* Espacio entre el nombre y el botón de logout */
`;

export const LogoutButton = styled.button`
  background: #ff5722; /* Color de botón contrastante */
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #e64a19; /* Color más oscuro al pasar el cursor */
  }
`;
