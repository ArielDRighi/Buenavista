import { useState } from "react";
import axios from "axios";
import { StyledForm, StyledInput, StyledButton, StyledLabel, StyledMessage } from "../styles/Form.styles";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const resetForm = () => {
    setForm({
      username: "",
      password: "",
    });
  };
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Ambos campos son necesarios");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/users/login", form);
      dispatch(loginSuccess(response.data.user));
      navigate("/");
      setSuccess(response.data.message);
      setError(null);
      resetForm();
    } catch (error) {
      setError(error.response.data.message);
      setSuccess(null);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="username">Nombre de usuario:</StyledLabel>
      <StyledInput name="username" value={form.username} onChange={handleChange} />
      <StyledLabel htmlFor="password">Contraseña:</StyledLabel>
      <StyledInput name="password" type="password" value={form.password} onChange={handleChange} />
      <StyledButton type="submit">Acceder</StyledButton>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
      </p>
      {error && <StyledMessage>{error}</StyledMessage>}
      {success && <StyledMessage success>{success}</StyledMessage>}
    </StyledForm>
  );
};

export default Login;
