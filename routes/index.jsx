import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Index from '@/pages/index'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Index} />
      </Switch>
    )
  }

}

let DecoratedApp = App
DecoratedApp = withRouter(DecoratedApp)

export default DecoratedApp
