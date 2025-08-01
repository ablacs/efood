import styled from "styled-components";
import { Colors } from "../../styles";

export const Container = styled.div`
  width: 100%;
  background-color: ${Colors.beige};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;
export const Socials = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 80px;
`;
export const LogoImage = styled.img`
  margin-bottom: 32px;
`;
export const FooterDescription = styled.p`
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  max-width: 480px;
`;
