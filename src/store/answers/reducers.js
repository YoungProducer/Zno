import {
    PUSH_QUESTIONS,
    INIT_ANSWERS,
    GIVE_AN_ANSWER,
    GIVE_AN_RELATION_ANSWER,
    INIT_SELECTED_ANSWERS,
    SAVE_SELECTED_ANSWER,
    SAVE_SELECTED_RELATION_ANSWER,
    NULLIFY_ANSWER,
    NULLIFY_SELECTED_ANSWER,
    NULLIFY_RELATION_ANSWER_BY_INDEX,
    NULLIFY_SELECTED_RELATION_ANSWER_BY_INDEX,
    NULLIFY_SELECTED_TEXT_ANSWER_BY_INDEX,
    SAVE_SELECTED_TEXT_ANSWER,
    SET_ANSWERS_DISPLAY,
    LIMIT_TIME
} from './constants'

const testSetUpInitialState = {
    isDisplayable: true,
    isTimeLimited: false
}

export const testSetUpReducer = (state = testSetUpInitialState, action) => {
    switch (action.type) {
        case SET_ANSWERS_DISPLAY: {
            return {
                ...state,
                isDisplayable: action.payload
            }
        }
        case LIMIT_TIME: {
            return {
                ...state,
                isTimeLimited: action.payload
            }
        }
        default: 
            return { ...state }
    }
}

const questionsInitialState = {
    questions: []
}

export const questionsReducer = (state = questionsInitialState, action) => {
    switch (action.type) {
        case PUSH_QUESTIONS: {
            return {
                ...state,
                questions: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

const givedAnswersInitialState = {
    givedAnswers: []
}

export const givedAnswersReducer = (state = givedAnswersInitialState, action) => {
    switch (action.type) {
        case INIT_ANSWERS: {
            state.givedAnswers = []

            for (let i = 0; i < action.payload.length; i++) {

                if (action.payload[i].type === 0) {
                    state.givedAnswers.push(-1)
                }

                if (action.payload[i].type === 1) {
                    state.givedAnswers.push([-1, -1, -1, -1])
                }

                if (action.payload[i].type === 2) {
                    let array = []

                    for (let j = 0; j < action.payload[i].answer.length; j++) {
                        array.push('')
                    }

                    state.givedAnswers.push(array)
                }
            }

            return { ...state }
        }
        case GIVE_AN_ANSWER: {
            state.givedAnswers[action.payload.testId] = action.payload.answer

            return {
                ...state
            }
        }
        case GIVE_AN_RELATION_ANSWER: {
            state.givedAnswers[action.payload.testId][action.payload.index] = action.payload.answer

            return {
                ...state
            }
        }
        case NULLIFY_ANSWER: {
            if (action.payload.type === 0) {
                state.givedAnswers[action.payload.testId] = -1
            }

            if (action.payload.type === 1) {
                state.givedAnswers[action.payload.testId] = [-1, -1, -1, -1]
            }

            if (action.payload.type === 2) {
                const fields = []
                for (let i = 0; i < state.givedAnswers[action.payload.testId].length; i++) {
                    fields.push("")
                }
                state.givedAnswers[action.payload.testId] = fields
            }

            return { 
                ...state
            }
        }
        case NULLIFY_RELATION_ANSWER_BY_INDEX: {
            let fields = state.givedAnswers[action.payload.testId]

            fields[action.payload.index] = -1

            state.givedAnswers[action.payload.testId] = fields

            return { 
                ...state
            }
        } 
        default: {
            return {
                ...state
            }
        }
    }
}

const selectedAnswersInitialState = {
    selectedAnswers: []
}

export const selectedAnswersReducer = (state = selectedAnswersInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case INIT_SELECTED_ANSWERS: {
            state.selectedAnswers = []

            for (let i = 0; i < payload.length; i++) {

                if (action.payload[i].type === 0) {
                    state.selectedAnswers.push(-1)
                }

                if (action.payload[i].type === 1) {
                    state.selectedAnswers.push([-1, -1, -1, -1])
                }

                if (payload[i].type === 2) {
                    let array = []

                    for (let j = 0; j < payload[i].answer.length; j++) {
                        array.push('')
                    }

                    state.selectedAnswers.push(array)
                }
            }

            return {
                ...state
            }
        }
        case SAVE_SELECTED_ANSWER: {
            state.selectedAnswers[payload.testId] = payload.answer

            return {
                ...state,
            }
        }
        case SAVE_SELECTED_RELATION_ANSWER: {
            state.selectedAnswers[payload.testId][payload.index] = payload.answer

            return {
                ...state
            }
        }
        case SAVE_SELECTED_TEXT_ANSWER: {
            state.selectedAnswers[payload.testId][payload.index] = payload.answer

            return {
                ...state
            }
        }
        case NULLIFY_SELECTED_ANSWER: {
            if (payload.type === 0) {
                state.selectedAnswers[payload.testId] = -1
            }

            if (payload.type === 1) {
                state.selectedAnswers[payload.testId] = [-1, -1, -1, -1]
            }

            if (payload.type === 2) {
                const fields = []
                for (let i = 0; i < state.selectedAnswers[payload.testId].length; i++) {
                    fields.push("")
                }
                state.selectedAnswers[payload.testId] = fields
            }

            return {
                ...state
            }
        }
        case NULLIFY_SELECTED_RELATION_ANSWER_BY_INDEX: {
            let fields = state.selectedAnswers[payload.testId]

            fields[payload.index] = -1

            state.selectedAnswers[payload.testId] = fields

            return {
                ...state
            }
        }
        case NULLIFY_SELECTED_TEXT_ANSWER_BY_INDEX: {
            let fields = state.selectedAnswers[payload.testId]

            fields[payload.index] = ''

            state.selectedAnswers[payload.testId] = fields

            return {
                ...state
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}