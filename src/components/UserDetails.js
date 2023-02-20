import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const BlogDetails = ({ users }) => {
    const findId = useParams().id
    const foundUser = users.find((element) => element.id === findId)

    // if user not found
    if (!foundUser) {
        return null
    }

    return (
        <div>
            <h3>{foundUser.name}</h3>
            <p>
                <b>user blogs:</b>
            </p>
            {foundUser.blogPosts.map((blog) => (
                <ul key={blog._id}>
                    <li><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></li>
                </ul>
            ))}
        </div>
    )
}

export default BlogDetails