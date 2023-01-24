import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      ||{blog.title}||  by: {blog.author}
      <Togglable buttonLabel ='blog_view'>
        {blog.url}
        <br></br>
       {blog.likes ? blog.likes : 0}     
        <br></br>
        {blog.user.name}     
        <br></br>
      </Togglable>
    </div>
  )
}
export default Blog