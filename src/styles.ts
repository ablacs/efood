import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const Colors = {
  red: "#E66767",
  beige: "#FFEBD9",
  background: "#FFF8F2",
  white: "#fff",
};
export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
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
