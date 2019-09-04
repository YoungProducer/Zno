import React from "react";
import Subject from "./Subject";

import Sidebar from "../../modules/leftsidebar/Sidebar";
import PopUpWindow from "../../containers/PopUpWindow";

import { ContentWrapper, SubjectsWrapper, Header } from "./Content.styled";

const subjects = [
  "МАТЕМАТИКА",
  "ФІЗИКА",
  "ХІМІЯ",
  "АГЛІЙСЬКА МОВА",
  "УКРАЇНСЬКА МОВА ТА ЛІТЕРАТУРА",
  "ГЕОГРАФІЯ",
  "БІОЛОГІЯ"
];

const subSubjects = [
  ["Алгебра", "Геометрія"],
  [],
  [],
  [],
  ["Українська мова", "Література"],
  [],
  []
];

const themes = {
  Алгебра: ["numbers", "plus", "minus", "divide", "multiply"]
};

const testingCases = [
  "Варіант 1",
  "Варіант 2",
  "Варіант 3",
  "Варіант 4",
  "Варіант 5"
];

const mainSession = [
  "Основна сессія 2019 року",
  "Пробна сессія 2019",
  "Основна сессія 2018 року",
  "Пробна сессія 2018",
  "Основна сессія 2017 року",
  "Пробна сессія 2017",
  "Основна сессія 2016 року",
  "Пробна сессія 2016",
  "Основна сессія 2015 року",
  "Пробна сессія 2015"
];

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popUpWindowVisible: false,
      subject: "",
      subSubjects: subSubjects,
      subIndex: 0
    };
  }

  changePopUpWindowState = state => {
    this.setState({
      popUpWindowVisible: state
    });
  };

  changeSubject = (sub, index) => {
    this.setState({
      subject: sub,
      subIndex: index
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <Sidebar />
        <ContentWrapper>
          <Header>Предмети</Header>

          <PopUpWindow
            active={this.state.popUpWindowVisible}
            changePopUpState={this.changePopUpWindowState}
            subject={this.state.subject}
            subSubjects={subSubjects[this.state.subIndex]}
            themes={themes}
            mainSession={mainSession}
            testingCases={testingCases}
          />

          <SubjectsWrapper>
            {subjects.map((subject, index) => {
              return (
                <Subject
                  key={index}
                  index={index}
                  leftColor={"#FFBE76"}
                  rightColor={"#F0932B"}
                  subName={subject}
                  changePopUpState={this.changePopUpWindowState}
                  changeSubject={this.changeSubject}
                />
              );
            })}
          </SubjectsWrapper>
        </ContentWrapper>
      </div>
    );
  }
}

export default Content;
