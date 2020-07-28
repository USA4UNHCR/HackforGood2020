import { StringId } from "./stringIds";
import { englishDictionary } from "./englishStrings";
import { espanolDictionary } from "./espanolStrings";

export enum SupportedLanguage {
    English = "English",
    Espanol = "Español"
}

export type StringIdDictionary = Readonly<{
    [id in StringId]: string;
}>;

export type LanguageStringDictionary = Readonly<{
    [language in SupportedLanguage]: StringIdDictionary;
}>;

export const languageStringDictionary: LanguageStringDictionary = {
    [SupportedLanguage.English]: englishDictionary,
    [SupportedLanguage.Espanol]: espanolDictionary
}

export const Localizer = Object.freeze({
    getString: (language: SupportedLanguage, id: StringId) => {
        return languageStringDictionary[language][id];
    }
});
