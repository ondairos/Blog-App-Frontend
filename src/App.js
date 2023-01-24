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

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // ref the blogsubmitform
  const blogSubmitFormRef = useRef()

  // getAll blogs effect hook
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 500)
    }
  }

  // clear Local storage function
  const clearLocalStorage = () => {
    window.localStorage.clear()
    setUser(null)
    return
  }


  //add blog function
  const addBlog = (blogObject) => {
    // with the usage of useRef i use the toggleVisibility from Togglable component
    blogSubmitFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setErrorMessage(
          `a new blog post: '${returnedBlog.title}' by ${returnedBlog.author} was added!`
        )
        setInterval(() => {
          setErrorMessage(``)
        }, 5000);
      })

  }

  return (
    <div>
      <h2>Blogs</h2>
      <hr></hr>

      <Notification message={errorMessage} />

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

          {/* {blogSubmitForm()} */}

          <Togglable buttonLabel='blog_submit' ref={blogSubmitFormRef}>
            <BlogSubmitForm
              createBlog={addBlog}
            />
          </Togglable>


          <h2>Blog List:</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
      <br></br>
      <hr></hr>
      <Footer />

    </div>
  )
}

export default App
