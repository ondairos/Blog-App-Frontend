import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const BlogDetails = ({ blogs, commentsProps }) => {

    // state for comments -todo redux-
    const [comment, setComment] = useState('')

    // console.log(`Inside Blog details: ${blogs[0].title}`)
    // find specific blog id to display
    const useBlogId = useParams().id
    const foundBlogId = blogs.find((element) => element._id === useBlogId)
    console.log(`Inside Blog details: ${foundBlogId}`)

    const handleComment = (event) => {
        event.preventDefault()
        // check for _id.id or foundBlogId sketo
        commentsProps({ id: foundBlogId._id, comment })
        setComment('')
    }


    return (
        <>
            {foundBlogId ?
                <div>
                    <p>Blog details</p>
                    <p><b>{foundBlogId.title}</b> by <b>{foundBlogId.author}</b></p>
                    <p>{foundBlogId.url}</p>
                    {/* <p>added by user: {foundBlogId.user}</p> */}
                    <p>{foundBlogId.likes}</p>
                    <p>{foundBlogId.comments}</p>

                    <form onSubmit={handleComment}>
                        <div>
                            <input value={comment} name='comment' id='comment' placeholder='add your comment here' onChange={({ target }) => setComment(target.value)}></input>
                        </div>
                        <Button variant="primary" type='submit' id='create-comment'>Add Comment</Button>
                    </form>
                </div>
                :
                <div>Loading...</div>
            }

        </>
    )
}

export default BlogDetails