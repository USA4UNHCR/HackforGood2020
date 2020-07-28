import { SupportedLanguage } from "./Localizer";
import { LocalizationActionTypes, UPDATE_LANGUAGE } from "./actions";


export type LocalizationState = {
    language: SupportedLanguage
}

const initialState: LocalizationState = {
    language: SupportedLanguage.English
}

export function localizationReducer(state = initialState, action: LocalizationActionTypes): LocalizationState {
    switch (action.type) {
        case UPDATE_LANGUAGE:
            return {
                language: action.payload
            };
    }
    
    return initialState;
}