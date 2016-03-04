import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import reducer from '../reducers'
import DevTools from '../containers/DevTools'

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const store = createStore(reducer, {}, compose(
    applyMiddleware(thunk, reduxRouterMiddleware, createLogger()),
    DevTools.instrument()
));

// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
if (module.hot) {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
}

export default store
