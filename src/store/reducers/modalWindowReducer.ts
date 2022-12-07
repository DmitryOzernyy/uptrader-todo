import { ModalWindowState, ModalWindowAction, ModalWindowActionTypes } from "../../types/modalwindow";

const initialState: ModalWindowState = {
    isVisible: false,
    window: 0
}

export const modalWindowReducer = (state = initialState, action: ModalWindowAction) : ModalWindowState=> {
    switch(action.type) {
        case ModalWindowActionTypes.MODAL_VISIBLE_ON: 
            return {...state, isVisible: true};
        case ModalWindowActionTypes.MODAL_VISIBLE_OFF:
            return {...state, isVisible: false};
        case ModalWindowActionTypes.MODAL_TYPE_CHANGE:
            return {...state, window: action.payload}
        default: 
            return state;
    }
}