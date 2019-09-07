import React from "react";
import PropTypes from "prop-types";

import {
  TextFieldsWrapper,
  TextField,
  TextFieldWrapper
} from "./TextAnswer.styled";
import OneRightAnswer from "./OneRightAnswer";

class TextAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      inited: false
    };
  }

  initAnswersArray = props => {
    this.setState({ answers: props.selectedAnswers[props.testId] });
  };

  componentDidMount() {
    this.initAnswersArray(this.props);
    this.setState({ inited: true });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.testId !== nextProps.testId) {
      this.initAnswersArray(nextProps);
    }
  }

  checkIsSelected = (selectedAnswers, testId) => {
    let selected = false;

    for (let i = 0; i < selectedAnswers[testId].length; i++) {
      if (selectedAnswers[testId][i] !== "") {
        selected = true;
        break;
      }
    }

    return selected;
  };

  checkIsGived = (givedAnswers, testId, index) => {
    let gived = true;
    for (let i = 0; i < givedAnswers[testId].length; i++) {
      if (givedAnswers[testId][i] === "") {
        gived = false;
        break;
      }
    }

    const { rightAnswer } = this.props;

    console.log(givedAnswers[testId], rightAnswer[0], index);
    console.log(gived);

    return gived;
  };

  componentDidUpdate() {
    const { givedAnswers, selectedAnswers, testId } = this.props;

    this.props.updateAnswer(
      this.checkIsSelected(selectedAnswers, testId),
      "selected"
    );
    this.props.updateAnswer(this.checkIsGived(givedAnswers, testId), "gived");
  }

  inputOnChange = (event, index, testId) => {
    const {
      onSaveSelectedTextAnswer,
      onNullifySelectedTextAnswerByIndex,
      onNullifyAnswer,
      updateAnswer,
      selectedAnswers
    } = this.props;
    const value = event.target.value;

    this.setState(state => {
      const list = state.answers.map((answer, aIndex) => {
        if (aIndex === index) {
          return value;
        } else {
          return answer;
        }
      });
      if (value !== selectedAnswers[testId]) {
        if (selectedAnswers[testId][index] !== "") {
          onNullifySelectedTextAnswerByIndex(testId, index);
          onNullifyAnswer(testId, 2);
        }
      }

      updateAnswer(true, "selected");
      onSaveSelectedTextAnswer(testId, index, list[index]);

      return {
        answers: list
      };
    });
  };

  renderRightAnswers = index => {
    if (this.state.inited) {
      if (this.props.showIsRight) {
        return <></>;
      } else {
        return <p>{this.props.rightAnswer[index]}</p>;
      }
    }
  };

  render() {
    const { inited } = this.state;

    const {
      rightAnswer,
      testId,
      selectedAnswers,
      givedAnswers,
      showIsRight,
      showRight,
      isTestFinished
    } = this.props;

    return (
      <TextFieldsWrapper>
        {rightAnswer.map((obj, index) => (
          <TextFieldWrapper key={index}>
            {inited ? (
              showIsRight ? (
                <></>
              ) : isTestFinished ? (
                <p>{rightAnswer[index]}</p>
              ) : showRight ? (
                this.checkIsGived(givedAnswers, testId) ? (
                  <p>{rightAnswer[index]}</p>
                ) : (
                  <p>{rightAnswer[index]}</p>
                )
              ) : this.checkIsGived(givedAnswers, testId) ? (
                <p>{rightAnswer[index]}</p>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}

            {/*{inited ? (*/}
            {/*  showIsRight ? (*/}
            {/*    <></>*/}
            {/*  ) : isTestFinished ? (*/}
            {/*    <p>{rightAnswer[index]}</p>*/}
            {/*  ) : this.checkIsGived(givedAnswers, testId) ? (*/}
            {/*    <p>{rightAnswer[index]}</p>*/}
            {/*  ) : (*/}
            {/*    <></>*/}
            {/*  )*/}
            {/*) : (*/}
            {/*  <></>*/}
            {/*)}*/}
            <TextField
              // pose={() => {
              //   if (inited) {
              //     if (showIsRight) {
              //       return 'init';
              //     } else {
              //       if (isTestFinished) {
              //         if (givedAnswers[testId][index] === rightAnswer[index]) {
              //           return 'right';
              //         } else return 'wrong';
              //       } else {
              //         if (this.checkIsGived(givedAnswers, testId)) {
              //           if (givedAnswers[index] === rightAnswer[index]) {
              //             return 'right';
              //           } else return 'wrong';
              //         }
              //       }
              //     }
              //   }
              // }}
              pose={
                inited
                  ? showIsRight
                    ? "init"
                    : isTestFinished
                    ? givedAnswers[testId][index] == rightAnswer[index]
                      ? "right"
                      : "wrong"
                    : this.checkIsGived(givedAnswers, testId, index)
                    ? givedAnswers[testId][index] == rightAnswer[index]
                      ? "right"
                      : "wrong"
                    : "init"
                  : "init"
              }
              onChange={event => {
                if (!isTestFinished) {
                  this.inputOnChange(event, index, testId);
                }
              }}
              value={selectedAnswers[testId][index]}
            />
          </TextFieldWrapper>
        ))}
      </TextFieldsWrapper>
    );
  }
}

TextAnswer.propTypes = {
  onSaveSelectedTextAnswer: PropTypes.func.isRequired,
  onNullifySelectedTextAnswerByIndex: PropTypes.func.isRequired,
  onNullifyAnswer: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.array.isRequired,
  givedAnswers: PropTypes.array.isRequired,
  showIsRight: PropTypes.bool.isRequired,
  showRight: PropTypes.bool.isRequired
};

export default TextAnswer;
