import { SupportedLanguage } from "./Localizer";

export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";

interface UpdateLanguageAction {
    type: typeof UPDATE_LANGUAGE,
    payload: SupportedLanguage
}

export function updateLanguage(language: SupportedLanguage): LocalizationActionTypes {
    return {
        type: UPDATE_LANGUAGE,
        payload: language
    }
}

export type LocalizationActionTypes = UpdateLanguageAction;