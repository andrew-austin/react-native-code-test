
import React from 'react';  
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './app/reducers' 
import AppRoute from './app/app' 
 
import {
  AppRegistry,
} from 'react-native';
// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, 
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({}); 
const App = () => (
  <Provider store={store}>
    <AppRoute />
  </Provider>
) 
 
 AppRegistry.registerComponent('Ombori', () => App);