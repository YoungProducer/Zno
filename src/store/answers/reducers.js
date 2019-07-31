import {
    PUSH_QUESTIONS,
    INIT_ANSWERS,
    GIVE_AN_ANSWER,
    GIVE_AN_RELATION_ANSWER,
    INIT_SELECTED_ANSWERS,
    SAVE_SELECTED_ANSWER,
    SAVE_SELECTED_RELATION_ANSWER,
    SELECT_ANSWER,
    NULLIFY_ANSWER,
    NULLIFY_SELECTED_ANSWER
} from './constants'

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
            for (let i = 0; i < action.payload.length; i++) {
                state.givedAnswers.push(action.payload[i].type === 0 ? -1 : [-1, -1, -1, -1])
            }

            window.setTimeout(() => {
                console.log(state)
            })

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

            window.setTimeout(() => {
                console.log(state)
            }, 100)

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
    switch (action.type) {
        case INIT_SELECTED_ANSWERS: {
            for (let i = 0; i < action.payload.length; i++) {
                state.selectedAnswers.push(action.payload[i].type === 0 ? -1 : [-1, -1, -1, -1])
            }

            window.setTimeout(() => {
                console.log(state)
            })

            return {
                ...state
            }
        }
        case SAVE_SELECTED_ANSWER: {
            state.selectedAnswers[action.payload.testId] = action.payload.answer

            return {
                ...state,
            }
        }
        case SAVE_SELECTED_RELATION_ANSWER: {
            state.selectedAnswers[action.payload.testId][action.payload.index] = action.payload.answer

            window.setTimeout(() => {
                console.log(state)
            })

            return {
                ...state
            }
        }
        case NULLIFY_SELECTED_ANSWER: {
            if (action.payload.type === 0) {
                state.selectedAnswers[action.payload.testId] = -1
            }

            if (action.payload.type === 1) {
                state.selectedAnswers[action.payload.testId] = [-1, -1, -1, -1]
                console.log(1)
            }

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