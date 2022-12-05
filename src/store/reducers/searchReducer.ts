import { SearchAction, SearchActionTypes, SearchState } from "../../types/search"

const initialState: SearchState = {
    search: ""
}

export const searchReducer = (state = initialState, action: SearchAction): SearchState => {
    switch(action.type) {
        case SearchActionTypes.SEARCH_INPUT:
            return {search: action.payload};
        case SearchActionTypes.SEARCH_CLEAR:
            return {search: ""};
        default:
            return state;
    }
}