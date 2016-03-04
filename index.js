import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import Root from './containers/Root'
import * as auth from './auth'
import { initLeanCloud } from './utils'

require('./static/styles/bootstrap.theme.scss')

if (auth.loggedIn()) {
    initLeanCloud()
}

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Root store={store} history={history}/>,
    document.getElementById('react-container')
)
