import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PopUpWindow from "../components/subSelect/Content";

import {
  setAnswersDisplay,
  setRightAnswerDisplay,
  limitTime,
  setUpTasks
} from "../store/answers/actions";

const putStateToProps = state => ({
  showIsRight: state.testSetUp.showIsRight,
  showRight: state.testSetUp.showRight,
  isTimeLimited: state.testSetUp.isTimeLimited
});

const putDispatchToProps = dispatch => ({
  onSetAnswersDisplay: bindActionCreators(setAnswersDisplay, dispatch),
  onSetRightAnswerDisplay: bindActionCreators(setRightAnswerDisplay, dispatch),
  onLimitTime: bindActionCreators(limitTime, dispatch),
  onSetUpTasks: bindActionCreators(setUpTasks, dispatch)
});

export default connect(
  putStateToProps,
  putDispatchToProps
)(PopUpWindow);
