import { SearchActionTypes } from "../../types/search"


export const SearchInputAction = (searchInput: string) =>{
    return {type: SearchActionTypes.SEARCH_INPUT, payload: searchInput};
}