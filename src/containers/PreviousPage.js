import { combineActionCreators, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Previous from '../modules/history/Previous'

import {
    previousPage,
    updateLocation
} from '../store/history/actions'

const putStateToProps = (state) => ({
    currentLocation: state.history.currentPage
})

const putDispatchToProps = (dispatch) => ({
    onGoToPreviousPage: bindActionCreators(previousPage, dispatch),
    onUpdateLocation: bindActionCreators(updateLocation, dispatch)
})

export default connect(
    putStateToProps,
    putDispatchToProps
)(Previous)