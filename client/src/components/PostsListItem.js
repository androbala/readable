import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { togglePostActions, votePost, fetchPostCommentCount, removePost } from '../actions/postActions'
import Vote from './Vote'
import { formattedDate } from '../utils/helpers'

class PostListItem extends Component {

    componentDidMount() {
        if (!this.props.posts.loading){
            this.props.fetchPostCommentCount(this.props.post.id)
        }
    }

    toggleActions = (postId) => {
        this.props.togglePostActions(postId)
    }

    handleVotePost(option, postId) {
        this.props.votePost(postId, option)
    }

    handleDeletePost(id) {
        this.props.removePost(id);
    }

    render() {
        const { post } = this.props
        const postDate = formattedDate(post.timestamp)
        return (
            <div className="entry-list-item">
                <div className="entry-list-content">
                    <h2 className="entry-title"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h2>
                    <div className="entry-meta">
                        <span className="entry-author">By {post.author}</span>
                        <span className="entry-commentcount">{post.commentCount} Comment{post.commentCount !== 1 && 's'}</span>
                        <span className="entry-date">Posted on {postDate}</span>
                    </div>
                </div>
                <div className="clearfix"></div>
                <ul className="entry-list-actions">
                    <li className="edit"><Link to={`/${post.id}/edit`}>Edit</Link></li>
                    <li className="remove"><button onClick={ () => this.handleDeletePost(post.id) }>Delete</button></li>
                </ul>
                <Vote score={post.voteScore} onVote={this.handleVotePost.bind(this)} itemId={post.id} />
                <div className="clearfix"></div>
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments}) => {
    return {
        posts,
        comments
    }
}

export default connect(mapStateToProps, { togglePostActions, votePost, fetchPostCommentCount, removePost } )(PostListItem)
