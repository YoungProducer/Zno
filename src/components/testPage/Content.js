import React from "react";
import PropTypes from "prop-types";

import Sidebar from "../../modules/leftsidebar/Sidebar";
import CountDownTimer from "./CountDownTimer";
import OneRightAnswer from "../../containers/OneRightAnswer";
import RelationAnswers from "../../containers/RelationsAnswer";
import TextAnswer from "../../containers/TextAnswer";
import { readJson } from "../../utils/readJson";

import { ContentWrapper } from "../subjects/Content.styled";

import {
  SubName,
  Counter,
  TestNumberSelWrapper,
  Option,
  Image,
  ButtonsWrapper,
  Button,
  Header,
  NameWrapper,
  CountDownWrapper
} from "./Content.styled";

const colors = {
  green: {
    default: "#4CAF50",
    hover: "#449D48"
  },
  red: {
    default: "#F44336",
    hover: "#D23B30"
  },
  blue: {
    default: "#424242",
    hover: "#3E3E3E"
  },
  yellow: {
    default: "#FFC107",
    hover: "#FFAA00"
  }
};

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      year: 0,
      type: "",
      selectedTest: 1,
      tasks: [],
      isAnswerSelected: false,
      isAnswerGived: false,
      inited: false,
      updateComponents: 0,
      showAnswersAfterTest: false,
      testFinished: false,
      timeForTestInMinutes: 180,
      switcherPose: false
    };
  }

  componentDidMount() {
    const {
      selectedSubject,
      selectedSubSubject,
      selectedDeepType,
      selectedTestName,
      selectedTheme
    } = this.props;
    let link = "dist/tasks/";

    link = link.concat(selectedSubject + "/");
    if (selectedSubSubject !== "") {
      link = link.concat(selectedSubSubject + "/");
    }

    if (selectedTheme !== "") {
      link = link.concat("Теми/" + selectedTheme + "/tasks.json");
    }

    if (selectedDeepType !== "") {
      link = link.concat("ЗНО/");

      if (selectedDeepType === "ТРЕНУВАЛЬНІ ВАРІАНТИ") {
        link = link.concat(
          selectedDeepType[0] +
            selectedDeepType.slice(1, selectedDeepType.length).toLowerCase() +
            "/" +
            selectedTestName +
            "/tasks.json"
        );
      }

      if (selectedDeepType === "ОСНОВНА СЕССІЯ ЗНО") {
        link = link.concat("Сессії ЗНО/" + selectedTestName + "/tasks.json");
      }
    }

    readJson(link).then(response => {
      this.props.onPushQuestions(response);
      this.props.onInitAnswers(response);
      this.props.onInitSelectedAnswers(response);
      this.setState({
        tasks: response
      });
    });
    this.setState({ inited: true });
  }

  checkIsSelected = (selectedAnswers, testId, type) => {
    let selected = false;

    if (type === 1) {
      for (let i = 0; i < 4; i++) {
        if (selectedAnswers[testId][i] !== -1) {
          selected = true;
          break;
        }
      }
    }

    if (type === 2) {
      for (let i = 0; i < selectedAnswers[testId].length; i++) {
        if (selectedAnswers[testId][i] !== "") {
          selected = true;
          break;
        }
      }
    }

    return selected;
  };

  checkIsGived = (givedAnswers, testId, type) => {
    let gived = true;

    if (type === 1) {
      for (let i = 0; i < 4; i++) {
        if (givedAnswers[testId][i] === -1) {
          gived = false;
          break;
        }
      }
    }

    if (type === 2) {
      for (let i = 0; i < givedAnswers[testId].length; i++) {
        if (givedAnswers[testId][i] === "") {
          gived = false;
          break;
        }
      }
    }

    return gived;
  };

  checkIsRight = (givedAnswers, testId, type) => {
    let right = true;

    if (type === 1) {
      for (let i = 0; i < 4; i++) {
        if (givedAnswers[testId][i] !== this.state.tasks[testId].answer[i]) {
          right = false;
          break;
        }
      }
    }

    if (type === 2) {
      for (let i = 0; i < givedAnswers[testId].length; i++) {
        if (
          givedAnswers[testId][i].replace(",", ".") !==
          String(this.state.tasks[testId].answer[i])
        ) {
          right = false;
          break;
        }
      }
    }

    return right;
  };

  updateAnswer = (isAnswer, type) => {
    if (type === "gived") {
      this.setState({
        isAnswerGived: isAnswer
      });
    }

    if (type === "selected") {
      this.setState({
        isAnswerSelected: isAnswer
      });
    }
  };

  nextQuestion = currentQuestion => {
    const { givedAnswers } = this.props;

    let nQuestion = -1;

    for (let i = currentQuestion; i < givedAnswers.length; i++) {
      if (this.state.tasks[i].type === 0) {
        if (givedAnswers[i] === -1) {
          nQuestion = i + 1;
          break;
        }
      }
      if (this.state.tasks[i].type === 1) {
        if (
          givedAnswers[i][0] === -1 &&
          givedAnswers[i][1] === -1 &&
          givedAnswers[i][2] === -1 &&
          givedAnswers[i][3] === -1
        ) {
          nQuestion = i + 1;
          break;
        }
      }
      if (this.state.tasks[i].type === 2) {
        let selected = false;

        for (let j = 0; j < givedAnswers[i].length; j++) {
          if (givedAnswers[i][j] === "") {
            selected = true;
            break;
          }
        }

        nQuestion = selected ? i + 1 : -1;
        break;
      }
    }

    if (nQuestion === -1) {
      nQuestion = givedAnswers.indexOf(-1) + 1;
    }

    this.setState({ selectedTest: nQuestion });
  };

  setTestFinished = () => {
    this.setState({
      testFinished: true,
      timeForTestInMinutes: 0,
      showAnswersAfterTest: false
    });
  };

  equateGivedAndSelected = () => {
    const { selectedAnswers, givedAnswers } = this.props;
    for (let i = 0; i < selectedAnswers.length; i++) {
      givedAnswers[i] = selectedAnswers[i];
    }
  };

  render() {
    const {
      subject,
      tasks,
      selectedTest,
      isAnswerSelected,
      isAnswerGived,
      testFinished,
      timeForTestInMinutes
    } = this.state;

    const {
      onGiveAnAnswer,
      selectedAnswers,
      givedAnswers,
      showIsRight,
      isTimeLimited
    } = this.props;

    const { green, red, blue, yellow } = colors;

    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <Sidebar />
        <ContentWrapper
          style={{
            paddingRight: 16
          }}
        >
          <Header>
            <NameWrapper>
              <SubName>{subject}</SubName>
              <Counter>
                Тест {selectedTest} з {tasks.length}
              </Counter>
            </NameWrapper>
            <CountDownWrapper>
              {isTimeLimited ? (
                <CountDownTimer
                  startTimeInMinutes={timeForTestInMinutes}
                  setTestFinished={this.setTestFinished}
                />
              ) : (
                <></>
              )}
              <Button
                onClick={() => {
                  this.setTestFinished();
                  this.equateGivedAndSelected();
                }}
              >
                Завершити
              </Button>
            </CountDownWrapper>
          </Header>
          <TestNumberSelWrapper>
            {tasks.map((task, index) => (
              <span key={index}>
                {task.type === 0 ? (
                  <Option
                    key={index + 1}
                    bgColor={() => {
                      if (testFinished) {
                        if (givedAnswers[index] === task.answer) {
                          return colors.green.default;
                        } else return red.default;
                      } else {
                        if (showIsRight) {
                          if (givedAnswers[index] !== -1) {
                            if (givedAnswers[index] === task.answer) {
                              return green.default;
                            } else return red.default;
                          } else {
                            if (index + 1 === selectedTest) {
                              return blue.default;
                            } else {
                              if (selectedAnswers[index] !== -1) {
                                return yellow.default;
                              }
                              return "#eee";
                            }
                          }
                        } else {
                          return givedAnswers[index] !== -1
                            ? green.default
                            : selectedAnswers[index] !== -1
                            ? yellow.default
                            : index + 1 !== selectedTest
                            ? "#eee"
                            : blue.default;
                        }
                      }
                    }}
                    tcolor={() => {
                      if (testFinished) {
                        return "#fff";
                      } else {
                        if (showIsRight) {
                          if (givedAnswers[index] !== -1) {
                            return "#fff";
                          } else {
                            if (index + 1 === selectedTest) {
                              return "#fff";
                            } else {
                              if (selectedAnswers[index] !== -1) {
                                return "#fff";
                              }
                              return "#343434";
                            }
                          }
                        } else {
                          return givedAnswers[index] !== -1
                            ? "#fff"
                            : selectedAnswers[index] !== -1
                            ? "#fff"
                            : index + 1 !== selectedTest
                            ? "#343434"
                            : "#fff";
                        }
                      }
                    }}
                    hbgColor={() => {
                      if (testFinished) {
                        if (givedAnswers[index] === task.answer) {
                          return green.hover;
                        } else return red.hover;
                      } else {
                        if (showIsRight) {
                          if (givedAnswers[index] !== -1) {
                            if (givedAnswers[index] === task.answer) {
                              return green.hover;
                            } else return red.hover;
                          } else {
                            if (index + 1 === selectedTest) {
                              return blue.hover;
                            } else {
                              if (selectedAnswers[index] !== -1) {
                                return yellow.default;
                              }
                              return blue.hover;
                            }
                          }
                        } else {
                          return givedAnswers[index] !== -1
                            ? green.hover
                            : selectedAnswers[index] !== -1
                            ? yellow.hover
                            : index + 1 !== selectedTest
                            ? blue.hover
                            : blue.hover;
                        }
                      }
                    }}
                    onClick={() => {
                      this.setState({ selectedTest: index + 1 });
                      this.updateAnswer(false, "selected");
                      this.updateAnswer(false, "gived");
                    }}
                  >
                    {index + 1}
                  </Option>
                ) : task.type === 1 ? (
                  <Option
                    key={index + 1}
                    bgColor={() => {
                      if (this.state.inited) {
                        if (testFinished) {
                          return this.checkIsRight(givedAnswers, index, 1)
                            ? green.default
                            : red.default;
                        } else {
                          if (showIsRight) {
                            if (this.checkIsGived(givedAnswers, index, 1)) {
                              return this.checkIsRight(givedAnswers, index, 1)
                                ? green.default
                                : red.default;
                            } else {
                              if (index + 1 === selectedTest) {
                                return blue.default;
                              } else {
                                if (
                                  this.checkIsSelected(
                                    selectedAnswers,
                                    index,
                                    1
                                  )
                                ) {
                                  return yellow.default;
                                }
                                return "#eee";
                              }
                            }
                          } else {
                            return this.checkIsGived(givedAnswers, index, 1)
                              ? green.default
                              : this.checkIsSelected(selectedAnswers, index, 1)
                              ? yellow.default
                              : index + 1 !== selectedTest
                              ? "#eee"
                              : blue.default;
                          }
                        }
                      } else return "#eee";
                    }}
                    tcolor={() => {
                      if (this.state.inited) {
                        if (testFinished) {
                          return "#fff";
                        } else {
                          if (!showIsRight) {
                            if (this.checkIsGived(givedAnswers, index, 1)) {
                              return "#fff";
                            } else {
                              if (index + 1 === selectedTest) {
                                return "#fff";
                              } else {
                                if (
                                  this.checkIsSelected(
                                    selectedAnswers,
                                    index,
                                    1
                                  )
                                ) {
                                  return "#fff";
                                }
                                return "#343434";
                              }
                            }
                          } else {
                            return this.checkIsGived(givedAnswers, index, 1)
                              ? "#fff"
                              : this.checkIsSelected(selectedAnswers, index, 1)
                              ? "#fff"
                              : index + 1 !== selectedTest
                              ? "#343434"
                              : "#fff";
                          }
                        }
                      } else return "#fff";
                    }}
                    hbgColor={() => {
                      if (this.state.inited) {
                        if (testFinished) {
                          return this.checkIsRight(givedAnswers, index, 1)
                            ? green.hover
                            : red.hover;
                        } else {
                          if (showIsRight) {
                            if (this.checkIsGived(givedAnswers, index, 1)) {
                              return this.checkIsRight(givedAnswers, index, 1)
                                ? green.hover
                                : red.hover;
                            } else {
                              if (index + 1 === selectedTest) {
                                return blue.hover;
                              } else {
                                if (
                                  this.checkIsSelected(
                                    selectedAnswers,
                                    index,
                                    1
                                  )
                                ) {
                                  return yellow.hover;
                                }
                                return blue.hover;
                              }
                            }
                          } else {
                            return this.checkIsGived(givedAnswers, index, 1)
                              ? green.hover
                              : this.checkIsSelected(selectedAnswers, index, 1)
                              ? yellow.hover
                              : index + 1 !== selectedTest
                              ? blue.hover
                              : blue.hover;
                          }
                        }
                      } else return "#eee";
                    }}
                    onClick={() => {
                      this.setState({ selectedTest: index + 1 });
                      this.updateAnswer(false, "selected");
                      this.updateAnswer(false, "gived");
                    }}
                  >
                    {index + 1}
                  </Option>
                ) : (
                  <Option
                    key={index + 1}
                    onClick={() => {
                      this.setState({ selectedTest: index + 1 });
                      this.updateAnswer(false, "selected");
                      this.updateAnswer(false, "gived");
                    }}
                    bgColor={() => {
                      if (this.state.inited) {
                        if (testFinished) {
                          return this.checkIsRight(givedAnswers, index, 2)
                            ? green.default
                            : red.default;
                        } else {
                          if (showIsRight) {
                            if (this.checkIsGived(givedAnswers, index, 2)) {
                              return this.checkIsRight(givedAnswers, index, 2)
                                ? green.default
                                : red.default;
                            } else {
                              if (index + 1 === selectedTest) {
                                return blue.default;
                              } else {
                                return this.checkIsSelected(
                                  selectedAnswers,
                                  index,
                                  2
                                )
                                  ? yellow.default
                                  : "#eee";
                              }
                            }
                          } else {
                            if (this.checkIsGived(givedAnswers, index, 2)) {
                              return green.default;
                            } else if (
                              this.checkIsSelected(selectedAnswers, index, 2)
                            ) {
                              return yellow.default;
                            } else if (index + 1 === selectedTest) {
                              return blue.default;
                            } else {
                              return "#eee";
                            }
                          }
                        }
                      }
                    }}
                    tcolor={() => {
                      if (this.state.inited) {
                        if (testFinished) {
                          return "#fff";
                        } else {
                          if (showIsRight) {
                            if (this.checkIsGived(givedAnswers, index, 2)) {
                              return "#fff";
                            } else {
                              if (index + 1 === selectedTest) {
                                return "#fff";
                              } else {
                                return this.checkIsSelected(
                                  selectedAnswers,
                                  index,
                                  2
                                )
                                  ? "#fff"
                                  : "#343434";
                              }
                            }
                          } else {
                            if (this.checkIsGived(givedAnswers, index, 2)) {
                              return "#fff";
                            } else if (
                              this.checkIsSelected(selectedAnswers, index, 2)
                            ) {
                              return "#fff";
                            } else if (index + 1 === selectedTest) {
                              return "#fff";
                            } else {
                              return "#343434";
                            }
                          }
                        }
                      }
                    }}
                    hbgColor={() => {
                      if (this.state.inited) {
                        if (testFinished) {
                          return this.checkIsRight(givedAnswers, index, 2)
                            ? green.hover
                            : red.hover;
                        } else {
                          if (showIsRight) {
                            if (this.checkIsGived(givedAnswers, index, 2)) {
                              return this.checkIsRight(givedAnswers, index, 2)
                                ? green.hover
                                : red.hover;
                            } else {
                              if (index + 1 === selectedTest) {
                                return blue.hover;
                              } else {
                                return this.checkIsSelected(
                                  selectedAnswers,
                                  index,
                                  2
                                )
                                  ? yellow.hover
                                  : blue.hover;
                              }
                            }
                          } else {
                            if (this.checkIsGived(givedAnswers, index, 2)) {
                              return green.hover;
                            } else if (
                              this.checkIsSelected(selectedAnswers, index, 2)
                            ) {
                              return yellow.hover;
                            } else if (index + 1 === selectedTest) {
                              return blue.hover;
                            } else {
                              return blue.hover;
                            }
                          }
                        }
                      }
                    }}
                  >
                    {index + 1}
                  </Option>
                )}
              </span>
            ))}
          </TestNumberSelWrapper>
          {tasks.length ? (
            <>
              <Image src={tasks[selectedTest - 1].img} />
              {tasks[selectedTest - 1].type === 0 ? (
                <OneRightAnswer
                  rightAnswer={tasks[selectedTest - 1].answer}
                  testId={selectedTest - 1}
                  updateAnswer={this.updateAnswer}
                  updateComponent={this.state.updateComponents}
                  showIsRight={showIsRight}
                  isTestFinished={testFinished}
                />
              ) : tasks[selectedTest - 1].type === 1 ? (
                <RelationAnswers
                  rightAnswer={tasks[selectedTest - 1].answer}
                  testId={selectedTest - 1}
                  updateAnswer={this.updateAnswer}
                  updateComponent={this.state.updateComponents}
                  showIsRight={showIsRight}
                  isTestFinished={testFinished}
                />
              ) : (
                <TextAnswer
                  rightAnswer={tasks[selectedTest - 1].answer}
                  testId={selectedTest - 1}
                  updateAnswer={this.updateAnswer}
                  updateComponent={this.state.updateComponents}
                  showIsRight={showIsRight}
                  isTestFinished={testFinished}
                />
              )}
            </>
          ) : (
            <></>
          )}
          <ButtonsWrapper>
            <Button
              primary
              onClick={() => {
                if (isAnswerGived) {
                  this.nextQuestion(selectedTest);
                  this.updateAnswer(false, "gived");
                  this.updateAnswer(false, "selected");
                  this.setState({ updateComponents: Math.random() });
                }

                if (isAnswerSelected) {
                  onGiveAnAnswer(
                    selectedTest - 1,
                    selectedAnswers[selectedTest - 1]
                  );

                  if (!showIsRight) {
                    this.nextQuestion(selectedTest);
                  }
                  this.updateAnswer(false, "gived");
                  this.updateAnswer(false, "selected");
                  this.setState({ updateComponents: Math.random() });
                }

                if (!isAnswerSelected && !isAnswerGived) {
                  this.nextQuestion(selectedTest);
                }
              }}
            >
              {isAnswerGived
                ? "Наступний"
                : isAnswerSelected
                ? "Відповісти"
                : "Пропустити"}
            </Button>
          </ButtonsWrapper>
        </ContentWrapper>
      </div>
    );
  }
}

Content.propTypes = {
  onPushQuestions: PropTypes.func.isRequired,
  onInitSelectedAnswers: PropTypes.func.isRequired,
  onInitAnswers: PropTypes.func.isRequired,
  onNullifyAnswer: PropTypes.func.isRequired,
  onNullifySelectedAnswer: PropTypes.func.isRequired,
  onGiveAnAnswer: PropTypes.func.isRequired,
  onGiveAnRelationAnswer: PropTypes.func.isRequired,
  onSetAnswersDisplay: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  selectedAnswers: PropTypes.array.isRequired,
  givedAnswers: PropTypes.array.isRequired,
  showIsRight: PropTypes.bool.isRequired,
  isTimeLimited: PropTypes.bool.isRequired
};

export default Content;
