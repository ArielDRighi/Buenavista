import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import MisTurnos from "./views/MisTurnos";
import NavBar from "./components/NavBar";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin: 20px 0;
`;

const App = () => {
  return (
    <>
      <Title>BuenaVista - Consultorio Oftalmológico</Title>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/misTurnos" element={<MisTurnos />} />
      </Routes>
    </>
  );
};

export default App;
