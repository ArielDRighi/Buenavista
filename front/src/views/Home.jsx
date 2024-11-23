import { HomeContainer, ImageWrapper, Image, Title, Section, SubTitle } from "../styles/Home.styles";
import consultorioImage from "../assets/consultorio.jpg";

const Home = () => {
  return (
    <HomeContainer>
      <ImageWrapper>
        <Image src={consultorioImage} alt="Consultorio BuenaVista" />
      </ImageWrapper>
      <div>
        <Title>Bienvenido a BuenaVista</Title>
        <Section>
          <SubTitle>Sobre Nosotros</SubTitle>
          <p>
            En <strong>BuenaVista</strong>, nos especializamos en ofrecer un cuidado oftalmológico integral y de alta
            calidad. Fundado en 2024, nuestro consultorio ha crecido con la misión de proporcionar un entorno amigable y
            profesional para la salud visual de nuestros pacientes.
          </p>
          <p>
            Nuestro equipo está compuesto por expertos en oftalmología, comprometidos con la última tecnología y
            técnicas avanzadas para asegurar que cada paciente reciba el mejor tratamiento posible.
          </p>
          <SubTitle>Profesionales</SubTitle>
          <p>
            Contamos con un equipo de profesionales altamente capacitados, incluyendo oftalmólogos especializados,
            optometristas y personal de apoyo. Cada uno de nuestros miembros está dedicado a mejorar la salud ocular y
            el bienestar general de nuestros pacientes.
          </p>
          <p>
            <strong>Dr. Juan Pérez</strong> - Oftalmólogo especializado en cirugía refractiva y cataratas.
          </p>
          <p>
            <strong>Dra. Ana Gómez</strong> - Optometrista con experiencia en diagnóstico y tratamiento de enfermedades
            oculares.
          </p>
          <p>
            <strong>Luis Martínez</strong> - Técnico en óptica, especializado en adaptación de lentes y asesoramiento en
            el uso de productos ópticos.
          </p>
        </Section>
      </div>
    </HomeContainer>
  );
};

export default Home;
