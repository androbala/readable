import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsByCategory, sortPosts } from '../actions/postActions'
import { capitalize } from '../utils/helpers'
import PostsListItem from './PostsListItem'
import PostsListSort from './PostsListSort'
//import Loading from '../layout/Loading'


class PostsList extends Component {

    componentDidMount() {
        this.fetch();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            this.fetch()
        }
    }

    fetch() {
        (this.props.category)
            ? this.props.fetchPostsByCategory(this.props.category)
            : this.props.fetchPosts()
    }

    handleSortChange(e) {
        this.props.sortPosts(e.target.value)
    }
//<PostListSort sortBy={this.props.posts.sortBy} onHandleSortChange={this.handleSortChange.bind(this) } />
    render() {
        const {items} = this.props.posts
        return (
            <div className="container">
                <h1>Posts from {this.props.category ? capitalize(this.props.category) : 'All Categories'} </h1>
                <PostsListSort sortBy={this.props.posts.sortBy} onHandleSortChange={this.handleSortChange.bind(this) } />
                <div className="list-entries">
                   {
                     items.length ? items.sort((a, b) => {
                        switch(this.props.posts.sortBy) {
                            case 'popular':
                                return a.voteScore - b.voteScore
                            case 'newest':
                                return a.timestamp - b.timestamp
                            default:
                                return a.voteScore - b.voteScore
                        }
                    }).reverse().map((post) => <PostsListItem key={post.id} post={post} />)
                    : "No posts found."
                   }

                </div>
            </div>
        )
    }
}

const mapStateToProps = ({posts}) => {
    return {
        posts: {
            items: Object.keys(posts.items).map((post) => {
                return posts.items[post]
            }),
            //loading: posts.loading,
            sortBy: posts.sortBy
        }
    }
}

export default connect(mapStateToProps, {fetchPosts, fetchPostsByCategory, sortPosts} )(PostsList)
