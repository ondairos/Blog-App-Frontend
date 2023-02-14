import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    message: '',
    error: 'error here...'
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        createNotification: (state, action) => {
            state.message = `Blog post: ${action.payload} created!`
        },
        // eslint-disable-next-line no-unused-vars
        clearNotification(state, action) {
            state.message = ''
        }
    }
})


export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer