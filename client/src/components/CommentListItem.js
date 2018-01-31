import React from 'react';
//import Vote from '../votes/Vote';
import { formattedDate } from '../utils/helpers'

const CommentListItem = (props) => {
    const { comment, onVote } = props
    return (
        <div className="comment-list-item">
            <div className="comment-list-content">
                {comment.showEdit
                ? <div className="comment">
                    <form className="comment-form" onSubmit={ (e) => props.onHandleCommentEdit(e, comment.id, props.editForm) }>
                        <textarea onChange={ (e) => props.onHandleChange(e, comment.id, props.editForm) }
                            rows="2"
                            placeholder="Type your comment here..."
                            value={props.editForm}>
                        </textarea>
                        <button className="btn edit">Update</button>
                    </form>
                  </div>
                : <div className="comment">{comment.body}</div>
                }
                <div className="comment-meta">
                    <p className="author">By {comment.author} on {formattedDate(comment.timestamp)}</p>
                    <div className="comment-actions">
                        <li>
                            <button className="unstyled" onClick={ () =>
                                props.onHandleToggleCommentEdit(comment.body, comment.id) }>
                                    {comment.showEdit ? "Cancel" : "Edit" }
                            </button>
                        </li>
                        <li>
                        <button className="unstyled" onClick={ () =>
                        props.onHandleDelete(comment.id) }>Remove</button>
                        </li>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CommentListItem
