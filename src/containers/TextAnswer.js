import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TextAnswer from '../components/testPage/TextAnswer'

import {
    saveSelectedTextAnswer
} from '../store/answers/actions'

const putStateToProps = (state) => ({
    selectedAnswers: state.selectedAnswers.selectedAnswers,
    givedAnswers: state.givedAnswers.givedAnswers
})

const putDispatchToProps = (dispatch) => ({
    onSaveSelectedTextAnswer: bindActionCreators(saveSelectedTextAnswer, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(TextAnswer)