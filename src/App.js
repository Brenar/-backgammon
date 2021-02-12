import './App.scss'
import { connect } from 'react-redux'
import Desk from './components/desk'
import { Route, Switch } from 'react-router-dom'

export default function App() {
  return (
    <Switch>
      <Route path="/game">
        <Desk />
      </Route>
    </Switch>
  )
}
