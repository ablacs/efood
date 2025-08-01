import { Container, Title } from "./styles";
import logo from "../../assets/logo.png";

export const Hero = () => (
  <Container>
    <img src={logo} alt="logo" />
    <Title>Viva experiências gastronômicas no conforto da sua casa</Title>
  </Container>
);
