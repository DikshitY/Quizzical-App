import React from 'react'
import { nanoid } from 'nanoid'

export default function Quiz(props){

    let answers = props.ques.answers

    function handleClick(answer){
        if(props.ques.checked){
            return
        }
        props.handleClickAnswer(props.id, answer)
    }

    const answerElement = answers.map(answer => {
        let id = null
        if(props.ques.checked){
            if(props.ques.correct === answer){
                id = 'correct'
            }
            else if(props.ques.selected === answer){
                id = 'incorrect'
            } else{
                id = 'not-selected'
            }
        }
        return (
            <button key={nanoid()} id = {id} className={answer === props.ques.selected ? 'answer selected' : 'answer'} onClick = {() => handleClick(answer)}>{answer}</button>
        )
    })

    return (
            <div className="quiz-page">
                <h3 className='question-title'>{props.ques.question}</h3>
                {answerElement}
                <div className="line"></div>
            </div>
    )
}