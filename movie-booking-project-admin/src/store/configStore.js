import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import * as reducers from './reducers'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    ...reducers
})

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)