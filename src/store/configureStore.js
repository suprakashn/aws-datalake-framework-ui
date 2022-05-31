import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import {createBrowserHistory} from 'history';
import asyncAwait from 'redux-async-await';
import createReducer from 'reducers';
import { createLogger } from 'redux-logger';

const env= window.location.host.includes('localhost') ? 'development' : 'production';
const middleware = [thunk];
const theme = window.location.pathname.split('/')[1];
const basename = `/${theme}/`;
const history = createBrowserHistory({basename});

if (env === 'development') {
    middleware.push(
        createLogger({
            collapsed: (getState , action) => true,
        })
    );
  }

const middlewareEnhancer = applyMiddleware(...middleware,asyncAwait);
const enhancers = [middlewareEnhancer];
const composedEnhancers = compose(...enhancers);
const store =  createStore(createReducer(history),composedEnhancers);
export {store,history};

