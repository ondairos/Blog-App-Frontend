let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

//set user in local storage and the token
const setUser = (user) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    token = user.token
}

// clear local storage for logout
const clearUser = () => {
    window.localStorage.clear()
    token = null
}

// get User(used in userReducer) for useffect
const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        // i have different blogs service blogService.setToken(user.token)
        token = user.token
        return user
    }
    return null
}

const getToken = () => token


//const userService object for export default
const userService = {
    setUser, clearUser, getUser, getToken
}

export default userService