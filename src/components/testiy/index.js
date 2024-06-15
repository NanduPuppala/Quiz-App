import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import axios from 'axios'

class QuizGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      timer: 15,
      selectedOption: null,
      isFetching: true,
      error: '',
    }
    this.timerId = null
  }

  componentDidMount() {
    this.fetchQuestions()
  }

  fetchQuestions = async () => {
    try {
      const response = await axios.get('https://apis.ccbp.in/assess/questions')
      this.setState(
        {questions: response.data, isFetching: false},
        this.startTimer,
      )
    } catch (error) {
      this.setState({error: 'Failed to fetch questions', isFetching: false})
    }
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timer === 0) {
          clearInterval(this.timerId)
          this.goToNextQuestion()
        }
        return {timer: prevState.timer - 1}
      })
    }, 1000)
  }

  goToNextQuestion = () => {
    const {currentQuestionIndex, questions} = this.state
    if (currentQuestionIndex < questions.length - 1) {
      this.setState(
        {
          currentQuestionIndex: currentQuestionIndex + 1,
          timer: 15,
          selectedOption: null,
        },
        this.startTimer,
      )
    } else {
      this.props.history.push('/game-results')
    }
  }

  handleOptionSelect = option => {
    clearInterval(this.timerId)
    this.setState({selectedOption: option})
  }

  handleNextQuestion = () => {
    this.goToNextQuestion()
  }

  render() {
    const {
      questions,
      currentQuestionIndex,
      timer,
      selectedOption,
      isFetching,
      error,
    } = this.state
    if (isFetching) {
      return <div data-testid="loader">Loading...</div>
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <button onClick={this.fetchQuestions}>Retry</button>
        </div>
      )
    }
    const currentQuestion = questions[currentQuestionIndex]
    return (
      <div>
        <p>{currentQuestion.question}</p>
        <p>Time left: {timer} seconds</p>
        <ul>
          {currentQuestion.options.map(option => (
            <li key={option.id}>
              <button onClick={() => this.handleOptionSelect(option)}>
                {option.text}
              </button>
            </li>
          ))}
        </ul>
        {selectedOption && (
          <button onClick={this.handleNextQuestion}>Next Question</button>
        )}
      </div>
    )
  }
}

export default QuizGame
