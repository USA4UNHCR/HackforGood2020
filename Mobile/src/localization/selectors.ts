import { LocalizationState } from "./reducer";
import { RootState } from "../redux/rootReducer";

export const getLanguage = (state: RootState) => state.localization.language;
