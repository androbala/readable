import React from 'react'

const PostsListSort = (props) => {
    return (
        <div className="sort">
            <select value={props.sortBy} onChange={(e) => props.onHandleSortChange(e)} className="sort-select">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    )
}

export default PostsListSort
