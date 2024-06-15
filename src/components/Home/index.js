/* import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Welcome to Quiz App</h1>
    <Link to="/quiz-game">
      <button>Start Quiz</button>
    </Link>
  </div>
)

export default Home */

import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div id="home-container">
        <div id="home-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="start quiz game"
            className="home-img"
          />
          <h1 className="home-heading">
            How Many Of These Questions Do You Actually Know?
          </h1>
          <p className="home-description">
            Test yourself with these easy quiz questions and answers
          </p>
          <Link to="/quiz-game">
            <button type="button" className="start-quiz-button">
              Start Quiz
            </button>
          </Link>
          <div className="warning">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              className="warning-icon"
              alt="warning icon"
            />
            <p className="text">
              All the progress will be lost, if you reload during the quiz
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
