import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`You created "${content}"`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote"/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)