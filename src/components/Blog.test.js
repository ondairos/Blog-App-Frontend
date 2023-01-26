import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('component renders title', () => {
    const blog = {
        title: 'My blog title',
        author: 'John Smith',
        url: 'test.com',
        likes: 12
    }

    // render outside the DOM for tests
    render(<Blog blog={blog} />)

    const element = screen.getByText('My blog title')

    expect(element).toBeDefined()
})