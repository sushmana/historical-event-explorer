import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import rootSaga from "../saga/rootSaga";
import createSagaMiddleware from 'redux-saga'
import historicalReducer from "../slice/historicalSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
      historicalReducer,
})

const store = configureStore({
      reducer: reducer,
      middleware:()=>[sagaMiddleware]
})

sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({type});
export default store;