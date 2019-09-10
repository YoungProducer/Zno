import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Square, Cross, Indices } from "./OneRightAnswer.styled";

import { GlobalWrapper, RowIndices } from "./RelationsAnswer.styled";

import { horizontalNumeration } from "./OneRightAnswer";

const verticalNumeration = ["1", "2", "3", "4"];

class RelationsAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswer: [-1, -1, -1, -1],
      inited: false
    };
  }

  updateAnswers = () => {
    if (
      this.props.selectedAnswers[this.props.testId][0] !== -1 &&
      this.props.selectedAnswers[this.props.testId][1] !== -1 &&
      this.props.selectedAnswers[this.props.testId][2] !== -1 &&
      this.props.selectedAnswers[this.props.testId][3] !== -1
    ) {
      this.props.updateAnswer(true, "selected");
    } else this.props.updateAnswer(false, "selected");
    if (
      this.props.givedAnswers[this.props.testId][0] !== -1 &&
      this.props.givedAnswers[this.props.testId][1] !== -1 &&
      this.props.givedAnswers[this.props.testId][2] !== -1 &&
      this.props.givedAnswers[this.props.testId][3] !== -1
    ) {
      this.props.updateAnswer(true, "gived");
    } else this.props.updateAnswer(false, "gived");
  };

  componentDidMount() {
    this.setState({ inited: true });
    this.props.updateAnswer();
  }

  componentDidUpdate() {
    this.updateAnswers();
  }

  checkAnswerByVertical = index => {
    const { selectedAnswers, testId } = this.props;

    let selected = true;

    for (let i = 0; i < 4; i++) {
      if (selectedAnswers[testId][i] === index) {
        selected = false;
      }
    }

    return selected;
  };

  render() {
    const { inited } = this.state;

    const {
      onSaveSelectedRelationAnswer,
      testId,
      selectedAnswers,
      updateAnswer,
      givedAnswers,
      showIsRight,
      rightAnswer,
      isTestFinished,
      onNullifyAnswer,
      onNullifySelectedAnswer,
      onNullifyRelationAnswerByIndex,
      onNullifySelecetedRelationAnswerByIndex
    } = this.props;

    return (
      <GlobalWrapper>
        {verticalNumeration.map((vert, vindex) => (
          <Wrapper
            key={vindex}
            style={{
              marginTop: 4
            }}
          >
            <RowIndices>{vert}</RowIndices>
            {horizontalNumeration.map((hor, hindex) => (
              <Square
                key={hindex}
                onClick={() => {
                  if (!isTestFinished) {
                    if (this.checkAnswerByVertical(hindex + 1)) {
                      if (hindex + 1 !== selectedAnswers[testId][vindex]) {
                        if (givedAnswers[testId][vindex] !== -1) {
                          onNullifyAnswer(testId, 1);
                          onNullifySelecetedRelationAnswerByIndex(
                            testId,
                            vindex
                          );
                        }
                      }
                      this.setState({ selectedAnswer: hindex + 1 });
                      onSaveSelectedRelationAnswer(testId, vindex, hindex + 1);
                      if (
                        selectedAnswers[testId][0] !== -1 &&
                        selectedAnswers[testId][1] !== -1 &&
                        selectedAnswers[testId][2] !== -1 &&
                        selectedAnswers[testId][3] !== -1
                      ) {
                        updateAnswer(true, "selected");
                      }
                      this.setState({ selectedAnswer: hindex + 1 }),
                        onSaveSelectedRelationAnswer(
                          testId,
                          vindex,
                          hindex + 1
                        );
                    }
                  }
                }}
                bgColor={() => {
                  if (inited) {
                    if (isTestFinished) {
                      if (hindex + 1 === rightAnswer[vindex]) {
                        return "#BADC58";
                      } else {
                        if (givedAnswers[testId][vindex] === hindex + 1) {
                          return "#FF6A5C";
                        }
                        return "#eee";
                      }
                    } else {
                      if (showIsRight) {
                        if (givedAnswers[testId][vindex] !== -1) {
                          if (hindex + 1 === rightAnswer[vindex]) {
                            return "#BADC58";
                          } else {
                            if (givedAnswers[testId][vindex] === hindex + 1) {
                              return "#FF6A5C";
                            }
                            return "#eee";
                          }
                        } else {
                          return "#eee;";
                        }
                      } else return "#eee";
                    }
                  }
                }}
              >
                {vindex === 0 ? <Indices>{hor}</Indices> : <></>}
                <Cross
                  src="./img/grey-cross.png"
                  opacity={
                    selectedAnswers[testId][vindex] === hindex + 1 ? 1 : 0
                  }
                />
              </Square>
            ))}
          </Wrapper>
        ))}
      </GlobalWrapper>
    );
  }
}

RelationsAnswers.propTypes = {
  onSaveSelectedRelationAnswer: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.array.isRequired,
  givedAnswers: PropTypes.array.isRequired,
  onNullifyAnswer: PropTypes.func.isRequired,
  onNullifySelectedAnswer: PropTypes.func.isRequired,
  onNullifyRelationAnswerByIndex: PropTypes.func.isRequired,
  onNullifySelecetedRelationAnswerByIndex: PropTypes.func.isRequired,
  showIsRight: PropTypes.bool.isRequired,
};

export default RelationsAnswers;
