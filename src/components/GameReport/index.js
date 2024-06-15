import React from 'react'
import {useLocation} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameReport = () => {
  const location = useLocation()
  const {questions, selectedOptions} = location.state || {
    questions: [],
    selectedOptions: [],
  }

  const totalQuestions = questions.length
  const answeredQuestions = selectedOptions.filter(Boolean).length
  const unattemptedQuestions = totalQuestions - answeredQuestions
  const correctAnswers = selectedOptions.filter(
    (option, index) => option && option.is_correct === 'true',
  ).length
  const wrongAnswers = answeredQuestions - correctAnswers

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="card-container">
          <div className="report">
            <div className="score-container">
              <p className="sco">
                {answeredQuestions}/{totalQuestions}
              </p>
            </div>
            <div>
              <div className="container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="image"
                />
                <p>{correctAnswers} Correct answers</p>
              </div>
              <div className="container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt=" incorrect answer icon"
                  className="image"
                />
                <p>{wrongAnswers} Incorrect answers</p>
              </div>
              <div className="container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png "
                  alt="unattempted icon"
                  className="image"
                />
                <p>{unattemptedQuestions} Unattempted answers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameReport
