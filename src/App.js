// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useRef } from 'react'
import './App.css'
// react router
// eslint-disable-next-line no-unused-vars
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from 'react-router-dom'

import Notification from './components/Notification'
import Footer from './components/Footer'
import { Home } from './components/Home'
import LoginForm from './components/LoginForm'
import Users from './components/Users'

import UserDetails from './components/UserDetails'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'

import loginService from './services/login'

//redux imports
import { initializedBlogs, addCommentsToBlog } from './reducers/blogReducer'
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

    //add comment function
    const addCommentToBlogPost = async ({ id, comment }) => {
        const foundBlog = blogs.find((blog) => blog._id === id)
        console.log(`inside app JS addcommentBlogPost foundblogs: ${foundBlog.author}`)
        const updatedObjectWithComment = foundBlog.comments.concat(comment)

        const finalBlogWithComments = {
            ...foundBlog,
            comments: updatedObjectWithComment,
            user: foundBlog.user.id
        }

        dispatch(addCommentsToBlog(finalBlogWithComments)).then(() => {
            console.log('added comment')
        })
    }

    return (
        <div>
            <h2>Blogs</h2>
            <hr></hr>
            <Notification />
            <div className='NavBar'>
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
                <Link className='NavBar_Home' to={'/'}>Home </Link>
                <Link className='NavBar_Blogs' to={'/blogs'}>Blogs </Link>
                <Link className='NavBar_Users' to={'/users/'}>Users </Link>
            </div>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={user ? <Users users={users} /> : <Navigate replace to='/login' />} />
                <Route path='/users/:id' element={<UserDetails users={users} />} />
                <Route path='/blogs' element={<BlogList user={user} />} />
                <Route path='/blogs/:id' element={<BlogDetails commentsProps={addCommentToBlogPost} blogs={blogs} />} />
            </Routes>
            <br></br>
            <hr></hr>
            <Footer />
        </div>
    )
}


export default App
