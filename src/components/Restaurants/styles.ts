import styled from "styled-components";
import { Colors } from "../../styles";

export const CardsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;
  margin-bottom: 80px;
  background-color: ${Colors.background};
`;
export const Cards = styled.div`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  width: 472px;
  background-color: #fff;
  border: 1px solid ${Colors.red};
  position: relative;
`;
export const CardImage = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`;
export const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  h1 {
    font-size: 18px;
    font-weight: 700;
  }
`;
export const Nota = styled.div`
  display: flex;
  gap: 8px;
`;
export const CardDescription = styled.p`
  padding: 0 8px;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 16px;
  line-height: 1.6;
`;
export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 24px;
  background-color: ${Colors.red};
  border: none;
  color: ${Colors.white};
  margin: 8px;
  font-size: 14px;
  font-weight: 700;
  padding: 6px;
`;
export const TagContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
  margin: 16px;
`;
export const Tag = styled.div`
  background-color: ${Colors.red};
  color: ${Colors.white};
  font-size: 14px;
  font-weight: 700;
  padding: 6px;
`;
