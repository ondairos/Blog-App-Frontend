import React from 'react'
import { useParams } from 'react-router-dom'


const BlogDetails = ({ blogs }) => {

    // console.log(`Inside Blog details: ${blogs[0].title}`)
    // find specific blog id to display
    const useBlogId = useParams().id
    const foundBlogId = blogs.find((element) => element._id === useBlogId)
    console.log(`Inside Blog details: ${foundBlogId}`)


    return (
        <div>
            <p>Blog details</p>
            <p><b>{foundBlogId.title}</b> by <b>{foundBlogId.author}</b></p>
            <p>{foundBlogId.url}</p>
            {/* <p>added by user: {foundBlogId.user}</p> */}
            <p>{foundBlogId.likes}</p>
        </div>
    )
}

export default BlogDetails