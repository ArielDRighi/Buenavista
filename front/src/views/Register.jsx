import { useState, useEffect } from "react";
import axios from "axios";
import { StyledForm, StyledInput, StyledButton, StyledLabel, StyledMessage } from "../styles/Form.styles";
import { validateName, validateEmail, validatePassword, validateDNI } from "../utils/validations";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { useSelector } from "react-redux";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Obtener el usuario del estado global

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirige si el usuario ya está logueado
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los datos del formulario
    if (!validateName(form.name)) {
      setError("Nombre inválido. Solo se permiten letras y espacios");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Debe ser una dirección de correo electrónico válida");
      return;
    }
    if (!validatePassword(form.password)) {
      setError(
        "Contraseña inválida. Debe tener al menos 8 caracteres, contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
      );
      return;
    }
    if (!validateDNI(form.nDni)) {
      setError("DNI inválido. Debe tener 8 dígitos");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users/register", form);
      setSuccess("Usuario creado con éxito");
      setError(null);
      setForm({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
      });
      setTimeout(() => {
        setSuccess(null);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Error al registrar usuario");
      setSuccess(null);
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="name">Nombre:</StyledLabel>
        <StyledInput name="name" type="text" value={form.name} onChange={handleChange} />
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledInput name="email" type="email" value={form.email} onChange={handleChange} />
        <StyledLabel htmlFor="birthdate">Fecha de nacimiento:</StyledLabel>
        <StyledInput name="birthdate" type="date" value={form.birthdate} onChange={handleChange} />
        <StyledLabel htmlFor="nDni">DNI:</StyledLabel>
        <StyledInput name="nDni" type="text" value={form.nDni} onChange={handleChange} />
        <StyledLabel htmlFor="username">Usuario:</StyledLabel>
        <StyledInput name="username" type="text" value={form.username} onChange={handleChange} />
        <StyledLabel htmlFor="password">Contraseña:</StyledLabel>
        <StyledInput name="password" type="password" value={form.password} onChange={handleChange} />
        <StyledButton type="submit">Registrarse</StyledButton>
        <p>
          ¿Ya estás registrado? <Link to="/login">Iniciar sesión</Link>
        </p>
        {error && <StyledMessage>{error}</StyledMessage>}
      </StyledForm>
      {success && <Notification message={success} type="success" onClose={() => setSuccess(null)} />}
    </>
  );
};

export default Register;
