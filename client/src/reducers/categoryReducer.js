import * as ACTION from '../actions/categoryActions'

const categories = (state = {loading: true}, action) => {
    switch (action.type) {
        case ACTION.REQUEST_CATEGORIES:
            return {...state, loading: true}
        case ACTION.RECEIVE_CATEGORIES:
            const {categories} = action
            return {...state, items: categories.categories.reduce((prev, curr) => prev.concat(curr), []), loading: false}
        default:
            return state
    }
}

export default categories
