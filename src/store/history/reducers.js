import {
    PREVIOUS_PAGE,
    NEXT_PAGE,
    UPDATE_LOCATION,
    UPDATE_DATA
} from './constants'

const historyInitialState = {
    currentPage: window.location.hash,
    previousPage: ''
}

export const historyReducer = (state = historyInitialState, action) => {
    switch (action.type) {
        case PREVIOUS_PAGE: {
            return {
                ...state,
                currentPage: state.previousPage,
                previousPage: window.location.hash
            }
        }
        case NEXT_PAGE: {
            return {
                ...state,
                previousPage: currentPage,
                currentPage: window.location.hash
            }
        }
        case UPDATE_DATA: {
            return { 
                ...state,
                previousPage: currentPage,
                currentPage: window.location.hash
            }
        }
        default: {
            return { ...state }
        }
    }
}