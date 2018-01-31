import {
    createPost,
    modifyPost,
    deletePost,
    getPosts,
    getPostsByCategory,
    getPostById,
    postVotePost,
    getCommentsByPost
} from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST_DETAILS = 'RECEIVE_POST_DETAILS'
export const TOGGLE_POST_ACTIONS = 'TOGGLE_POST_EDIT'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'
export const UPDATE_COMMENT_COUNT = 'UPDATE_COMMENT_COUNT'
export const UPDATE_POST_FORM_TITLE = 'UPDATE_POST_FORM_TITLE'
export const UPDATE_POST_FORM_BODY = 'UPDATE_POST_FORM_BODY'
export const UPDATE_POST_FORM_CATEGORY = 'UPDATE_POST_FORM_CATEGORY'
export const SORT_POSTS = 'SORT_POSTS'

// Add/Edit/Remove Posts
export const savePost = (post) => {
    return (dispatch) => {
        createPost(post)
            .then(dispatch(addPost(post)) )
    }
}

export const saveEditedPost = (post) => {
    return (dispatch) => {
        modifyPost(post)
            .then(dispatch(editPost(post)) )
    }
}

export const removePost = (postId) => {
    return (dispatch) => {
        deletePost(postId)
            .then(dispatch(remove(postId)) )
    }
}

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

export const remove = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    }
}

export const postTitleChangeHandler = (value) => {
    return {
        type: UPDATE_POST_FORM_TITLE,
        value
    }
 }

export const postBodyChangeHandler = (value) => {
    return {
        type: UPDATE_POST_FORM_BODY,
        value
    }
 }
export const postCategoryChangeHandler = (value) => {
    return {
        type: UPDATE_POST_FORM_CATEGORY,
        value
    }
 }

// Request Posts
export const requestPosts = () => {
    return {
        type: REQUEST_POSTS
    }
}

export const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export const receivePostDetails = (post) => {
    return {
        type: RECEIVE_POST_DETAILS,
        post
    }
}

export const fetchPosts = (dispatch) => {
    return (dispatch) => {
        dispatch(requestPosts())
        getPosts()
            //.then(posts => console.log(posts))
            .then(posts => dispatch(receivePosts(posts)))
    }
}

export const fetchPostsByCategory = (category, dispatch) => {
    return (dispatch) => {
        dispatch(requestPosts())
        getPostsByCategory(category)
            //.then(posts => console.log(posts))
            .then(posts => dispatch(receivePosts(posts)))
    }
}

export const fetchPostById = (id, dispatch) => {
    return (dispatch) => {
        dispatch(requestPosts())
        getPostById(id)
            .then(post => dispatch(receivePostDetails(post)))
    }
}

export const togglePostActions = (postId) => {
    return {
        type: TOGGLE_POST_ACTIONS,
        postId
    }
}

// Post Comment Count
export const updateCommentCount = (postId, comments) => {
    return {
        type: UPDATE_COMMENT_COUNT,
        postId,
        comments
    }
}

export const fetchPostCommentCount = (postId, dispatch) => {
    return (dispatch) => {
        getCommentsByPost(postId)
            //.then(comments => console.log(postId, comments) )
            .then(comments => dispatch(updateCommentCount(postId, comments)))
    }
}


// Post Voting
export const updateVotedPost = (posts) => {
    return {
        type: VOTE_POST,
        posts
    }
}

export const fetchPostAfterVote = (id, dispatch) => {
    return (dispatch) => {
        getPostById(id)
            .then(post => dispatch(updateVotedPost(post)))
    }
}

export const votePost = (postId, option, dispatch) => {
    return (dispatch) => {
        postVotePost(postId, option)
            .then(dispatch(fetchPostAfterVote(postId)))
    }
}

// Sort Posts
export const sortPosts = (sortBy) => {
    return {
        type: SORT_POSTS,
        sortBy
    }
}
