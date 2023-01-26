import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('component renders titlerino', () => {
    const blog = {
        title: 'My blog title',
        author: 'John Smith',
        url: 'test.com',
        likes: 12,
        user: { name: 'test2' }
    }
    const currentUser = { username: 'John Smith' }

    // render outside the DOM for tests
    render(<Blog blog={blog} currentUser={currentUser} />)
    // const { container } = render(<Blog blog={blog} />)
    // const div = container.querySelector('.main_blog')
    const element = screen.getByText('My blog title')

    expect(element).toBeDefined()

    // expect(div).toHaveTextContent(
    //     'My blog title'
    // )
})

// test('clicking the button calls event handler once', async () => {
//     const blog = {
//         title: 'My blog title',
//         author: 'John Smith',
//         url: 'test.com',
//         likes: 12,
//         user: { name: 'test2' }
//     }

//     const currentUser = { username: "Jack Lock" }

//     // The event handler is a mock function defined with Jest:
//     const mockHandler = jest.fn()

//     render(<Blog blog={blog} currentUser={currentUser} addLikes={mockHandler} />)

//     // A session is started to interact with the rendered component:
//     const user = userEvent.setup()

//     // The test finds the button based on the text from the rendered component and clicks the element
//     const button = screen.getByText('Like')
//     await user.click(button)

//     expect(mockHandler.mock.calls).toHaveLength(1)

// })

