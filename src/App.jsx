import React from 'react'
import Header from './Components/Header.jsx'
import Question from './Components/Question.jsx'
import { nanoid } from 'nanoid'

export default function App() {
  const [start, setStart] = React.useState(false)
  const [triviaArr, setTriviaArr] = React.useState([])
  const [showAnswers, setShowAnswers] = React.useState(false)
  const [numCorrectAnswers,setNumCorrectAnswers] = React.useState(0)
  const [fetchData,setFetchData] =React.useState(1)


  React.useEffect(() => {
    async function getTriviaArr() {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await response.json()
        console.log(data.results)
        setTriviaArr(data.results)
      } catch (e) {
        console.error(e)
      }
    }

    getTriviaArr()
  }, [fetchData])

  const questionElements = triviaArr.map((trivia, index) => <Question key={index} trivia={trivia} showAnswers={showAnswers} setNumCorrectAnswers={setNumCorrectAnswers}/>)

  function handleClick(){
    console.log('button clicked')
    setTriviaArr([])
    setShowAnswers(false)
    setNumCorrectAnswers(0)
    setFetchData(prevFetchData => prevFetchData + 1)
  }

  return (
    <>
      {!start && <Header startQuiz={() => setStart(true)} />}
      {start &&
        <>
          <div className='trivia-container'>
            {questionElements}
          </div>
          {showAnswers &&
          <>
            <p>You scored {numCorrectAnswers}/5 correct answers</p>
            <button className='play-again-btn' onClick={handleClick}>Play again</button>
          </> }
          {!showAnswers && <button className='check-answers-btn' onClick={() => setShowAnswers(true)}>Check answers</button>}
          
        </>}
    </>
  )
}