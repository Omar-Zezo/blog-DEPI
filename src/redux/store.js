import { createStore, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk'
import rootReducers from "./reducers/rootReducer";

const initStat = {}
const midelware = [thunk]

const store = createStore(rootReducers, initStat, applyMiddleware(...midelware))


export default store