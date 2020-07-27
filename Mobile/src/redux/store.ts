
import { createStore, Store, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { UnhcrState } from "./rootReducer";
import { rootSaga } from "./rootSaga";

export type UnhcrReduxStore = Store<UnhcrState>

/**
 * Sets up the Redux store with middleware used by the app.
 */
export const initStore = (): UnhcrReduxStore => {
    // Create store and hook it up with redux-saga
    const sagaMiddleware = createSagaMiddleware();
    // const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    return null;
};
