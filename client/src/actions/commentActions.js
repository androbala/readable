import {
    getCommentsByPost,
    getCommentById,
    postVoteComment,
    createComment,
    modifyComment,
    deleteComment
} from '../utils/api'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT_FORM = 'UPDATE_COMMENT_FORM'
export const UPDATE_COMMENT_FORM_ITEM = 'UPDATE_COMMENT_FORM_ITEM'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const TOGGLE_COMMENT_EDIT = 'TOGGLE_COMMENT_EDIT'

export const requestComments = () => {
    return {
        type: REQUEST_COMMENTS
    }
}

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export const fetchComments = (postId, dispatch) => {
    return (dispatch) => {
        dispatch(requestComments())
        getCommentsByPost(postId)
             .then(comments => dispatch(receiveComments(comments)))
             //.then(comments => console.log(comments))
    }
}

export const saveComment = (comment) => {
    return (dispatch) => {
        createComment(comment)
            .then(dispatch(addComment(comment)) )
    }
}

export const saveEditedComment = (comment) => {
    return (dispatch) => {
        modifyComment(comment)
            .then(dispatch(editComment(comment)) )
    }
}

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export const removeComment = (commentId) => {
    return (dispatch) => {
        deleteComment(commentId)
            .then(dispatch(remove(commentId)) )
    }
}

export const remove = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
}

export const commentChangeHandler = (value) => {
    return {
        type: UPDATE_COMMENT_FORM,
        value
    }
 }

export const commentItemChangeHandler = (value, id) => {
    return {
        type: UPDATE_COMMENT_FORM_ITEM,
        value,
        id
    }
 }

 export const toggleCommentEdit = (id) => {
     return {
         type: TOGGLE_COMMENT_EDIT,
         id
     }
 }

// Comment Voting
export const updateVotedComment = (comment) => {
    return {
        type: VOTE_COMMENT,
        comment
    }
}

export const fetchCommentAfterVote = (id) => {
    return (dispatch) => {
        getCommentById(id)
            .then(comment => dispatch(updateVotedComment(comment)))
    }
}

export const voteComment = (commentId, option, dispatch) => {
    return (dispatch) => {
        postVoteComment(commentId, option)
            .then(dispatch(fetchCommentAfterVote(commentId)))
    }
}

// Sort Comments
export const sortComments = (sortBy) => {
    return {
        type: SORT_COMMENTS,
        sortBy
    }
}
