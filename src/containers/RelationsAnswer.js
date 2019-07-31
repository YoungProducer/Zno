import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RelationsAnswer from '../components/testPage/RelationsAnswer'

import {
    saveSelectedAnswer,
    saveSelectedRelationAnswer,
    giveAnAnswer
} from '../store/answers/actions'

const putStateToProps = (state) => ({
    selectedAnswers: state.selectedAnswers.selectedAnswers,
    givedAnswers: state.givedAnswers.givedAnswers
})

const putDispatchToProps = (dispatch) => ({
    onSaveSelectedAnswer: bindActionCreators(saveSelectedAnswer, dispatch),
    onSaveSelectedRelationAnswer: bindActionCreators(saveSelectedRelationAnswer, dispatch),
    onGiveAnAnswer: bindActionCreators(giveAnAnswer, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(RelationsAnswer)