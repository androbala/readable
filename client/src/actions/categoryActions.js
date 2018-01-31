import {getCategories} from '../utils/api';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const requestCategories = () => {
    return {
        type: REQUEST_CATEGORIES
    }
}

export const receiveCategories = (categories) => {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}

export const fetchCategories = (dispatch) => {
    return (dispatch) => {
        dispatch(requestCategories())
        getCategories()
            .then(categories => dispatch(receiveCategories(categories)))
    }
}
