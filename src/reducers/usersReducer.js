import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'


const usersSlice = createSlice({
    name: 'users',
    initialState: {},
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export const initUsers = () => {
    return async (dispatch) => {
        const users = await usersService.getAll()
        dispatch(setUsers(users))
        console.log(`inside the initUsers reducer: ${users}`)
    }
}


export default usersSlice.reducer