import React from 'react'
import { nanoid } from 'nanoid'
import he from 'he'

export default function Question(props) {

    const [id, setId] = React.useState(nanoid())

    const [answers, setAnswers] = React.useState({
        id: id,
        correct_answer: he.decode(props.trivia.correct_answer),
        selected_answer: ''
    })

    React.useEffect(() => {
        //for increasing the  count of the number of correct answers
        if (props.showAnswers && answers.selected_answer === answers.correct_answer) {
            props.setNumCorrectAnswers(prevNumCorrectAnswers => prevNumCorrectAnswers + 1)
        }
    }, [props.showAnswers])

    const optionsArr = [...props.trivia.incorrect_answers]
    optionsArr.forEach(option => he.decode(option))

    const [randomIndex, setRandomIndex] = React.useState(Math.floor(Math.random() * (optionsArr.length + 1)))

    console.log(answers)

    function handleChange(e) {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            selected_answer: he.decode(e.target.value)
        }))
    }

    optionsArr.splice(randomIndex, 0, he.decode(props.trivia.correct_answer))



    const optionElements = optionsArr.map(option => {
        let classText = ''
        if (props.showAnswers) {
            if (option === answers.correct_answer) {
                classText = 'correct-answer'
            } else if (option === answers.selected_answer) {
                classText = 'wrong-answer'
            }else{
                classText='not-selected-answer'
            }
        } else {
            if (option === answers.selected_answer) {
                classText = 'selected-answer'
            }
        }

        return (<label key={nanoid()}
            className={classText}>
            <input type='radio'
                value={option}
                name={id}
                onChange={handleChange}
                checked={answers.selected_answer === option}
            />{option}
        </label>)
    })
    return (<div className='trivia' key={id}>
        <p className='question'>{he.decode(props.trivia.question)}</p>
        {optionElements}
    </div>)

}