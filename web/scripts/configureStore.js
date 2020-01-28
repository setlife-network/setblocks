import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../ducks'
import rootSaga from '../sagas';

export default function configureStore(isProduction) {
    let store

    if (isProduction) {
        store = createStore(
            rootReducer,
            applyMiddleware(thunk)
        )
    } else {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        const sagaMiddleware = createSagaMiddleware();
        
        store = createStore(
            rootReducer,
            composeEnhancers(
                applyMiddleware(thunk, sagaMiddleware)
            )
        )
        sagaMiddleware.run(rootSaga);

        if (module.hot) {
            module.hot.accept('../ducks', () => {
                const nextRootReducer = require('../ducks').default
                store.replaceReducer(nextRootReducer)
            })
        }
    }

    return store
}