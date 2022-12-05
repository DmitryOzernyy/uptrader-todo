import {combineReducers} from "redux";
import { modalWindowReducer } from "./modalWindowReducer";
import { projectReducer } from "./projectReducer";
import { searchReducer } from "./searchReducer";
import { tasksReducer } from "./taskReducer";

export const rootReducer = combineReducers({
    project: projectReducer,
    search: searchReducer,
    modal: modalWindowReducer,
    tasks: tasksReducer
})

export type RootState = ReturnType<typeof rootReducer>;