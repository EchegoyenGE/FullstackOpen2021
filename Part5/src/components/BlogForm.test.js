import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm />', () => {
    let component
    const createBlog = jest.fn()

    const blogData = {
        author: 'gaston',
        title: 'First blog',
        url: 'www.myspace.com'
    }

    component = render(
        <BlogForm
            createBlog={createBlog}
        />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#blog-form')

    fireEvent.change(author, {
        target: { value: 'gaston' }
    })

    fireEvent.change(title, {
        target: { value: 'First blog' }
    })

    fireEvent.change(url, {
        target: { value: 'www.myspace.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('gaston')
})