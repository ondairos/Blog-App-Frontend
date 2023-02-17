import { useState, useEffect, useRef } from 'react'
import './App.css'
// react router
// eslint-disable-next-line no-unused-vars
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogSubmitForm from './components/BlogSubmitForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'

//redux imports
import { initializedBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
    // const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [user, setUser] = useState(null)

    // ref the blogsubmitform
    const blogSubmitFormRef = useRef()

    //redux init
    const dispatch = useDispatch()


    // getAll blogs effect hook
    useEffect(() => {
        blogService.getAll().then(() =>
            dispatch(initializedBlogs())
        )
    }, [dispatch])

    // save User to local storage effect hook
    // useEffect(() => {
    //     const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    //     if (loggedUserJSON) {
    //         const parsedUser = JSON.parse(loggedUserJSON)
    //         setUser(parsedUser)
    //         blogService.setToken(parsedUser.token)
    //     }
    // }, [])

    useEffect(() => {
        dispatch(initUser())
    }, [dispatch])

    const user = useSelector(({ user }) => {
        return user
    })

    // handle login logic
    // const handleLogin = async (event) => {
    //     event.preventDefault()

    //     try {
    //         const user = await loginService.login({
    //             username, password,
    //         })
    //         //  save user to local storage from state(user)
    //         window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    //         // send the user token for Authorization in the backend through notesService
    //         blogService.setToken(user.token)
    //         setUser(user)
    //         setUsername('')
    //         setPassword('')
    //     } catch (exception) {
    //         console.log(exception)
    //     }
    // }

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
            <div className='NavBar'>
                <Link to={'/'}>Home</Link>
                <Link to={'/'}>Blogs</Link>
                <Link to={'/'}>Users</Link>
            </div>

            <Routes>
                <Route path='/' element={<App />} />
                <Route path='users' element={user ? <Users /> : <Navigate replace to='/login' />} />
                <Route path='users/:id' element={<User />} />
            </Routes>


            <Notification />

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

                    <Togglable buttonLabel='blog_submit' ref={blogSubmitFormRef}>
                        <BlogSubmitForm />
                    </Togglable>

                    <h2>Blog List:</h2>
                    <Blog currentUser={user} />
                </div>
            }
            <br></br>
            <hr></hr>
            <Footer />
        </div>
    )
}


export default App
