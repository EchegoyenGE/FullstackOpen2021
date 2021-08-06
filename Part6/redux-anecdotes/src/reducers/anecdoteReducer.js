import anecdoteService from '../services/anecdotes'

const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const sortedAnecdotes = state
        .map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
        .sort((a, b) => b.votes - a.votes)
      return sortedAnecdotes
    }
    default:
      return state
  }
}

export const createAnecdote = content => { 
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const addVoteOf = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.vote(content)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    let anecdotes = await anecdoteService.getAll()
    anecdotes = anecdotes.sort((a,b) => b.votes - a.votes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdotesReducer