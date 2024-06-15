import React from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'

class QuizGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      selectedOptions: [],
      isQuizCompleted: false,
      score: 0,
      timer: 15,
      isFetching: true,
      isError: false,
    }
  }

  componentDidMount() {
    this.fetchQuestions()
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  fetchQuestions = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch('https://apis.ccbp.in/assess/questions', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        this.setState({questions: data.questions, isFetching: false})
      })
      .catch(error => {
        console.log('Error while fetching questions:', error)
        this.setState({isError: true, isFetching: false})
      })
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(
        prevState => ({
          timer: prevState.timer - 1,
        }),
        () => {
          if (this.state.timer === 0) {
            this.handleTimeout()
          }
        },
      )
    }, 1000)
  }

  handleTimeout = () => {
    const {currentQuestionIndex, questions} = this.state
    if (currentQuestionIndex < questions.length - 1) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        timer: 15,
      }))
    } else {
      this.calculateScore()
    }
  }

  handleOptionClick = optionId => {
    const {currentQuestionIndex, selectedOptions} = this.state
    const currentQuestion = this.getCurrentQuestion()
    const selectedOption = currentQuestion.options.find(
      option => option.id === optionId,
    )

    if (selectedOptions[currentQuestionIndex]) return

    const updatedSelectedOptions = [...selectedOptions]
    updatedSelectedOptions[currentQuestionIndex] = selectedOption

    this.setState({selectedOptions: updatedSelectedOptions})
  }

  calculateScore = () => {
    const {questions, selectedOptions} = this.state
    const score = selectedOptions.filter(
      (option, index) => option && option.is_correct === 'true',
    ).length

    this.setState({score, isQuizCompleted: true})
  }

  getCurrentQuestion = () => {
    const {questions, currentQuestionIndex} = this.state
    return questions[currentQuestionIndex]
  }

  handleRetry = () => {
    this.setState(
      {
        currentQuestionIndex: 0,
        selectedOptions: [],
        isQuizCompleted: false,
        score: 0,
        timer: 15,
      },
      () => {
        this.startTimer()
      },
    )
  }

  handleNextQuestion = () => {
    const {currentQuestionIndex, questions} = this.state
    if (currentQuestionIndex < questions.length - 1) {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          timer: 15,
        }),
        () => {
          clearInterval(this.timerId)
          this.startTimer()
        },
      )
    } else {
      this.calculateScore()
    }
  }

  handleSubmit = () => {
    const {score, questions, selectedOptions} = this.state
    this.props.history.push({
      pathname: '/game-results',
      state: {score, questions, selectedOptions},
    })
  }

  renderQuizQuestions = () => {
    const {currentQuestionIndex, selectedOptions, timer} = this.state
    const currentQuestion = this.getCurrentQuestion()

    return (
      <>
        <Header />
        <div className="main-container">
          <div className="qun-container">
            <div className="sub-container">
              <p className="question-count">
                Question <br />
                <span id="timex">{currentQuestionIndex + 1}/10</span>
              </p>
              <p className="timer">{timer} </p>
            </div>
            <div className="qunWtAns">
              <p className="question">{currentQuestion.question_text}</p>
              <ul className="optionList">
                {currentQuestion.options.map(option => (
                  <li
                    className="list-item"
                    key={option.id}
                    onClick={() => this.handleOptionClick(option.id)}
                    style={{
                      backgroundColor:
                        selectedOptions[currentQuestionIndex] &&
                        selectedOptions[currentQuestionIndex].id === option.id
                          ? option.is_correct === 'true'
                            ? '#1c944b'
                            : '#bf2626'
                          : '',
                      color:
                        selectedOptions[currentQuestionIndex] &&
                        selectedOptions[currentQuestionIndex].id === option.id
                          ? option.is_correct === 'true'
                            ? '#ffffff'
                            : '#000000'
                          : '',
                    }}
                  >
                    {option.text}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="next-btn"
              onClick={this.handleNextQuestion}
              disabled={!selectedOptions[currentQuestionIndex]}
            >
              {currentQuestionIndex === this.state.questions.length - 1
                ? 'Submit'
                : 'Next Question'}
            </button>
          </div>
        </div>
      </>
    )
  }

  renderQuizResult = () => {
    const {score, questions} = this.state
    const totalQuestions = questions.length
    const percentageScore = (score / totalQuestions) * 100

    return (
      <div className="main-container">
        <div className="result-container">
          <h2 className="head">Quiz Completed</h2>
          <p>Your score: {percentageScore}%</p>
          <div>
            <button onClick={this.handleRetry} className="btn">
              Retry
            </button>
            <button onClick={this.handleSubmit} className="btn">
              View Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {questions, isQuizCompleted, isFetching, isError} = this.state

    if (isFetching)
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#263868" height={50} width={50} />
        </div>
      )
    if (isError)
      return (
        <div>
          Error loading questions.{' '}
          <button onClick={this.fetchQuestions}>Retry</button>
        </div>
      )

    return (
      <div>
        {questions.length > 0 && !isQuizCompleted
          ? this.renderQuizQuestions()
          : this.renderQuizResult()}
      </div>
    )
  }
}

export default QuizGame
