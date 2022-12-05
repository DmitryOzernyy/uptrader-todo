export interface SearchState {
    search: string
}

export enum SearchActionTypes {
    SEARCH_INPUT = 'SEARCH_INPUT',
    SEARCH_CLEAR = 'SEARCH_CLEAR'
}

interface SearchInputAction {
    type: SearchActionTypes.SEARCH_INPUT;
    payload: string
}

interface SearchClearAction {
    type: SearchActionTypes.SEARCH_CLEAR;
}

export type SearchAction = SearchInputAction | SearchClearAction;