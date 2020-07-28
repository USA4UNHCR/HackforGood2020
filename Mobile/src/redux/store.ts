
import { createStore, Store, applyMiddleware } from "redux";
import { rootReducer, RootState } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from "redux-saga";


export type UnhcrReduxStore = Store<RootState>

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['localization']
}

/**
 * Sets up the Redux store with middleware used by the app.
 */
export const initStore = (): UnhcrReduxStore => {
    // Create store and hook it up with redux-saga
    const sagaMiddleware = createSagaMiddleware();
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
    persistStore(store);
    sagaMiddleware.run(rootSaga);

    return store;
};
