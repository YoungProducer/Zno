import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TextAnswer from '../components/testPage/TextAnswer'

import {
    saveSelectedTextAnswer,
    nullifySelectedTextAnswerByIndex,
    nullifyAnswer
} from '../store/answers/actions'

const putStateToProps = (state) => ({
    selectedAnswers: state.selectedAnswers.selectedAnswers,
    givedAnswers: state.givedAnswers.givedAnswers
})

const putDispatchToProps = (dispatch) => ({
    onSaveSelectedTextAnswer: bindActionCreators(saveSelectedTextAnswer, dispatch),
    onNullifySelectedTextAnswerByIndex: bindActionCreators(nullifySelectedTextAnswerByIndex, dispatch),
    onNullifyAnswer: bindActionCreators(nullifyAnswer, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(TextAnswer)