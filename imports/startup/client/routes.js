import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/pages/AppContainer.js';
//import AddPostPage from '../../ui/pages/AddPostPage.js';
import PostPageContainer from '../../ui/pages/PostPageContainer.js';
import NotFoundPage from '../../ui/pages/NotFoundPage.js';
import LoginPage from '../../ui/pages/LoginPage.js';

// redux
import { createStore, combineReducers } from 'redux'
import { reducers } from '../../ui/reducers'
import { newPostClicked } from '../../ui/actions'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)
const history = syncHistoryWithStore(browserHistory, store)

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}/>
        <Route path="/:tag" component={AppContainer}/>
        <Route path="post/:id" component={PostPageContainer} />
    </Router>
  </Provider>
);
