import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RelationsAnswer from '../components/testPage/RelationsAnswer'

import {
    saveSelectedAnswer,
    saveSelectedRelationAnswer,
    giveAnAnswer,
    nullifyAnswer,
    nullifySelectedAnswer,
    nullifyRelationAnswerByIndex,
    nullifySelectedRelationAnswerByIndex
} from '../store/answers/actions'

const putStateToProps = (state) => ({
    selectedAnswers: state.selectedAnswers.selectedAnswers,
    givedAnswers: state.givedAnswers.givedAnswers
})

const putDispatchToProps = (dispatch) => ({
    onSaveSelectedAnswer: bindActionCreators(saveSelectedAnswer, dispatch),
    onSaveSelectedRelationAnswer: bindActionCreators(saveSelectedRelationAnswer, dispatch),
    onGiveAnAnswer: bindActionCreators(giveAnAnswer, dispatch),
    onNullifyAnswer: bindActionCreators(nullifyAnswer, dispatch),
    onNullifySelectedAnswer: bindActionCreators(nullifySelectedAnswer, dispatch),
    onNullifyRelationAnswerByIndex: bindActionCreators(nullifyRelationAnswerByIndex, dispatch),
    onNullifySelecetedRelationAnswerByIndex: bindActionCreators(nullifySelectedRelationAnswerByIndex, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(RelationsAnswer)