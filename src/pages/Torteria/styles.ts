import styled from "styled-components";
import { Colors } from "../../styles";
import fundo_hero from "../../assets/fundo_hero.png";
import trattoria from "../../assets/images/background_pasta.png";

export const Header = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${Colors.beige};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 2rem;
  background-image: url(${fundo_hero});
  .left,
  .right {
    text-align: center;
    color: ${Colors.red};
  }
  .center {
    text-align: center;
  }
`;

export const HeaderImg = styled.div`
  height: 280px;
  background-image: url(${trattoria});
  margin-bottom: 56px;
  backgroun-size:cover
  bakground-position:center;
  display:flex;
  align-items:flex-end;
  position: relative;
  .header-text{
    padding: 0 2rem;
    tex-align:left
  }
  h1 {
    font-size: 32px;
    font-weight: 900;
    color: #fff;
  }
  h3 {
    font-size: 32px;
    font-weight: 100;
    color: #fff;
  }
`;
export const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;
`;
export const Cards = styled.div`
  background-color: ${Colors.red};
  color: ${Colors.beige};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;
export const CardImage = styled.img`
  width: 100%;
  margin-bottom: 8px;
`;
export const CardTitle = styled.h1`
  font-size: 16px;
  font-weight: 900;
  padding-bottom: 8px;
  align-self: flex-start;
`;
export const CardDescription = styled.p`
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 8px;
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
export const Italian = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 25px;
`;
export const LaDolce = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 32px;
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
  margin-top: 12px;
  margin-bottom: 60px;
  margin-right: 12px;
  padding: 8px 16px;
  background-color: ${Colors.beige};
  color: ${Colors.red};
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
