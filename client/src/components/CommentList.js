import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    fetchComments,
    voteComment,
    sortComments,
    toggleCommentEdit,
    saveEditedComment,
    commentItemChangeHandler,
    removeComment
} from '../actions/commentActions'
import CommentListItem from './CommentListItem'
//import CommentListSort from './CommentListSort'
//import Loading from '../layout/Loading'

class CommentList extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.postId)
    }

    handleVoteComment(option, commentId) {
        this.props.voteComment(commentId, option)
    }

    handleSortChange(e) {
        this.props.sortComments(e.target.value)
    }

    handleToggleCommentEdit(body, id) {
        this.props.toggleCommentEdit(id)
        this.props.commentItemChangeHandler(body, id)
    }

    handleCommentEdit(e, id, body){
        e.preventDefault()
        if(body !== '') {
            this.props.saveEditedComment({ id, body, timestamp: Date.now() })
            this.props.toggleCommentEdit(id)
        } else {
            alert('Please enter your comment')
        }
    }

    handleChange(e, id) {
        e.preventDefault();
        this.props.commentItemChangeHandler(e.target.value, id)
    }

    handleDelete(id) {
        this.props.removeComment(id)
    }

    render() {
        const { loading, items, sortBy, showEdit } = this.props.comments
        const commentCount = items && items.length
        return(
            <div className="comment-list-wrapper">

                {loading
                    ? "loading data..."
                    : <div className="comment-list">
                        { commentCount > 0 && <div className="comment-count">Displaying { commentCount } Comment{commentCount !== 1 && 's'}</div>}
                        {items && items.sort((a, b) => {
                            switch(sortBy) {
                                case 'popular':
                                    return a.voteScore - b.voteScore
                                case 'newest':
                                    return a.timestamp - b.timestamp
                                default:
                                    return a.voteScore - b.voteScore
                            }
                        }).reverse().map((comment) =>
                            <CommentListItem
                                key={comment.id}
                                comment={comment}
                                onVote={this.handleVoteComment.bind(this)}
                                onHandleToggleCommentEdit={this.handleToggleCommentEdit.bind(this)}
                                onHandleCommentEdit={this.handleCommentEdit.bind(this)}
                                onHandleChange={this.handleChange.bind(this)}
                                onHandleDelete={this.handleDelete.bind(this)}
                                editForm={comment.form}
                                showEdit={showEdit}/>
                            )}
                        </div>  }
                { (!loading && items && items.length < 1) && 'No one has commented on this post yet.'}
            </div>
        )
    }
}

const mapStateToProps = ({comments}) => {
    return {
        comments: {
            items: comments.items && Object.keys(comments.items).map((comment) => {
                return comments.items[comment]
            }),
            loading: comments.loading,
            sortBy: comments.sortBy,
            showEdit: comments.showEdit
        },

    }
}

export default connect(mapStateToProps, {
    fetchComments,
    voteComment,
    sortComments,
    toggleCommentEdit,
    saveEditedComment,
    commentItemChangeHandler,
    removeComment
})(CommentList)
