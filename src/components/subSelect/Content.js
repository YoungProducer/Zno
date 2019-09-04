import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { readJson } from "../../utils/readJson";

import {
  theme,
  Header,
  PopUpWrapper,
  Eclispe,
  ButtonsWrapper,
  ListWrapper,
  ModeWrapper,
  Input,
  SwitcherWrapper,
  SwitcherBg,
  SwitcherButton
} from "./Content.styled";

class PopUpWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inited: false,
      subjectName: "",
      parts: [],
      selectedType: "",
      selectedPart: "",
      selectedTheme: "",
      currentThemes: [],
      showThemes: false,
      showDeepRadioButtons: false,
      selectedDeepType: "",
      showDeepList: false,
      deepList: [],
      selectedDeepListItem: "",
      showAnswersAfterTest: true
    };
  }

  componentWillMount() {
    this.setState({
      subjectName: this.getSubName()
    });
  }

  componentDidMount() {
    this.setState({
      inited: true,
      selectedPart: this.props.subSubjects[0]
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.active !== this.props.active) {
      readJson(
        "dist/tasks/" +
          this.props.subject[0] +
          this.props.subject.slice(1, this.props.subject.length).toLowerCase() +
          "/parts.json"
      ).then(response => {
        this.setState({
          selectedType: "",
          selectedTheme: "",
          showThemes: false,
          showDeepRadioButtons: false,
          selectedDeepType: "",
          showDeepList: false,
          selectedDeepListItem: "",
          parts: response,
          selectedPart: response[0]
        });
      });
    }
  }

  updateThemes = partName => {
    const { subject } = this.props;

    const sub = subject[0] + subject.slice(1, subject.length).toLowerCase();

    readJson("dist/tasks/" + sub + "/" + partName + "/Теми/themes.json").then(
      response => {
        this.setState({
          currentThemes: response,
          selectedTheme: !response.length ? "" : response[0]
        });

        if (this.state.selectedType === "ВИБІР ТЕМИ") {
          if (response.length !== 0) {
            this.setState({ showThemes: true });
          } else this.setState({ showThemes: false });
        } else this.setState({ showThemes: false });
      }
    );
  };

  getSubName = () => {
    let url = decodeURI(window.location.hash);

    url = url
      .split("")
      .reverse()
      .join("");
    url = url.slice(0, url.indexOf("/"));
    url = url
      .split("")
      .reverse()
      .join("");

    return url;
  };

  _inputPartHandle = event => {
    this.setState({
      selectedPart: event.target.value
    });

    this.updateThemes(event.target.value);
  };

  _inputThemeHandle = event => {
    this.setState({
      selectedTheme: event.target.value
    });
  };

  _radioHandle = event => {
    this.setState({
      selectedType: event.target.value
    });

    if (event.target.value === "ВИБІР ТЕМИ") {
      this.updateThemes(this.state.selectedPart);
      this.setState({ showDeepRadioButtons: false, showDeepList: false });
    }

    if (event.target.value === "ТРЕНУВАЛЬНИЙ ВАРІАНТ ЗНО") {
      this.setState({
        showDeepRadioButtons: true,
        showThemes: false,
        showDeepList: false,
        selectedDeepListItem:
          this.state.selectedDeepType !== "ТРЕНУВАЛЬНІ ВАРІАНТИ"
            ? this.props.testingCases[0]
            : this.props.mainSession[0]
      });
    }
  };

  _deepRadioHandle = event => {
    const { subject } = this.props;
    const value = event.target.value;
    const source =
      value === "ТРЕНУВАЛЬНІ ВАРІАНТИ"
        ? "Тренувальні варіанти/variants.json"
        : "Сессії ЗНО/sessions.json";
    const sub = subject[0] + subject.slice(1, subject.length).toLowerCase();
    const link = "dist/tasks/" + sub + "/ЗНО/" + source;

    readJson(link).then(response => {
      this.setState({
        selectedDeepType: value,
        showDeepList: true,
        deepList: response,
        selectedDeepListItem: response[0]
      });
    });
  };

  _deepListInputHandle = event => {
    this.setState({
      selectedDeepListItem: event.target.value
    });
  };

  render() {
    const {
      selectedPart,
      selectedType,
      selectedTheme,
      currentThemes,
      showThemes,
      showDeepRadioButtons,
      selectedDeepType,
      showDeepList,
      selectedDeepListItem,
      deepList
    } = this.state;

    const {
      active,
      changePopUpState,
      onSetAnswersDisplay,
      showIsRight,
      onSetRightAnswerDisplay,
      showRight,
      onLimitTime,
      isTimeLimited,
      onSetUpTasks,
      subject
    } = this.props;

    const showTimeLimiter = selectedType === 'ТРЕНУВАЛЬНИЙ ВАРІАНТ ЗНО' && selectedDeepType === "ОСНОВНА СЕССІЯ ЗНО" ? true : false;
    const showSwithcers = selectedType.length !== 0 ? true : false;

    return (
      <Eclispe pose={active ? "visible" : "hidden"}>
        <PopUpWrapper>
          <Header>Вибір тесту</Header>

          <ThemeProvider theme={theme}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Оберіть тип тесту</FormLabel>
              <RadioGroup
                aria-label="position"
                name="position"
                value={selectedType}
                onChange={this._radioHandle}
              >
                <FormControlLabel
                  value="ВИБІР ТЕМИ"
                  control={<Radio color="primary" />}
                  label="ВИБІР ТЕМИ"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="ТРЕНУВАЛЬНИЙ ВАРІАНТ ЗНО"
                  control={<Radio color="primary" />}
                  label="ТРЕНУВАЛЬНИЙ ВАРІАНТ ЗНО"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            {this.state.parts.length !== 0 && selectedType === "ВИБІР ТЕМИ" ? (
              <FormControl component="div">
                <FormLabel component="legend">Оберіть частину</FormLabel>
                <TextField
                  id="standard-select-currency"
                  select
                  value={selectedPart}
                  onChange={this._inputPartHandle}
                  margin="none"
                  variant="outlined"
                >
                  {this.state.parts.map(subSubject => (
                    <MenuItem key={subSubject} value={subSubject}>
                      {subSubject}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            ) : (
              <></>
            )}

            {showThemes ? (
              <FormControl component="div">
                <FormLabel component="legend">Оберіть тему</FormLabel>
                <TextField
                  id="standard-select-currency"
                  select
                  value={selectedTheme}
                  onChange={this._inputThemeHandle}
                  margin="none"
                  variant="outlined"
                >
                  {currentThemes.map(theme => (
                    <MenuItem key={theme} value={theme}>
                      {theme}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            ) : (
              <></>
            )}

            {showDeepRadioButtons ? (
              <FormControl component="fieldset">
                <FormLabel component="legend">Оберіть тип тесту</FormLabel>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={selectedDeepType}
                  onChange={this._deepRadioHandle}
                >
                  <FormControlLabel
                    value="ТРЕНУВАЛЬНІ ВАРІАНТИ"
                    control={<Radio color="primary" />}
                    label="ТРЕНУВАЛЬНІ ВАРІАНТИ"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="ОСНОВНА СЕССІЯ ЗНО"
                    control={<Radio color="primary" />}
                    label="ОСНОВНА СЕССІЯ ЗНО"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              <></>
            )}

            {showDeepList ? (
              <FormControl component="div">
                <FormLabel component="legend">
                  {selectedDeepType === "ТРЕНУВАЛЬНІ ВАРІАНТИ"
                    ? "Виберіть тренувальний варіант"
                    : "Виберіть варіант ЗНО"}
                </FormLabel>
                <TextField
                  id="standard-select-currency"
                  select
                  value={selectedDeepListItem}
                  onChange={this._deepListInputHandle}
                  margin="none"
                  variant="outlined"
                >
                  {deepList.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            ) : (
              <></>
            )}

            {showSwithcers ? (
              <>
                <ModeWrapper>
                  <SwitcherWrapper>
                    <Input type="checkbox" id="mode" />
                    <label
                      htmlFor="mode"
                      onClick={() => {
                        onSetAnswersDisplay(!showIsRight);
                      }}
                    >
                      <SwitcherBg>
                        <SwitcherButton
                          pose={showIsRight ? "offline" : "online"}
                        />
                      </SwitcherBg>
                    </label>
                  </SwitcherWrapper>
                  <h1>Показувати, чи відповідь правильна</h1>
                </ModeWrapper>

                <ModeWrapper>
                  <SwitcherWrapper>
                    <Input type="checkbox" id="mode" />
                    <label
                      htmlFor="mode"
                      onClick={() => {
                        onSetRightAnswerDisplay(!showRight);
                      }}
                    >
                      <SwitcherBg>
                        <SwitcherButton
                          pose={showRight ? "online" : "offline"}
                        />
                      </SwitcherBg>
                    </label>
                  </SwitcherWrapper>
                  <h1>Показувати правильну відповідь</h1>
                </ModeWrapper>
              </>
            ) : (
              <></>
            )}

            {
              showTimeLimiter ? (
                <ModeWrapper>
                  <SwitcherWrapper>
                    <Input type="checkbox" id="mode" />
                    <label
                      htmlFor="mode"
                      onClick={() => {
                        onLimitTime(!isTimeLimited);
                      }}
                    >
                      <SwitcherBg>
                        <SwitcherButton
                          pose={!isTimeLimited ? "offline" : "online"}
                        />
                      </SwitcherBg>
                    </label>
                  </SwitcherWrapper>
                  <h1>Обмежений час</h1>
                </ModeWrapper>
              ) : <></>
            }
          </ThemeProvider>

          <ButtonsWrapper>
            <NavLink to={"/test"}>
              <h1
                style={{ float: "left" }}
                onClick={() => {
                  onSetUpTasks(
                    subject,
                    showDeepList ? "" : selectedPart,
                    selectedDeepType,
                    selectedTheme,
                    selectedDeepListItem
                  );
                }}
              >
                Розпочати тест
              </h1>
            </NavLink>
            <h1
              style={{ float: "right" }}
              onClick={() => {
                changePopUpState(false);
              }}
            >
              Скасувати
            </h1>
          </ButtonsWrapper>
        </PopUpWrapper>
      </Eclispe>
    );
  }
}

PopUpWindow.propTypes = {
  onSetAnswersDisplay: PropTypes.func.isRequired,
  showIsRight: PropTypes.bool.isRequired,
  onSetRightAnswerDisplay: PropTypes.func.isRequired,
  showRight: PropTypes.bool.isRequired,
  onLimitTime: PropTypes.func.isRequired,
  isTimeLimited: PropTypes.bool.isRequired,
  onSetUpTasks: PropTypes.func.isRequired
};

export default PopUpWindow;
