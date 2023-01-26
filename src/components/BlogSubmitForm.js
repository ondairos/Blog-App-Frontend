import { useState } from "react"

const BlogSubmitForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)
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
        setUrl(event.target.value)
    }

    //add blog function
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: likes
        })
        setNewBlog('')
    }

    return (
        <div className="formDiv">
            <p>Add new blog post:</p>
            <form onSubmit={addBlog}>
                <label for='titleInput'>Title:</label>
                <input id='titleInput' className='form_title' value={title} onChange={handleTitleChange}>
                </input>
                <label>Author:</label>
                <input value={author} onChange={handleAuthorChange}>
                </input>
                <label>Url:</label>
                <input value={url} onChange={handleUrlChange}>
                </input>
                <input value={likes} onChange={handleLikesChange}>
                </input>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}
export default BlogSubmitForm