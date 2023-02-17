import React from 'react'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogSubmitForm from './BlogSubmitForm'
import Blog from './Blog'

const BlogList = ({ user }) => {

    const blogSubmitFormRef = useRef()

    return (
        <div className='blog_list_main'>
            <Togglable buttonLabel='blog_submit' ref={blogSubmitFormRef}>
                <BlogSubmitForm />
            </Togglable>

            <h2>Blog List:</h2>
            <Blog currentUser={user} />
        </div>
    )
}

export default BlogList