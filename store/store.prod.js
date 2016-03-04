import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import reducer from '../reducers'

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const store = createStore(reducer, {}, applyMiddleware(thunk, reduxRouterMiddleware));

export default store
