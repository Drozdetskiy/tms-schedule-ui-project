import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './reducers/root'
import { rootSaga } from './sagas/root'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
    process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        sagaMiddleware,
    ),
))

sagaMiddleware.run(rootSaga)
