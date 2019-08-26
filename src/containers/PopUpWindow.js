import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PopUpWindow from '../components/subSelect/Content'

import {
    setAnswersDisplay,
    limitTime
} from '../store/answers/actions'

const putStateToProps = (state) => ({
    isDisplayable: state.testSetUp.isDisplayable,
    isTimeLimited: state.testSetUp.isTimeLimited
})

const putDispatchToProps = (dispatch) => ({
    onSetAnswersDisplay: bindActionCreators(setAnswersDisplay, dispatch),
    onLimitTime: bindActionCreators(limitTime, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(PopUpWindow)