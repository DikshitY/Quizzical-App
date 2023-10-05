import Quiz from './quiz'
import React from 'react'
import { nanoid } from 'nanoid'

export default function App() {

  const [questions, setQuestions] = React.useState([])
  const [started, setStarted] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
  const [correct, setCorrect] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  React.useEffect(() => {
    async function getQuestions(){
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=19&difficulty=hard&type=multiple")
      const data = await res.json()
      const ques = data.results.map((question) => ({
        id: nanoid(),
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        question: question.question,
        correct: question.correct_answer,
        selected: null,
        checked: false,
      }));
      setQuestions(ques)
    }
      getQuestions()
  },[count])

  function handleCheck(){
    let selected = true
    questions.forEach(question =>{
      if(question.selected === null){
        selected = false
        return
      }
    })
    if(!selected){
      return
    }
    setQuestions(question => questions.map(question => {
      return {...question, checked:true}
    }))
    setChecked(true)
    let correct = 0
    questions.forEach(question =>{
      if (question.correct === question.selected){
        correct += 1
      }
    })
    setCorrect(correct)
  }

  function handleClickAnswer(id, answer){
    setQuestions(questions => questions.map(question => {
      return question.id === id ? {...question, selected: answer} : question
    }))
  }

  function handlePlayAgain(){
    setCount(count => count+1)
    setChecked(false)
  }

  const questionElement = questions.map(question =>{
    return(
      <Quiz
       key={question.id}
       ques={question}
       handleClickAnswer={handleClickAnswer}
       id={question.id}
      />
    )
   })

  function start(){
    setStarted(oldStarted => !oldStarted)
  }

  return (
    <main>
      {
        started ?
        <div className="second-page">
          {questionElement}
          <div className="end-div">
            {checked && <span className='score'>You scored {correct}/5 correct answers</span>}
            <button className='check-btn' onClick={checked ? handlePlayAgain : handleCheck}>{checked ? 'Play Again' : 'Check Answer'}</button>
          </div>
        </div>
         :
        <div className="landing-page">
        <h1 className="landing-page-title">Quizzical</h1>
        <p className="landing-page-description">Click button if you want to start the Quiz !</p>
        <button className="landing-page-btn" onClick={start}>Start Quiz</button>
      </div>
      }
    </main>
  )
}
