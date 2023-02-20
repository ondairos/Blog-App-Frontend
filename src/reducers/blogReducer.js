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
        setBlog(state, action) {
            const blog = action.payload
            return state.map((currentBlog) => currentBlog._id === blog._id ? blog : currentBlog)
        },
        removeBlogPost(state, action) {
            return state.filter(blogPost => blogPost !== action.payload)
        },
        appendLike(state, action) {
            const blog = action.payload
            return state.map((myBlog) => (myBlog._id === blog._id ? blog : myBlog))
        }
    }
})

// action reducers
export const { appendBlog, setBlogs, removeBlogPost, appendLike, setBlog } = blogSlice.actions

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

export const increaseLikes = (blogPost) => {
    return async (dispatch) => {
        // console.log(blogPost)
        const updatedBlogPost = await exportBlogsService.update(blogPost._id, blogPost)
        dispatch(appendLike(updatedBlogPost))
    }
}

export const addCommentsToBlog = (blogPost) => {
    return async (dispatch) => {
        const updatedBlog = await exportBlogsService.addComment(blogPost._id, blogPost)
        dispatch(setBlog(updatedBlog))
    }
}


export default blogSlice.reducer