const BASE_URI = 'http://localhost:3001';
const TOKEN = 'whatever-you-want';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': TOKEN
}


//const api = "http://localhost:5001"

// Posts
export const getPosts = () => {
  return fetch(`${BASE_URI}/posts`, { headers })
    .then(res => res.json())
}

export const getPostsByCategory = (category) => {
  return fetch(`${BASE_URI}/${category}/posts`, { headers })
    .then(res => res.json())
}

export const getPostById = (postId) => {
  return fetch(`${BASE_URI}/posts/${postId}`, { headers })
    .then(res => res.json())
}

export const createPost = (post) => {
  return fetch(`${BASE_URI}/posts`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN
    },
    body: JSON.stringify({
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    })
  })
}

export const deletePost = (postId) => {
  return fetch(`${BASE_URI}/posts/${postId}`, {
    method: 'delete',  headers
  })
}

export const modifyPost = (post) => {
  return fetch(`${BASE_URI}/posts/${post.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body
    })
  })
}

export const postVotePost = (postId, option) => {
  return fetch(`${BASE_URI}/posts/${postId}`, {
    method: 'post',
    body: JSON.stringify({
      option: option
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN
    }
  })
}

// Comments
export const getCommentsByPost = (postId) => {
  return fetch(`${BASE_URI}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
}

export const getCommentById = (commentId) => {
  return fetch(`${BASE_URI}/comments/${commentId}`, { headers })
    .then(res => res.json())
}

export const postVoteComment = (commentId, option) => {
  return fetch(`${BASE_URI}/comments/${commentId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN
    },
    body: JSON.stringify({
      option: option
    })
  })
}

export const createComment = (comment) => {
  return fetch(`${BASE_URI}/comments`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN
    },
    body: JSON.stringify({
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    })
  })
}

export const modifyComment = (comment) => {
  return fetch(`${BASE_URI}/comments/${comment.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN
    },
    body: JSON.stringify({
      body: comment.body
    })
  })
}

export const deleteComment = (commentId) => {
  return fetch(`${BASE_URI}/comments/${commentId}`, {
    method: 'delete',  headers
  })
}


// Categories
export const getCategories = () => {
  return fetch(`${BASE_URI}/categories`, { headers })
    .then(res => res.json())
}
