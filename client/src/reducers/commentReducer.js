import * as ACTION from '../actions/commentActions'

const comments = (state = {items: {}, loading: true, form: '', showEdit: false}, action) => {
    switch (action.type) {
        case ACTION.REQUEST_COMMENTS:
            return {
                ...state,
                loading: true
            }
        case ACTION.RECEIVE_COMMENTS:
            return {
                ...state,
                items: action.comments.reduce((items, item) => {
                    items[item.id] = item
                    return items
                }, {}),
                loading: false
            }
        case ACTION.UPDATE_COMMENT_FORM:
            return {
                ...state,
                form: action.value
            }
        case ACTION.UPDATE_COMMENT_FORM_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        form: action.value
                    }
                }
            }
        case ACTION.ADD_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.comment.id]: action.comment
                }
            }
        case ACTION.SORT_COMMENTS:
            return {
                ...state,
                sortBy: action.sortBy
            }
        case ACTION.VOTE_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.comment.id]: action.comment
                }
            }
        case ACTION.TOGGLE_COMMENT_EDIT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        showEdit: !state.items[action.id].showEdit
                    }
                }
            }
        case ACTION.EDIT_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.comment.id]: {
                        ...state.items[action.comment.id],
                        body: action.comment.body,
                        timestamp: action.comment.timestamp
                    }
                }
            }
        case ACTION.REMOVE_COMMENT:
            const newState = state.items
            return {
                ...state,
                items: Object.keys(newState)
                .filter(key => key !== action.commentId)
                .reduce((result, current) => {
                  result[current] = newState[current];
                  return result;
              }, {})
            }
        default:
            return state
    }
}

export default comments
