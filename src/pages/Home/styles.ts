import styled from "styled-components";
import { Colors } from "../../styles";
import fundo_hero from "../../assets/fundo_hero.png";

type HeaderImgProps = {
  backgroundImage: string;
};

export const Header = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${Colors.beige};
  background-image: url(${fundo_hero});
  display: flex;
  align-items: center;
  h1 {
    font-size: 18px;
  }
`;
export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;
  align-items: center;

  a {
    justify-self: center;
    display: flex;
    align-items: center;
  }
  h1 {
    font-size: 18px;
    font-weight: 900;
  }
  h1:last-child {
    justify-self: end;
    text-align: right;
  }
  .cart {
    color: ${Colors.red};
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
  }
`;
export const HeaderImg = styled.div<HeaderImgProps>`
  height: 280px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  margin-bottom: 56px;
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 32px;
    font-weight: 900;
    margin: 0;
  }

  h3 {
    font-size: 32px;
    font-weight: 100;
    margin: 0;
  }
`;
export const HeaderTextContainer = styled.div`
  max-width: 1195px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 24px 0 24px;
  h1 {
    font-size: 32px;
    font-weight: 900;
    margin: 0;
  }

  h3 {
    font-size: 32px;
    font-weight: 100;
    margin: 0;
  }
`;
export const Italian = styled.div`
  h3 {
    font-size: 32px;
    font-weight: 100;
  }
`;
export const LaDolce = styled.div`
  h3 {
    font-size: 32px;
    font-weight: 100;
  }
`;
export const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;
  width: 1195px;
  > *:nth-child(3n + 1) {
    justify-self: start;
  }

  > *:nth-child(3n + 2) {
    justify-self: center;
  }

  > *:nth-child(3n) {
    justify-self: end;
  }
`;
export const Cards = styled.div`
  background-color: ${Colors.red};
  color: ${Colors.beige};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  width: 320px;
  height: 338px;
`;
export const CardImage = styled.img`
  width: 304px;
  height: 167px;
  margin-bottom: 8px;
`;
export const CardTitle = styled.h1`
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 12px;
  align-self: flex-start;
  height: 19px;
`;
export const CardDescription = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
  height: 88px;
  line-height: 22px;
`;
export const CardButton = styled.div`
  width: 100%;
  height: 24px;
  background-color: ${Colors.beige};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.red};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 8px;

  a {
    text-decoration: none;
    color: ${Colors.red};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${Colors.red};
  color: ${Colors.beige};
  padding: 24px;
  width: 1024px;
  height: 344px;
  display: flex;
  position: relative;
  img {
    width: 280px;
    height: 280px;
    margin-right: 24px;
    object-fit: cover;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const BotaoModal = styled.button`
  margin-top: 16px;
  margin-bottom: 60px;
  margin-right: 12px;
  padding: 8px 16px;
  background-color: ${Colors.beige};
  color: ${Colors.red};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;
export const ModalClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${Colors.beige};
`;
