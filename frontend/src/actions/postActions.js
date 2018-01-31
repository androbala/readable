import * as api from './../utils/api';

export const SET_POSTS = 'SET_POSTS';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const setPosts = posts => ({
  type: SET_POSTS,
  posts: posts
});

export const getPosts = () => dispatch => (
  api.getPosts().then(posts => dispatch(setPosts(posts)))
)

/*export function addPost ({ id, timestamp, title, body, author, category, voteScore = 1 }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
  }
}

export function addPost(post) {
  return (dispatch) => {
    api.addPost(post).then(() => {
      api.getPosts().then(posts => {
        dispatch(addPostSuccess(posts));
      })
    });
  };
}*/

export const addPost = (post) => dispatch => (
  api.addPost(post).then(() => {
    api.getPosts().then(posts => {
      dispatch(addPostSuccess(posts));
    });
  })
)

export function addPostSuccess(posts) {
  return {
    type: ADD_POST,
    posts: posts.filter(post => post.deleted===false)
  }
}

export const updatePost = (post) => dispatch => (
  api.editPost(post.id, {
    title: post.title,
    body: post.body
  }).then(() => {
    api.getPosts().then(posts => {
      dispatch(updatePostSuccess(posts));
    });
  })
)

export function updatePostSuccess(posts) {
  return {
    type: UPDATE_POST,
    posts: posts.filter(post => post.deleted===false)
  }
}

/*export function editPost ({ title, body, author, category }) {
  return {
    type: EDIT_POST,
    title,
    body,
    author,
    category,
  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id,
  }
}
*/
