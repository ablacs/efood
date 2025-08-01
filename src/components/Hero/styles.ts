import styled from "styled-components";
import { Colors } from "../../styles";
import fundo_hero from "../../assets/fundo_hero.png";

export const Container = styled.div`
  width: 100%;
  height: 384px;
  background-color: ${Colors.beige};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${fundo_hero});
  margin-bottom: 80px;
`;
export const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  max-width: 539px;
  margin-top: 139px;
`;
