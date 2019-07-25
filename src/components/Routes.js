import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Left from '../modules/leftsidebar/Sidebar'
import Right from '../modules/rightsidebar/Sidebar'
import Subjects from '../pages/Subjects'
import SubSelect from '../pages/SubSelect'

const Routes = (props) => (
    
    <HashRouter>
        <Right />
        <Left />
        <Switch>
            <Route path='/' component={Subjects} exact/>
            <Route path='/selection/:name' component={SubSelect} />
        </Switch>
    </HashRouter>
)

export default Routes