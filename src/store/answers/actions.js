import {
    PUSH_QUESTIONS,
    INIT_ANSWERS,
    GIVE_AN_ANSWER,
    GIVE_AN_RELATION_ANSWER,
    GIVE_AN_TEXT_ANSWER,
    INIT_SELECTED_ANSWERS,
    SAVE_SELECTED_ANSWER,
    SAVE_SELECTED_RELATION_ANSWER,
    SAVE_SELECTED_TEXT_ANSWER,
    NULLIFY_ANSWER,
    NULLIFY_SELECTED_ANSWER,
    NULLIFY_RELATION_ANSWER_BY_INDEX,
    NULLIFY_SELECTED_RELATION_ANSWER_BY_INDEX,
    NULLIFY_SELECTED_TEXT_ANSWER_BY_INDEX,
    SET_ANSWERS_DISPLAY,
    LIMIT_TIME
} from './constants'

export const pushQuestions = (data) => ({
    type: PUSH_QUESTIONS,
    payload: data
})

export const giveAnAnswer = (testId, answer) => ({
    type: GIVE_AN_ANSWER,
    payload: { testId, answer }
})

export const giveAnRelationAnswer = (testId, index, answer) => ({
    type: GIVE_AN_RELATION_ANSWER,
    payload: { testId, index, answer }
})

export const initSelectedAnswers = (answers) => ({
    type: INIT_SELECTED_ANSWERS,
    payload: answers
})

export const saveSelectedAnswer = (testId, answer) => ({
    type: SAVE_SELECTED_ANSWER,
    payload: { testId, answer }
})

export const saveSelectedRelationAnswer = (testId, index, answer) => ({
    type: SAVE_SELECTED_RELATION_ANSWER,
    payload: { testId, index, answer }
})

export const saveSelectedTextAnswer = (testId, index, answer) => ({
    type: SAVE_SELECTED_TEXT_ANSWER,
    payload: { testId, index, answer }
})

export const initAnswers = (answers) => ({
    type: INIT_ANSWERS,
    payload: answers
})

export const nullifyAnswer = (testId, type) => ({
    type: NULLIFY_ANSWER,
    payload: { testId, type }
})

export const nullifySelectedAnswer = (testId, type) => ({
    type: NULLIFY_SELECTED_ANSWER,
    payload: { testId, type }
})

export const nullifyRelationAnswerByIndex = (testId, index) => ({
    type: NULLIFY_RELATION_ANSWER_BY_INDEX,
    payload: { testId, index }
})

export const nullifySelectedRelationAnswerByIndex = (testId, index) => ({
    type: NULLIFY_SELECTED_RELATION_ANSWER_BY_INDEX,
    payload: { testId, index }
})

export const nullifySelectedTextAnswerByIndex = (testId, index) => ({
    type: NULLIFY_SELECTED_TEXT_ANSWER_BY_INDEX,
    payload: { testId, index }
})

export const setAnswersDisplay = (isDisplayable) => ({
    type: SET_ANSWERS_DISPLAY,
    payload: isDisplayable
})

export const limitTime = (isLimited) => ({
    type: LIMIT_TIME,
    payload: isLimited
})