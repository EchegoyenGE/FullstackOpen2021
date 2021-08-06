import React from 'react'
import { connect } from 'react-redux'
import { addVoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Anecdote = ({ anecdote, handleClick }) => {

    return (
        <div>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = (props) => {

    const handleVote = anecdote => {
        props.addVoteOf(anecdote)
        props.setNotification(`You voted "${anecdote.content}"`, 5)
    }

    return (
        <div>
            {
                props.anecdotes.map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => handleVote(anecdote)}
                    />
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === '') {
        return { anecdotes: state.anecdotes }
    }
    return { anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())) }
}

const mapDispatchToProps = {
    addVoteOf,
    setNotification
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)( AnecdoteList )
export default ConnectedAnecdoteList