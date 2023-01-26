/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from "./Togglable";
import BlogSubmitForm from "./BlogSubmitForm";

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

describe('<Togglable />', () => {
    let container

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show...">
                <div className="showDiv" >
                    togglable content
                </div>
            </Togglable>
        ).container
    })

    test('renders its children', async () => {
        await screen.findAllByText('togglable content')
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

})

describe('BlogSubmitForm Tests', () => {

    test('BlogSubmitForm updates parent state and calls onSubmit', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogSubmitForm createBlog={createBlog} />)

        const input = screen.getByLabelText('Title:')
        const sendButton = screen.getByText('Save')

        await user.type(input, 'testing a form...')
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    })
})
