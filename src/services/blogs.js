import axios from 'axios'
const baseUrl = '/api/blogs'

// setToken for authentication
let token = null
const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// create function for blog service
const create = async newBlogObject => {
    const headerConfiguration = { headers: { Authorization: token }, }
    const response = await axios.post(baseUrl, newBlogObject, headerConfiguration)
    return response.data
}

//put function
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

//delete
const deleteB = async (id) => {
    const headerConfiguration = { headers: { Authorization: token }, }
    const request = await axios.delete(`${baseUrl}/${id}`, headerConfiguration)
    return request.data
}

const exportBlogsService = { getAll, create, update, deleteB, setToken }

export default exportBlogsService