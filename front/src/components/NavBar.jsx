import { useSelector, useDispatch } from "react-redux";
import { Nav, NavLink, UserInfo, LogoutButton, NavLinksContainer } from "../styles/NavBar.styles";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { clearAppointments } from "../redux/appointmentsSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearAppointments());
    navigate("/");
  };

  return (
    <Nav>
      <NavLinksContainer>
        <NavLink>
          <Link to="/">Home</Link>
        </NavLink>
        {user && (
          <NavLink>
            <Link to="/misturnos">Mis Turnos</Link>
          </NavLink>
        )}
        {!user ? (
          <>
            <NavLink>
              <Link to="/register">Crear Usuario</Link>
            </NavLink>
            <NavLink>
              <Link to="/login">Ingresar</Link>
            </NavLink>
          </>
        ) : null}
      </NavLinksContainer>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
        {user && (
          <>
            <UserInfo>{user.name}</UserInfo>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        )}
      </div>
    </Nav>
  );
};

export default NavBar;
