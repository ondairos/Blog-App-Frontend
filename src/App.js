// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useRef } from 'react'
import './App.css'
// react router
// eslint-disable-next-line no-unused-vars
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from 'react-router-dom'

// import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
// import BlogSubmitForm from './components/BlogSubmitForm'
// import Togglable from './components/Togglable'
import Users from './components/Users'
// import User from './components/User'
import UserDetails from './components/UserDetails'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'

import loginService from './services/login'

//redux imports
import { initializedBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initUser, loginUser, logoutUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

const App = () => {
    // const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [user, setUser] = useState(null)

    //redux init
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedBlogs())
    }, [dispatch])

    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    useEffect(() => {
        dispatch(initUser())
    }, [dispatch])

    //fetch logged in user
    const user = useSelector(({ user }) => {
        return user
    })

    //users init useffect
    useEffect(() => {
        dispatch(initUsers())
    }, [dispatch])

    // fetch users
    const users = useSelector(({ users }) => {
        console.log(`main app users: ${users}`)
        return users
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        loginService.login({ username, password })
            .then((user) => {
                dispatch(loginUser(user))
            }).catch((error) => {
                return console.log(error)
            })
    }

    // clear Local storage function LOGOUT
    const clearLocalStorage = () => {
        dispatch(logoutUser())
        // use notification here TODO
        console.log('good bye!')
    }

    return (
        <div>
            <h2>Blogs</h2>
            <hr></hr>

            {/* {user === null ? loginForm() : */}
            {user === null ? <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            /> :
                <div>
                    <p>{user.name} logged-in</p>
                    <button onClick={clearLocalStorage}>Logout</button>
                    <hr></hr>


                </div>
            }

            <Notification />
            <div className='NavBar'>
                <Link to={'/'}>Home </Link>
                <Link to={'/blogs'}>Blogs </Link>
                <Link to={'/users/'}>Users </Link>
            </div>

            <Routes>
                {/* <Route path='/' element={<App />} /> */}
                <Route path='/users/' element={user ? <Users users={users} /> : <Navigate replace to='/login' />} />
                <Route path='/users/:id' element={<UserDetails users={users} />} />
                <Route path='/blogs' element={<BlogList user={user} />} />
                <Route path='/blogs/:id' element={<BlogDetails blogs={blogs} />} />
            </Routes>

            <hr></hr>
            <h2>Place to store your blogs!</h2>
            <h5>Use the navigation bar.</h5>
            {/* {user === null ? <p>Login please</p> : <BlogList user={user} />} */}
            <br></br>
            <hr></hr>
            <Footer />
        </div>
    )
}


export default App
