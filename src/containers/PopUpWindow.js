import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PopUpWindow from "../components/subSelect/Content";

import {
  setAnswersDisplay,
  limitTime,
  setUpTasks
} from "../store/answers/actions";

const putStateToProps = state => ({
  showIsRight: state.testSetUp.showIsRight,
  isTimeLimited: state.testSetUp.isTimeLimited
});

const putDispatchToProps = dispatch => ({
  onSetAnswersDisplay: bindActionCreators(setAnswersDisplay, dispatch),
  onLimitTime: bindActionCreators(limitTime, dispatch),
  onSetUpTasks: bindActionCreators(setUpTasks, dispatch)
});

export default connect(
  putStateToProps,
  putDispatchToProps
)(PopUpWindow);
