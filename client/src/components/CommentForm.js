import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveComment, commentChangeHandler } from '../actions/commentActions'
import uuid from 'uuid4'

class CommentForm extends Component {
    handleCommentSubmit(e) {
        e.preventDefault();
        const id = uuid();
        if (this.props.form !== ''){
            this.props.saveComment({
                id: id,
                parentId: this.props.postId,
                timestamp: Date.now(),
                body: this.props.form,
                author: 'testuser',
                voteScore: 1,
                deleted: false,
                parentDeleted: false
            })
            this.props.commentChangeHandler('')
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.props.commentChangeHandler(e.target.value)
    }

    render() {
        return(
            <div className="new-comment">
                <h3>Add a comment (You're logged in as <strong>testuser</strong>)</h3>
                <form className="comment-form" onSubmit={ (e) => this.handleCommentSubmit(e) }>
                    <textarea onChange={ (e) => this.handleChange(e) } rows="2" placeholder="Type your comment here..." value={this.props.form}></textarea>
                    <button className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.comments
}

export default connect(mapStateToProps, { saveComment, commentChangeHandler })(CommentForm)
