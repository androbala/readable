import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCategories} from '../actions/categoryActions'
import {capitalize} from '../utils/helpers'
import PostsList from './PostsList'

class RightNav extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        const { categories, header } = this.props
        const categoryList = !categories.loading &&
            categories.items.map((category) => (
                <li key={category.path}>
                    <Link to={`/${category.path}`}>
                        {capitalize(category.name)}
                    </Link>
                </li>
            ))
        return (
            <div className="right-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a><span>Browse by Category</span></a>
                        <ul className="category-list">
                            <div>
                                {categoryList}
                            </div>
                        </ul>
                    </li>
                    <li><Link className="add-new" to="/new">+ New Post</Link></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({categories, header}) => {
    return {
        categories,
        header
    }
}

export default connect(mapStateToProps, { fetchCategories } )(RightNav)
