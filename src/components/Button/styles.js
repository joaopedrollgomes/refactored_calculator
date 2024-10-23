import styled from "styled-components";

export const ButtonContainer = styled.button`
  padding: 24px;
  border: 1px solid #000000;
  border-radius: 16px;
  background-color: #D3D3D3;
  font-size: 24px;
  font-weight: 700;
  flex: 1;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &:active {
    background-color: #DCDCDC;
  }

  &#operationButton {
    background-color: #FA8072;
  }

  &#operationButton:active {
    background-color: #FF6347;
  }

  &#clearButton {
    background-color: #808080;
  }

  &#clearButton:active {
    background-color: #C0C0C0;
  }
`;