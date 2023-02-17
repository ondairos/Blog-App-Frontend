import reducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

// config reduxjs/toolkit
const store = configureStore({
    reducer: {
        blogs: reducer,
        notification: notificationReducer,
        user: userReducer,
        users: usersReducer
    }
})

export default store