import styled from "styled-components";
import posed from "react-pose";

export const TextFieldsWrapper = styled.div`
  widith: 100%;
  height: 100%;
`;

const PosedTextField = posed.input({
  init: {
    borderColor: "#eee"
  },
  right: {
    borderColor: "#4CAF50"
  },
  wrong: {
    borderColor: "#F44336"
  }
});

export const TextField = styled(PosedTextField)`
  width: 200px;
  height: 40px;
  margin-right: 20px;

  outline: none;
`;

export const TextFieldWrapper = styled.div`
  height: 100%;
  display: inline-block;

  p {
    font-family: "ProductSans";
    font-weight: lighter;
    font-size: 14px;

    color: #343434;
  }
`;
