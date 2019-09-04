import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 55px;
  position: relative;
  display: inline-block;
`;

export const Square = styled.div`
  width: 40px;
  height: 40px;
  position: relative;

  margin-right: 6px;

  border-radius: 4px;

  display: inline-block;

  cursor: pointer;

  background-color: ${props => props.bgColor || "#eee"};
`;

export const Indices = styled.p`
  width: 40px;
  height: 40px;
  position: absolute;

  margin-right: 6px;

  border-radius: 4px;

  color: #343434;

  display: inline-block;

  font-family: "ProductSans";
  font-weight: lighter;
  font-size: 16px;

  text-align: center;

  top: -26px;
`;

export const Cross = styled.img`
  width: 38px;
  height: 38px;

  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  opacity: ${props => props.opacity || 0};
  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }
`;
