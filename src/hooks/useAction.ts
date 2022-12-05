import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as SearchInputAction from "../store/action-creators/search";
import * as ModalWindowAction from "../store/action-creators/modalWindow";
import * as ProjectCreateAction  from "../store/action-creators/project";
import * as TaskAction from "../store/action-creators/task";
// import * as UserActionCreators from '../store/action-creators/user';

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators({
        ...SearchInputAction,
        ...ModalWindowAction,
        ...ProjectCreateAction,
        ...TaskAction
    }, dispatch);
}

