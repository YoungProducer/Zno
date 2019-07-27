import { combineReducers } from 'redux'

import { historyReducer } from './history/reducers'

const rootReducer = combineReducers({
    history: historyReducer,
})

export default rootReducer