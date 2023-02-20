import axios from 'axios'
import userService from './user'
const baseUrl = '/api/blogs'


//added config for authorization token
const config = () => {
    return {
        headers: {
            Authorization: `bearer ${userService.getToken()}`
        }
    }
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// create function for blog service
const create = async newBlogObject => {
    const response = await axios.post(baseUrl, newBlogObject, config())
    return response.data
}

//put function
// const update = (newObject) => {
//     // console.log(newObject)
//     const updatedNewBlogPost = { ...newObject, likes: newObject.likes + 1 }
//     const request = axios.put(`${baseUrl}/${newObject._id}`, updatedNewBlogPost)
//     return request.then(response => response.data)
// }

const update = async (id, newObject) => {
    const response = await axios.put(
        `${baseUrl}/${id}`, newObject)
    return response.data
}

//add comment no authorization
const addComment = (id, newObject) => {
    const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
    return request.then((response) => response.data)
}

//delete
const deleteB = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`, config())
    return request.data
}

const exportBlogsService = { getAll, create, update, deleteB, addComment }

export default exportBlogsService