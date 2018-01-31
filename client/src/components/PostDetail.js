import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPostById, votePost, removePost } from '../actions/postActions'
//import Loading from '../layout/Loading'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
//import Vote from '../votes/Vote'
import { formattedDate } from '../utils/helpers'


class PostDetail extends Component {

    componentDidMount() {
        this.props.fetchPostById(this.props.postId)
    }

    handleVotePost(option) {
        this.props.votePost(this.props.postId, option)
    }

    handleDeletePost(id) {
        this.props.removePost(id);
        this.props.history.push('/')
    }

    render() {
        const { loading, post } = this.props
        const postDate = formattedDate(post.timestamp)
        const isDeleted = Object.keys(post).length === 0
        return (
            <div className="post-detail-container">
                {isDeleted ?
                    <div className="post-detail-content">
                        <div className="container">
                            <p>Whoops. It looks like this post has been removed...</p>
                        </div>
                    </div>
                    :
                <div>
                    <div className="post-detail-content">
                        <div className="container">
                            {loading
                                ?   'loading post..'
                                :   <div>
                                        <h1>{post.title}</h1>
                                        <p>{post.body}</p>
                                        <p className="author">Posted by {post.author} on {postDate}</p>
                                        <div className="post-detail-vote">

                                        </div>
                                        <ul className="post-actions">
                                            <li><Link to={`/${this.props.postId}/edit`}>Edit</Link></li>
                                            <li><button className="unstyled" onClick={ () => this.handleDeletePost(post.id) }>Remove</button></li>
                                        </ul>
                                    </div>}
                        </div>
                    </div>
                    <div className="post-detail-comments">
                        <div className="container">
                            <h2>Comments</h2>
                            <CommentList postId={this.props.postId} />
                            <CommentForm postId={this.props.postId} />
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({posts}) => {
    return {
        post: Object.keys(posts.items).map((post) => {
            return posts.items[post]
        }).reduce((posts, post) => { return post}, {}),
        loading: posts.loading,
    }
}

export default connect(mapStateToProps, {fetchPostById, votePost, removePost})(PostDetail);
