import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog }) => {

  return (
    <div>
      ||{blog.title}||  by: {blog.author}
      <Togglable buttonLabel ='blog_view'>
        {blog.url}
        <br></br>
        {blog.likes}     
        <br></br>
        {blog.user.name}     
        <br></br>
      </Togglable>
    </div>
  )
}
export default Blog