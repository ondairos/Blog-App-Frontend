import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUserReducer(state, action) {
            state.push(action.payload)
        }
    }
})


export const { setUserReducer } = userSlice.actions

//actionR for init user , login, logout
export const initUser = () => {
    return async (dispatch) => {
        const userFromLocalStorage = await userService.getUser()
        dispatch(setUserReducer(userFromLocalStorage))
    }
}


//loginUser
export const loginUser = (user) => {
    return async (dispatch) => {
        userService.setUser(user)
        dispatch(setUserReducer(user))
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        userService.clearUser()
        dispatch(setUserReducer(null))
    }
}


export default userSlice.reducer