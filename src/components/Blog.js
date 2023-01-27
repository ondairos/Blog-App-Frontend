// import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className='main_blog'>
      <div className="blogTitle">
        <p><span>{blog.title}</span> by: <span>{blog.author}</span></p>
      </div>
      <Togglable buttonLabel='Blog Details'>
        <p>URL: {blog.url}</p>
        <br></br>
        <p>Likes: {blog.likes ? blog.likes : 0}</p>
        <br></br>
        <p>User:{blog.user?.name || 'N/A'}</p>
        <br></br>
        <button onClick={() => handleLike(blog._id, blog.user._id)}>Like</button>
        {currentUser !== null && currentUser.username === blog.user.username && <button onClick={() => handleDelete(blog)}>delete</button>}

      </Togglable>
    </div>
  )
}
export default Blog