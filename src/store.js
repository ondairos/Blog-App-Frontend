import reducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

// config reduxjs/toolkit
const store = configureStore({
    reducer: {
        blogs: reducer,
        notification: notificationReducer
    }
})

export default store