// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogSubmitForm = () => {
    const dispatch = useDispatch()

    // const [title, setTitle] = useState('')
    // const [author, setAuthor] = useState('')
    // const [url, setUrl] = useState('')
    // const [likes, setLikes] = useState(0)
    // // eslint-disable-next-line no-unused-vars
    // const [newBlog, setNewBlog] = useState('')

    // // onChange title
    // const handleTitleChange = (event) => {
    //     setTitle(event.target.value)
    // }

    // //onChange author
    // const handleAuthorChange = (event) => {
    //     setAuthor(event.target.value)
    // }
    // //onChange url
    // const handleUrlChange = (event) => {
    //     setUrl(event.target.value)
    // }

    // const handleLikesChange = (event) => {
    //     setLikes(event.target.value)
    // }

    // //add blog function
    // const addBlog = (event) => {
    //     event.preventDefault()
    //     dispatch(createBlog({
    //         title: title,
    //         author: author,
    //         url: url,
    //         likes: likes
    //     }))
    //     setNewBlog('')
    // }


    const addBlog = () => {
        event.preventDefault()

        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        const likes = event.target.likes.value

        dispatch(createBlog({ title, author, url, likes }))
        event.target.reset()
    }

    return (
        <div className="formDiv">
            <p>Add new blog post:</p>
            <form onSubmit={addBlog}>
                <label htmlFor='titleInput'>Title:</label>
                <input id='titleInput' name='title' className='form_title' placeholder='Insert Title'>
                </input>
                <label>Author:</label>
                <input id='authorInput' name='author' placeholder='Insert Author'>
                </input>
                <label>Url:</label>
                <input id='urlInput' name='url' placeholder='Insert Url'>
                </input>
                <input placeholder='Insert Likes' name='likes' value='0'>
                </input>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}
export default BlogSubmitForm