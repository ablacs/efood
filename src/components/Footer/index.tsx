import { Container, FooterDescription, LogoImage, Socials } from "./styles";
import logo from "../../assets/logo.png";
import instagram from "../../assets/instagram-round-svgrepo-com (1) 1.svg";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
export const Footer = () => (
  <>
    <Container>
      <LogoImage src={logo} alt="Logo" />
      <Socials>
        <img src={instagram} alt="Instagram logo" />
        <img src={facebook} alt="Facebook logo" />
        <img src={twitter} alt="Twitter logo" />
      </Socials>
      <FooterDescription>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.{" "}
      </FooterDescription>
    </Container>
  </>
);
