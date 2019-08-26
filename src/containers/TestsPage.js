import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
    pushQuestions,
    initAnswers,
    nullifyAnswer,
    nullifySelectedAnswer,
    initSelectedAnswers,
    giveAnAnswer,
    giveAnRelationAnswer,
    setAnswersDisplay
} from '../store/answers/actions'

import Content from '../components/testPage/Content'

const putStateToProps = (state) => ({
    questions: state.questions.questions,
    selectedAnswers: state.selectedAnswers.selectedAnswers,
    givedAnswers: state.givedAnswers.givedAnswers,
    isDisplayable: state.testSetUp.isDisplayable,
    isTimeLimited: state.testSetUp.isTimeLimited
})

const putDispatchToProps = (dispatch) => ({
    onPushQuestions: bindActionCreators(pushQuestions, dispatch),
    onInitAnswers: bindActionCreators(initAnswers, dispatch),
    onNullifyAnswer: bindActionCreators(nullifyAnswer, dispatch),
    onNullifySelectedAnswer: bindActionCreators(nullifySelectedAnswer, dispatch),
    onInitSelectedAnswers: bindActionCreators(initSelectedAnswers, dispatch),
    onGiveAnAnswer: bindActionCreators(giveAnAnswer, dispatch),
    onGiveAnRelationAnswer: bindActionCreators(giveAnRelationAnswer, dispatch),
    onSetAnswersDisplay: bindActionCreators(setAnswersDisplay, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(Content)