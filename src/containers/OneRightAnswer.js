import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import OneRightAnswer from '../components/testPage/OneRightAnswer'

import {
    saveSelectedAnswer,
    giveAnAnswer
} from '../store/answers/actions'

const putStateToProps = (state) => ({
    selectedAnswers: state.selectedAnswers.selectedAnswers,
    givedAnswers: state.givedAnswers.givedAnswers
})

const putDispatchToProps = (dispatch) => ({
    onSaveSelectedAnswer: bindActionCreators(saveSelectedAnswer, dispatch),
    onGiveAnAnswer: bindActionCreators(giveAnAnswer, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(OneRightAnswer)