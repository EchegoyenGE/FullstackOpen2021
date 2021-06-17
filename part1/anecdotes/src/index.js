import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Ranking = ({votes, mostVoted}) => {
  return (
    <div>
      <div>
        {anecdotes[mostVoted]}
      </div>
      <br />
      <div>
        Has {votes[mostVoted]} votes
      </div>
    </div>
  )
}

const Anecdote = ({votes, selected}) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
      {
        anecdotes[selected]
      }
      </div>
      <br />
      <div>
        Has {votes[selected]} votes
      </div>
    </div>   
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })
  
  const [mostVoted, setMostVoted] = useState(null)

  const handleRandomChange = () => {
    setSelected(Math.round(Math.random()*(anecdotes.length-1)))
  }

  const handleVote = () => {
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1
    }
    setVotes(newVotes)
    console.log(newVotes)
    getMostVoted(newVotes)
  }

  const getMostVoted = (newVotes) => {
    let max = 0
    let maxVoted = 0
    for (const vote in newVotes) {
      if (newVotes[vote] > max) {
        max = newVotes[vote]
        maxVoted = vote
      }
    }
    setMostVoted(maxVoted)
    console.log(maxVoted)
  }

  return (
    <div>
      <div>
        <Anecdote selected={selected} votes={votes} />
        <br />
        <div>
          <button onClick={handleVote}>Vote</button>
          <button onClick={handleRandomChange}>Next anecdote</button>
        </div>
      </div>
      <br />
      <div>
        <h2>Anecdote with most votes</h2>
        {
          mostVoted == null
            ? <div>There are no votes yet</div>
            : <Ranking mostVoted={mostVoted} votes={votes} />
        }        
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);