import {
    PREVIOUS_PAGE,
    NEXT_PAGE,
    UPDATE_LOCATION
} from './constants'

export const previousPage = () => ({
    type: PREVIOUS_PAGE
})

export const nextPage = () => ({
    type: NEXT_PAGE
})

export const updateLocation = () => ({
    type: UPDATE_LOCATION
})

export const updateData = () => ({
    type: UPDATE_DATA,
})