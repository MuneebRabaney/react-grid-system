import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Promise from 'bluebird'
import axios from 'axios'
import _ from 'lodash'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import Router from './routes/'

const BREAKPOINT_TABLET = process.env.BREAKPOINT_TABLET
const BREAKPOINT_MOBILE = process.env.BREAKPOINT_MOBILE

class App extends Component {

  constructor(props) {
    super(props)
    this.handleWindowResize = _.debounce(this._handleWindowResize.bind(this), 200)
  }

  componentWillMount() {
    this.props.history.listen((location, action) => {
      console.log(location, action)
      window.scrollTo(0, 0)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  _handleWindowResize() {
    const { windowResize } = this.props
    const win = window
    const doc = document
    const docEl = doc.documentElement
    const body = doc.getElementsByTagName('body')[0]

    windowResize({
      width: win.innerWidth || docEl.clientWidth || body.clientWidth,
      height: win.innerHeight || docEl.clientHeight || body.clientHeight,
    })
  }

  render() {
    const { loading } = this.props.state.general
    return loading ? <div>loading...</div> : <Router />
  }

}

function mapStateToProps(state) {
  return {
    state: {
      general: state.general,
    },
  }
}

let DecoratedApp = App
DecoratedApp = connect(mapStateToProps, null)(DecoratedApp)
DecoratedApp = withRouter(DecoratedApp)

export default DecoratedApp
