import * as ACTION from '../actions/postActions'

const initialState = {
    items: {},
    loading: true,
    form: {
        title: '',
        body: '',
        category: ''
    },
    sortBy: 'popular'
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.REQUEST_POSTS:
            return {...state, loading: true}
        case ACTION.RECEIVE_POSTS:
            return {
                ...state,
                items: action.posts.filter(post => post.deleted === false).reduce((items, item) => {
                    items[item.id] = item
                    return items
                }, {}),
                loading: false,
            }
        case ACTION.RECEIVE_POST_DETAILS:
            return {
                ...state,
                items: {
                    [action.post.id]: action.post
                },
                loading: false,
            }
        case ACTION.VOTE_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.posts.id]: {
                        ...state.items[action.posts.id],
                        voteScore: action.posts.voteScore,
                    }
                }
            }
        case ACTION.TOGGLE_POST_ACTIONS:
            const { postId } = action
            return {
                ...state,
                items: {
                    ...state.items,
                    [postId]: {
                        ...state.items[postId],
                        showEdit: !state.items[postId].showEdit
                    }
                }
            }
        case ACTION.SORT_POSTS:
            return {
                ...state,
                sortBy: action.sortBy
            }
        case ACTION.UPDATE_COMMENT_COUNT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.postId]: {
                        ...state.items[action.postId],
                        commentCount: action.comments.length
                    }
                },
            }
        case ACTION.ADD_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.post.id]: action.post
                }
            }
        case ACTION.EDIT_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.post.id]: action.post
                }
            }
        case ACTION.REMOVE_POST:
            const newState = state.items
            return {
                ...state,
                items: Object.keys(newState)
                .filter(key => key !== action.postId)
                .reduce((result, current) => {
                  result[current] = newState[current];
                  return result;
              }, {})
            }
        case ACTION.UPDATE_POST_FORM_TITLE:
            return {
                ...state,
                form: {
                    ...state.form,
                    title: action.value
                }
            }
        case ACTION.UPDATE_POST_FORM_BODY:
            return {
                ...state,
                form: {
                    ...state.form,
                    body: action.value
                }
            }
        case ACTION.UPDATE_POST_FORM_CATEGORY:
            return {
                ...state,
                form: {
                    ...state.form,
                    category: action.value
                }
            }
        default:
            return state
    }
}

export default posts
