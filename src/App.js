import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [newBlog, setNewBlog] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setErrorMessage('Wrong credentials')
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

  // onChange title
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  //onChange author
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  //onChange url
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  //add blog function
  const addBlog = (event) => {
    event.preventDefault()

    const newBlogObject = {
      // title string , author string, url string
      title: title,
      author: author,
      url: url
    }

    blogService.create(newBlogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })
  }

  // loginForm 
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // sumbit Blog Form

  const blogSubmitForm = () => (
    <>
      <p>Add new blog post:</p>
      <form onSubmit={addBlog}>
        <label>Title:</label>
        <input value={title} onChange={handleTitleChange}>
        </input>
        <label>Author:</label>
        <input value={author} onChange={handleAuthorChange}>
        </input>
        <label>Url:</label>
        <input value={url} onChange={handleUrlChange}>
        </input>
        <button type='submit'>Save</button>
      </form>
    </>
  )

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} />

      {user === null ? loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={clearLocalStorage}>Logout</button>

          {blogSubmitForm()}

          <h2>Blog List:</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

      <Footer />

    </div>
  )
}

export default App
