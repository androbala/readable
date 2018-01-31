import React, { Component } from 'react'
import { connect } from 'react-redux'
import { savePost, postTitleChangeHandler, postBodyChangeHandler, postCategoryChangeHandler } from '../actions/postActions'
import { fetchCategories } from '../actions/categoryActions'
import { capitalize } from '../utils/helpers'
import uuid from 'uuid4'

class NewPost extends Component {

    componentDidMount() {
        // Fetch categories to populate select list
        this.props.fetchCategories()

        // Clear form fields (when navigating from Edit Post to New Post)
        this.props.postTitleChangeHandler('')
        this.props.postBodyChangeHandler('')
        this.props.postCategoryChangeHandler('')
    }

    handlePostSubmit(e) {
        e.preventDefault();
        const id = uuid();
        if (this.props.posts.form.title !== '' && this.props.posts.form.body !== '' && this.props.posts.form.category !== ''){
            this.props.savePost({
                id: id,
                parentId: this.props.postId,
                timestamp: Date.now(),
                title: this.props.posts.form.title,
                body: this.props.posts.form.body,
                author: 'testuser',
                category: this.props.posts.form.category,
                voteScore: 1,
                deleted: false,
                parentDeleted: false
            })
            const redirectUrl = `/${this.props.posts.form.category}/${id}`
            this.props.postTitleChangeHandler('')
            this.props.postBodyChangeHandler('')
            this.props.postCategoryChangeHandler('')
            this.props.history.push(redirectUrl)
        } else {
            alert('All fields are required!')
        }
    }

    handleTitleChange(e) {
        this.props.postTitleChangeHandler(e.target.value)
    }
    handleBodyChange(e) {
        this.props.postBodyChangeHandler(e.target.value)
    }
    handleCategoryChange(e) {
        this.props.postCategoryChangeHandler(e.target.value)
    }

    render() {
        return (
            <div className="container">
                <h1>New Post</h1>
                <form className="new-post-form" onSubmit={(e) => this.handlePostSubmit(e)}>
                    <div className="form-control">
                        <input className="h1" type="text" placeholder="Post Title" value={this.props.posts.form.title} onChange={(e) => this.handleTitleChange(e) }/>
                    </div>
                    <div className="form-control">
                        <textarea placeholder="Enter your post content here..." value={this.props.posts.form.body} onChange={(e) => this.handleBodyChange(e) }></textarea>
                    </div>

                    <select name="" id="" value={this.props.posts.form.category} onChange={(e) => this.handleCategoryChange(e)}>
                        <option value="">Select a Category</option>
                        {!this.props.categories.loading &&
                            this.props.categories.items.map((category) => (
                                <option key={category.path} value={category.name}>{capitalize(category.name)}</option>
                        ))}
                    </select>
                    <button className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({categories, posts}) => {
    return { categories, posts }
}

export default connect(mapStateToProps, {
    fetchCategories,
    savePost,
    postTitleChangeHandler,
    postBodyChangeHandler,
    postCategoryChangeHandler,
})(NewPost);
