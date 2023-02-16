import reducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

// config reduxjs/toolkit
const store = configureStore({
    reducer: {
        blogs: reducer,
        notification: notificationReducer,
        user: userReducer,
    }
})

export default store