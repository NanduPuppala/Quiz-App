import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const GameResults = () => {
  const history = useHistory()
  const location = useLocation()
  const {score, questions, selectedOptions} = location.state || {}

  const handleGameReportClick = () => {
    history.push('/game-report', {questions, selectedOptions})
  }

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="report-container">
          {score >= 6 ? (
            <div className="winning-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
                alt="won"
                className="won-img"
              />
              <h1 className="wishes">Congrats</h1>
              <h1 className="score">{score * 10}% Correctly Answered</h1>
              <p className="msg">Quiz completed successfully</p>
              <p className="info">
                You attempted {score} out of 10 questions as correct
              </p>
              <button onClick={handleGameReportClick} className="report-btn">
                Report
              </button>
            </div>
          ) : (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
                alt="lose"
                className="lose-img"
              />
              <p className="wishes">You lose</p>
              <h1 className="score">{score * 10}% Correctly Answered</h1>
              <p className="info">
                You attempted {score} out of 10 questions as correct
              </p>
              <button onClick={handleGameReportClick} className="report-btn">
                Report
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GameResults
