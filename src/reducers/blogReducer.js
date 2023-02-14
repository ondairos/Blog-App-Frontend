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
        }
    }
})

// action reducers
export const { appendBlog, setBlogs } = blogSlice.actions

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
        const newBlog = await exportBlogsService.createBlog(content)
        dispatch(appendBlog(newBlog))
    }
}

export default blogSlice.reducer