import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Login from './containers/Login'
import Main from './containers/Main'
import Matches from './containers/Matches'
import Signup from './containers/Signup'
import GlobalStyle from './components/GlobalStyle'
import Nav from './components/Nav'
import PrivateRoute from './components/PrivateRoute'
import Screen from './components/Screen'

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleAuth = () => {
      this.setState({ isAuthenticated: !this.state.isAuthenticated })
    }

    this.updateUser = email => {
      this.setState(() => ({ user: email }))
    }

    this.updateMatches = matches => {
      const newMatches = []

      matches.map(match => {
        const exists = this.state.matches.includes(match)

        if(exists) return null

        return newMatches.push(match)
      })

      this.setState(() => ({
        matches: newMatches
      }))
    }

    this.state = {
      isAuthenticated: false,
      user: '',
      toggleAuth: this.toggleAuth,
      updateUser: this.updateUser,
    }
  }

  render() {
    const { isAuthenticated, user } = this.state

    return (
      <AuthContext.Provider value={this.state}>
        <GlobalStyle />
        <Router>
          <Screen>
            {isAuthenticated ? <Nav /> : null}
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={Signup} />
            <PrivateRoute
              path="/swipe"
              component={() => <Main user={user} />}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/matches"
              component={() => <Matches user={user}/>}
              isAuthenticated={isAuthenticated}
            />
          </Screen>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App
