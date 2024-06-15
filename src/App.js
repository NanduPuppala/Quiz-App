import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import GameResults from './components/GameResults'
import GameReport from './components/GameReport'
import NotFound from './components/NotFound'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/quiz-game" component={QuizGame} />
      <Route exact path="/game-results" component={GameResults} />
      <Route exact path="/game-report" component={GameReport} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default App

/*
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import QuizApp from './components/QuizApp'
import QuizResults from './components/QuizResults'
import GameReports from './components/GameReports'
import NotFound from './components/NotFound'

const App = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path="/" component={QuizApp} />
        <Route path="/results" component={QuizResults} />
        <Route path="/report" component={GameReports} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default App

*/

/*
import QuizApp from './components/QuizApp'

const App = () => <QuizApp />

export default App
*/
