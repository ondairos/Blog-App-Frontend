import axios from 'axios'
const baseUrl = '/api/users'

// fetch all users from api(server)
// const getAll = async () => {
//     const response = await axios.get(baseUrl)
//     console.log(`users service gives: ${response.data}`)
//     return response.data
// }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => {
        console.log(`inside getAll: ${response.data}`)
        return response.data
    })
}

//fetch one individual id
const getOneIdUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const usersService = { getAll, getOneIdUser }

export default usersService