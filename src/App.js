import React from 'react'
import SignupScreen from './screens/Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SigninScreen from './screens/Signin'
import HomeScreen from './screens/Home'
import ProtectedRoute from './HOC/PrivateRoute'
import Dashboard from './screens/Dashboard'

const App = () => {


  return (
    <Router>
      <div className="container ">
        <main className="">
          <Route exact path="/" component={HomeScreen} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignupScreen} />
          <Route path="/signin" component={SigninScreen} />
        </main>
      </div>
    </Router>
  )
}

export default App
