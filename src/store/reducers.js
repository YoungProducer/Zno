import { combineReducers } from 'redux'

import { historyReducer } from './history/reducers'
import {
    questionsReducer,
    givedAnswersReducer,
    selectedAnswersReducer,
    testSetUpReducer
} from './answers/reducers'

const rootReducer = combineReducers({
    history: historyReducer,
    questions: questionsReducer,
    givedAnswers: givedAnswersReducer,
    selectedAnswers: selectedAnswersReducer,
    testSetUp: testSetUpReducer
})

export default rootReducer