import { useState } from "react"

const BlogSubmitForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
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

    //add blog function
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setNewBlog('')
    }

    return (
        <>
            <p>Add new blog post:</p>
            <form onSubmit={addBlog}>
                <label>Title:</label>
                <input value={title} onChange={handleTitleChange}>
                </input>
                <label>Author:</label>
                <input value={author} onChange={handleAuthorChange}>
                </input>
                <label>Url:</label>
                <input value={url} onChange={handleUrlChange}>
                </input>
                <button type='submit'>Save</button>
            </form>
        </>
    )
}
export default BlogSubmitForm