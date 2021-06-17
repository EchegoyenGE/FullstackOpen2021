import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {
          (isNaN(value))
            ? 0
            : ((text === 'Average' || text === 'Positive')
                ? value.toFixed(2)
                : value)} {(text === 'Positive' ? '%' : '')
        }
      </td>
    </tr>
  )
} 

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <div>
          <Button text='GOOD' handleClick={handleGood} />
          <Button text='NEUTRAL' handleClick={handleNeutral} />
          <Button text='BAD'  handleClick={handleBad} />
        </div>
        <br />
        <div>
          {
            ((good + neutral + bad) === 0)
              ? <div>No feedback given</div>
              : <div>
                  <h2>Statistics</h2>
                  <table>
                    <tbody>
                        <Statistic text='Good' value={good} />
                        <Statistic text='Neutral' value={neutral} />
                        <Statistic text='Bad' value={bad} />
                        <Statistic text='All' value={good + neutral + bad} />
                        <Statistic text='Average' value={(good - bad) / (good + neutral + bad)} />
                        <Statistic text='Positive' value={(good*100)/(good+neutral+bad)} />
                    </tbody>
                  </table>
                </div>
          }
        </div>
      </div>
    </div>    
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

