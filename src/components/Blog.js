// import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { deleteBlogPost, increaseLikes } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog_remove, currentUser }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const dispatch = useDispatch()

    // --------------
    const blogsRedux = useSelector(({ blogs }) => {
        let result = blogs
        return result
    })
    // console.log(blogsRedux)
    const sorted_blogs = [...blogsRedux].sort((a, b) => b.likes - a.likes)
    // -------------


    const deleteBlog = async (blogObject) => {

        dispatch(deleteBlogPost(blogObject))

    }

    const handleLike = async (blogPostId) => {
        const foundBlog = sorted_blogs.find((specificBlog) => {
            return specificBlog._id === blogPostId
        })

        // console.log(`sorted blogs: ${foundBlog._id}`)

        const likedBlog = {
            ...foundBlog,
            likes: (foundBlog.likes || 0) + 1,
            user: foundBlog.user.id
        }

        dispatch(increaseLikes(likedBlog))
    }




    return (
        <div>
            {
                sorted_blogs.map(blog =>
                    <div style={blogStyle} className='main_blog' key={blog._id}>
                        <div className="blogTitle">
                            <p><span>{blog.title}</span> by: <span>{blog.author}</span></p>
                        </div>
                        <Togglable buttonLabel='Blog Details'>
                            <div className="blogAll">
                                <p>URL: {blog.url}</p>
                                <br></br>
                                <p>Likes: {blog.likes ? blog.likes : 0}</p>
                                <br></br>
                                <p>User: {blog.user ? blog.user.name : 'N/A'}</p>
                                <br></br>
                                <button onClick={() => handleLike(blog._id)}>Like</button>
                                {currentUser !== null && currentUser.username === blog.user.username && <button onClick={() => deleteBlog(blog)}>delete</button>}
                            </div>
                        </Togglable>
                    </div>
                )
            }
        </div>
    )
}
export default Blog