import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogSubmitForm = ({ createBlogProp }) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [newBlog, setNewBlog] = useState('')

    // onChange title
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    //onChange author
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    //onChange url
    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleLikesChange = (event) => {
        setLikes(event.target.value)
    }

    //add blog function
    const addBlog = (event) => {
        event.preventDefault()
        dispatch(createBlog({ title, author, url, likes }))
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes(0)
    }

    return (
        <div className="formDiv">
            <p>Add new blog post:</p>
            <form onSubmit={addBlog}>
                <label htmlFor='titleInput'>Title:</label>
                <input id='titleInput' className='form_title' value={title} onChange={handleTitleChange} placeholder='Insert Title'>
                </input>
                <label>Author:</label>
                <input id='authorInput' value={author} onChange={handleAuthorChange} placeholder='Insert Author'>
                </input>
                <label>Url:</label>
                <input id='urlInput' value={url} onChange={handleUrlChange} placeholder='Insert Url'>
                </input>
                <input value={likes} onChange={handleLikesChange} placeholder='Insert Likes'>
                </input>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}
export default BlogSubmitForm