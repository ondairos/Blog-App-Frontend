import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users = ({ users }) => {
    // console.log(`users component: ${users}`)
    //find user blog count
    const userBlogCount = (user) => {
        return user.blogPosts.length
    }
    return (
        <>
            <h2>Users</h2>
            <Table bordered >
                <tbody>
                    <tr>
                        <td></td>
                        <td>Blogs Created:</td>
                    </tr>

                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>blog count: {userBlogCount(user)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}


export default Users