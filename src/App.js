import { useState, useEffect, useRef } from 'react'
import './App.css'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogSubmitForm from './components/BlogSubmitForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

//redux imports
import { initializedBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const parsedUser = JSON.parse(loggedUserJSON)
            setUser(parsedUser)
            blogService.setToken(parsedUser.token)
        }
    }, [])

    // handle login logic
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            //  save user to local storage from state(user)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            // send the user token for Authorization in the backend through notesService
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
        }
    }

    // clear Local storage function
    const clearLocalStorage = () => {
        window.localStorage.clear()
        setUser(null)
        return
    }


    //add blog function
    // const addBlog = (blogObject) => {
    //     // with the usage of useRef i use the toggleVisibility from Togglable component
    //     blogSubmitFormRef.current.toggleVisibility()
    //     blogService.create(blogObject)
    //         .then(returnedBlog => {
    //             setBlogs(blogs.concat(returnedBlog))
    //             setErrorMessage(
    //                 `a new blog post: '${returnedBlog.title}' by ${returnedBlog.author} was added!`
    //             )
    //             setInterval(() => {
    //                 setErrorMessage('')
    //             }, 5000)
    //         })

    // }


    // const addBlog = (blogObject) => {
    //     blogSubmitFormRef.current.toggleVisibility()
    //     createBlog(blogObject)
    //         .then((returnedBlog) => {
    //             setErrorMessage(
    //                 `a new blog post: '${returnedBlog.title}' by ${returnedBlog.author} was added!`
    //             )
    //             setInterval(() => {
    //                 setErrorMessage('')
    //             }, 5000)
    //         })
    // }

    // //update blog function increase likes
    // const addLike = (blogId, userId) => {
    //     // retrieve the current number of likes
    //     const currentBlog = blogs.find(blog => blog._id === blogId)
    //     if (!currentBlog) {
    //         console.error(`Blog with id ${blogId} not found`)
    //         return
    //     }
    //     const currentLikes = currentBlog.likes

    //     // send the current number of likes in the request
    //     const newObject = {
    //         user: userId,
    //         likes: currentLikes + 1
    //     }

    //     blogService.update(blogId, newObject)
    //         .then((updatedBlog) => {
    //             console.log(updatedBlog)
    //             setBlogs(blogs.map(element => element._id !== blogId ? element : updatedBlog))
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }



    return (
        <div>
            <h2>Blogs</h2>
            <hr></hr>

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
