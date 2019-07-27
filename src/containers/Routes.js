import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Routes from '../components/Routes'

import { updateData } from '../store/history/actions'

const putDispatchToProps = (dispatch) => ({
    onUpdateData: bindActionCreators(updateData, dispatch)
})

export default connect(
    null,
    putDispatchToProps
)(Routes)