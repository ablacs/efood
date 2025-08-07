import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const Colors = {
  red: "#E66767",
  beige: "#FFEBD9",
  background: "#FFF8F2",
  white: "#fff",
};
export const Container = styled.div`
  max-width: 1195px;
  margin: 0 auto;
  width: 100%;
`;
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    text-decoration:none
  }
  body {
    background-color: ${Colors.background};
    color: ${Colors.red};
  }
`;
