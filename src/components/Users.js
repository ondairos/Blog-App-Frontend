import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
    console.log(`users component: ${users}`)
    //find user blog count
    const userBlogCount = (user) => {
        return user.blogPosts.length
    }
    return (
        <>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>Blogs Created:</td>
                    </tr>

                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link>{user.name}</Link>
                            </td>
                            <td>blog count: {userBlogCount(user)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}


export default Users