import { createSlice } from '@reduxjs/toolkit'
import exportBlogsService from '../services/blogs'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        setAuthor(state, action) {
            return action.payload
        },
        setUrl(state, action) {
            return action.payload
        },
        setTitle(state, action) {
            return action.payload
        },
        setLikes(state, action) {
            return action.payload
        },
        removeBlogPost(state, action) {
            return state.filter(blogPost => blogPost !== action.payload)
        }
    }
})

// action reducers
export const { appendBlog, setBlogs, setAuthor, setUrl, setTitle, setLikes, removeBlogPost } = blogSlice.actions

//init blogs
export const initializedBlogs = () => {
    return async dispatch => {
        const blogs = await exportBlogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

//create blog
export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await exportBlogsService.create(content)
        dispatch(appendBlog(newBlog))
    }
}


export const deleteBlogPost = (object) => {
    return async (dispatch) => {
        const deletedBlogPost = await exportBlogsService.deleteB(object._id)
        dispatch(removeBlogPost(deletedBlogPost))
        const updatedBlogPosts = await exportBlogsService.getAll()
        dispatch(setBlogs(updatedBlogPosts))
    }
}

export default blogSlice.reducer