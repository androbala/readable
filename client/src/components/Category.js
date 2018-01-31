import React, { Component } from 'react';
import PostList from '../PostsList';
import { capitalize } from '../utils/helpers'

class Category extends Component {
    render() {
        const { category } = this.props;
        return (
            <div className="container">
                <h1>{capitalize(category)}</h1>
                <PostList />
            </div>
        )
    }
}

export default Category
