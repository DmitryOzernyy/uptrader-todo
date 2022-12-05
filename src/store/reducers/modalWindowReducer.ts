import { ModalWindowState, ModalWindowAction, ModalWindowActionTypes } from "../../types/modalwindow";

const initialState: ModalWindowState = {
    isVisible: false,
}

export const modalWindowReducer = (state = initialState, action: ModalWindowAction) : ModalWindowState=> {
    switch(action.type) {
        case ModalWindowActionTypes.MODAL_VISIBLE_ON: 
            return {isVisible: true};
        case ModalWindowActionTypes.MODAL_VISIBLE_OFF:
            return {isVisible: false};
        default: 
            return state;
    }
}