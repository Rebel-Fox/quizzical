import React from 'react'

export default function Header(props){
    return(
        <header>
            <h1 className='title'>Quizzical</h1>
            <p className='sub-title'>The Quiz App</p>
            <button className='start-quiz-btn' onClick={props.startQuiz}>Start quiz</button>
        </header>
    )
}