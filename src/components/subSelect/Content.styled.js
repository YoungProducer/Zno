import posed from "react-pose";
import styled from "styled-components";

import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        display: "block"
      }
    },
    MuiFormLabel: {
      root: {
        color: "#333",
        "&$focused": {
          color: "#333"
        },
        fontFamily: "ProductSans",
        fontWeight: "lighter",
        fontSize: "18px",
        marginBottom: 15
      }
    },
    MuiOutlinedInput: {
      root: {
        width: 220,
        height: 47,
        "&$focused $notchedOutline": {
          borderColor: "#565656",
          borderWidth: 2
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#565656"
        }
      },
      notchedOutline: {
        borderColor: "#E7E5E2",
        borderWidth: 2
      }
    },
    MuiTextField: {
      root: {
        marginBottom: 15
      }
    },
    MuiFormHelperText: {
      root: {
        marginLeft: 0,
        fontFamily: "ProductSans",
        fontWeight: "lighter",
        fontSize: "14px",
        color: "#6F6F6F"
      },
      contained: {
        marginLeft: 0
      }
    },
    MuiSelect: {
      root: {
        fontFamily: "ProductSans",
        fontWeight: "lighter",
        fontSize: "18px",
        color: "#565656"
      },
      select: {
        backgroundColor: "",
        "&:focus": {
          backgroundColor: "#fff"
        }
      }
    },
    MuiMenuItem: {
      root: {
        fontFamily: "ProductSans",
        fontWeight: "lighter",
        fontSize: "18px",
        color: "#565656"
      }
    },
    MuiFormControlLabel: {
      label: {
        fontFamily: "ProductSans",
        fontWeight: "lighter",
        fontSize: "18px",
        color: "#333333"
      }
    },
    MuiRadio: {
      colorPrimary: {
        color: "#E7E5E2",
        "&$checked": {
          color: "#E57373"
        }
      }
    }
  }
});

const EclipsePosed = posed.div({
  hidden: {
    applyAtEnd: {
      display: "none"
    },
    opacity: 0
  },
  visible: {
    applyAtStart: {
      display: "block"
    },
    opacity: 1
  }
});

export const Eclispe = styled(EclipsePosed)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: 10;

  background-color: rgb(66, 66, 66, 0.25);
`;

export const PopUpWrapper = styled.div`
  ${"" /* width: 360px;
    height: 427px; */}
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 2px #eee;
  padding: 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Header = styled.h1`
  font-family: "ProductSans";
  font-weight: lighter;
  font-size: 36px;
  color: "#333";

  margin-bottom: 35px;
`;

export const SubName = styled.p`
  font-family: "ProductSans";
  font-size: 18px;
  font-weight: lighter;

  color: #6f6f6f;

  margin-bottom: 50px;
`;

export const SelectionsWrapper = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 50px;
`;

export const ButtonsWrapper = styled.div`
  h1 {
    color: #e57373;
    font-family: "ProductSans";
    font-weight: lighter;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const ListWrapper = posed.div({
  init: {
    applyAtEnd: { display: "none" },
    y: "-200px",
    opacity: 0
  },
  active: {
    applyAtStart: { display: "block" },
    y: "0px",
    opacity: 1
  }
});

export const ModeWrapper = styled.div`
  ${"" /* width: 260px; */}
  height: 20px;

  display: flex;
  justify-content: flex-start;

  margin-bottom: 20px;

  h1 {
    font-family: "ProductSans";
    font-weight: lighter;
    font-size: 18px;
    color: #333;

    margin-left: 20px;
  }
`;

export const Input = styled.input`
  display: none;
`;

export const SwitcherWrapper = styled.div`
  ${"" /* height: 16px;
    width: 32px;
    border-radius: 4px;
    background-color: #E5E7E9; */}
  display: inline-block;
`;

export const SwitcherBg = styled.div`
  height: 16px;
  width: 32px;
  border-radius: 4px;
  background-color: #e5e7e9;
  padding: 2px;
  cursor: pointer;
`;

const PosedSwitcherButton = posed.div({
  offline: {
    background: "#FF6A5C",
    x: 0
  },
  online: {
    background: "#BADC58",
    x: 16
  }
});

export const SwitcherButton = styled(PosedSwitcherButton)`
  width: 12px;
  height: 12px;
  border-radius: 3px;
`;
