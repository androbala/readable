import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveEditedPost, postTitleChangeHandler, postBodyChangeHandler, fetchPostById } from '../actions/postActions'
import { fetchCategories } from '../actions/categoryActions'
import IoIosComposeOutline from 'react-icons/lib/io/ios-compose-outline'

class EditPost extends Component {

    componentDidMount() {
        this.props.fetchPostById(this.props.postId)
    }

    componentDidUpdate(prevProps) {
        // Once post details received, populate form with the post's current details
        if (prevProps.posts.loading && !this.props.posts.loading) {
            this.props.postTitleChangeHandler(this.props.post.title)
            this.props.postBodyChangeHandler(this.props.post.body)
        }
    }

    handlePostEditSubmit(e) {
        e.preventDefault();
        this.props.saveEditedPost({
            id: this.props.postId,
            title: this.props.posts.form.title,
            body: this.props.posts.form.body,
            category: this.props.post.category
        })
        this.props.postTitleChangeHandler('')
        this.props.postBodyChangeHandler('')
        this.props.history.push(`/${this.props.post.category}/${this.props.postId}`)
    }

    handlePostEditCancel() {
        this.props.history.push(`/${this.props.post.category}/${this.props.postId}`)
    }

    handleTitleChange(e) {
        this.props.postTitleChangeHandler(e.target.value)
    }
    handleBodyChange(e) {
        this.props.postBodyChangeHandler(e.target.value)
    }

    render() {
        const { title, body} = this.props.posts.form
        return (
            <div className="container">
                <form className="new-post-form" onSubmit={(e) => this.handlePostEditSubmit(e)}>
                    <div className="form-control edit-post">
                        <input className="h1 edit-field" type="text" placeholder="Post Title" value={title} onChange={(e) => this.handleTitleChange(e) }/>
                        <IoIosComposeOutline className="contextual-edit"/>
                    </div>
                    <div className="form-control edit-post">
                        <textarea placeholder="Enter your post content here..." value={body} onChange={(e) => this.handleBodyChange(e) }></textarea>
                        <IoIosComposeOutline className="contextual-edit"/>
                    </div>
                    <button type="submit" className="btn">Update</button>
                    <button type="button" onClick={() => this.handlePostEditCancel()} className="btn unstyled cancel">Cancel</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({categories, posts}) => {
    return {
        categories,
        posts,
        post: Object.keys(posts.items).map((post) => {
            return posts.items[post]
        }).reduce((posts, post) => { return post}, {}),
    }
}

export default connect(mapStateToProps, {
    fetchCategories,
    saveEditedPost,
    postTitleChangeHandler,
    postBodyChangeHandler,
    fetchPostById
})(EditPost);
