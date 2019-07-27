import React from 'react'
import PropTypes from 'prop-types'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Left from '../modules/leftsidebar/Sidebar'
import Right from '../modules/rightsidebar/Sidebar'
import Previous from '../containers/PreviousPage'
import Subjects from '../pages/Subjects'
import SubSelect from '../pages/SubSelect'

class Routes extends React.Component {

    historyHandler = (previousRoute, nextRoute) => {
        const { onUpdateData } = this.props

        onUpdateData()
    }

    render() {
        return(
            <HashRouter onChange={this.historyHandler}>
                <Right />
                <Left />
                {/* <Previous /> */}
                <Switch>
                    <Route path='/' component={Subjects} exact/>
                    <Route path='/selection/:name' component={SubSelect} />
                </Switch>
            </HashRouter>
        )
    }
}
    
Routes.propTypes = {
    onUpdateData: PropTypes.func.isRequired
}

export default Routes