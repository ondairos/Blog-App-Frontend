/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/render-result-naming-convention */
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'

import Blog from './Blog'
import BlogSubmitForm from './BlogSubmitForm'

const blog = {
    title: 'My blog title',
    author: 'John Smith',
    url: 'test.com',
    likes: 12,
    user: { name: 'test2' }
}

const currentUser = { username: 'John Smith' }

test('default view, can only see title and author', () => {
    const component = render(
        <Blog blog={blog} currentUser={currentUser} />
    )

    const blogTitle = component.container.querySelector('.blogTitle')
    expect(blogTitle).toBeDefined()
    expect(blogTitle).toBeVisible()
    expect(blogTitle).toHaveTextContent(`${blog.title} by: ${blog.author}`)
})

// test('click view button and can see blog detail', () => {
//     const component = render(
//         <Blog blog={blog} currentUser={currentUser} />
//     )

//     // i have Component Togglable here
//     const buttonView = component.getByText('view')
//     fireEvent.click(buttonView)

//     const blogAll = component.container.querySelector('.blogAll')
//     expect(blogAll).toBeVisible()
//     expect(blogAll).toHaveTextContent(`${blog.url}`)
//     expect(blogAll).toHaveTextContent(`${blog.likes}`)
// })

test('click like button twice and likes will plus two', () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={mockHandler} currentUser={currentUser} />
    )

    // i have Component Togglable here
    // const buttonView = component.getByText('view')
    // fireEvent.click(buttonView)

    // const blogAll = component.container.querySelector('.blogAll')
    // expect(blogAll).toBeVisible()

    const buttonLike = component.getByText('Like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('create a new blog', () => {
    const component = render(
        <BlogSubmitForm />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
})
