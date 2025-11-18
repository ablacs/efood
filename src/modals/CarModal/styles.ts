import styled from "styled-components";
import { Colors } from "../../styles";

export const SideModal = styled.div`
  width: 360px;
  height: 100%;
  background-color: ${Colors.red};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 32px 8px;
`;
export const CardModal = styled.div`
  display: flex;
  padding: 8px 8px 12px 8px;
  background-color: ${Colors.beige};
  position: relative;
  margin-bottom: 16px;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
`;
export const CartDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 8px;

  h1 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
`;
export const CloseIcon = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: green;
  img {
    width: 24px;
    height: 24px;
  }
`;
export const Value = styled.div`
  display: flex;
  padding: 8px;
  margin-top: 40px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  color: ${Colors.beige};
  h1 {
    font-size: 18px;
    font-weight: 700;
  }
`;
export const ModalForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 8px;
  align-items: flex-start;
  color: ${Colors.beige};
  h1 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  h2 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    height: 32px;
    margin-bottom: 8px;
    padding: 8px;
    background-color: ${Colors.beige};
    border: none;
    &:focus {
      outline: none;
    }
  }
  p{
    margin-bottom: 16px;}
  }
    .error-message {
    color: ${Colors.red};
    background-color: ${Colors.beige};
    padding: 8px;
    margin-bottom: 16px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    }
`;
export const ModalButtons = styled.div`
  margin-top: 24px;
  width: 100%;
`;
export const CEP = styled.div`
  display: flex;
  gap: 34px;
`;
export const CEPDescription = styled.div`
  display: flex;
  flex-direction: column;
`;
