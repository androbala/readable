import {
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  SET_POSTS
  //ADD_COMMENT
} from './../actions/postActions'

export default (state = {posts: []}, action) => {
  const { id, timestamp, title, body, author, category, voteScore } = action

  switch (action.type) {
    case SET_POSTS :
      return Object.assign({}, {
        posts: action.posts
      });
    case ADD_POST :
      return Object.assign({}, state, {
        posts: action.posts
      });
    case UPDATE_POST :
      return Object.assign({}, state, {
        posts: action.posts
      });
    default :
      return state
  }
}
