import React from 'react'

const Users = ({ users }) => {
    console.log(`users component: ${users}`)
    //find user blog count
    const userBlogCount = (user) => {
        return user.blogs.length
    }
    return (
        <>
            <div>Users</div>
            <div>
                {users.map((singleUser) => {
                    <p>{singleUser.name} blogs: {userBlogCount(singleUser)}</p>
                })}
            </div>
        </>
    )
}


export default Users