import styled from "styled-components";
import posed from "react-pose";

export const TextFieldsWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PosedTextField = posed.input({
  init: {
    borderColor: "#eee",
    border: "1px solid #eee",
    borderRadius: 0
  },
  right: {
    borderColor: "#4CAF50",
    border: "2px solid #4CAF50",
    borderRadius: 3
  },
  wrong: {
    borderColor: "#F44336",
    border: "2px solid #F44336",
    borderRadius: 3
  }
});

export const TextField = styled(PosedTextField)`
  width: 200px;
  height: 40px;
  margin-right: 20px;
  padding-left: 8px;
  padding-right: 8px;

  border: solid 1px #eee;
  outline: none;
  
  font-size: 18px;
  font-family: "ProductSans";
  font-weight: lighter;
  
  color: #343434;
`;

export const TextFieldWrapper = styled.div`
  height: 100%;
  display: inline-block;

  p {
    font-family: "ProductSans";
    font-weight: lighter;
    font-size: 18px;

    padding-left: 8px;
    padding-right: 8px;
    
    color: #343434;
  }
`;
