import { combineReducers } from "redux";
import { LocalizationState, localizationReducer } from "../localization/reducer";

export const rootReducer = combineReducers({
    localization: localizationReducer
});

export type RootState = ReturnType<typeof rootReducer>;