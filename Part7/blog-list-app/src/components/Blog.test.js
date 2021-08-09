import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    const blog = {
        id: '1',
        title: 'First title',
        author: 'gaston',
        url: 'www.myspace.com',
        likes: 24
    }

    beforeEach(() => {
        component = render(
            <Blog
                key={blog.id}
                blog={blog}
            />
        )
    })

    test('renders', () => {
        expect(component.container.querySelector('.blog')).toBeDefined()
        component.debug()
    })

    test('shows title and author', () => {
        const title = component.container.querySelector('.title-p')
        const author = component.container.querySelector('.author-p')
        const url = component.container.querySelector('.url-p')
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeNull()
    })

    test('after clicked button, url and likes are showed', () => {
        const button = component.container.querySelector('.show-extended')
        fireEvent.click(button)

        const url = component.container.querySelector('.url-p')
        expect(url).toBeDefined()
        expect(url).toHaveTextContent('www.myspace.com')

        const likes = component.container.querySelector('.likes-p')
        expect(likes).toBeDefined()
        expect(likes).toHaveTextContent(24)
    })
})

test('if user press twice likes button, fire twice handleLikesEvent', () => {
    const mockHandler = jest.fn()

    const blog = {
        id: '1',
        title: 'First title',
        author: 'gaston',
        url: 'www.myspace.com',
        likes: 24
    }

    const component = render(
        <Blog
            key={blog.id}
            blog={blog}
            likeBlog={mockHandler}
        />
    )

    const button = component.container.querySelector('.show-extended')
    fireEvent.click(button)

    const likeBtn = component.container.querySelector('.likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)

})
