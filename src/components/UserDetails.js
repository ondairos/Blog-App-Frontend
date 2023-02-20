import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const BlogDetails = ({ users }) => {
    const findId = useParams().id

    // to avoid error with built in function .find
    if (!Array.isArray(users)) {
        return null
    }

    const foundUser = users.find((element) => element.id === findId)

    // if user not found
    if (!foundUser) {
        return null
    }

    return (
        <>
            {foundUser ?
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
                :
                <div>Loading...</div>
            }
        </>
    )
}

export default BlogDetails