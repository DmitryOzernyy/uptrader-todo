import { ModalWindowAction, ModalWindowActionTypes, ModalWindowState } from "../../types/modalwindow"

export const ModalWindowActionVisible = (vis: boolean): ModalWindowAction =>{
    return {type: vis ? ModalWindowActionTypes.MODAL_VISIBLE_ON : ModalWindowActionTypes.MODAL_VISIBLE_OFF};
}

export const ModalWindowChangeTypeAction = (window: number): ModalWindowAction => {
    return {type: ModalWindowActionTypes.MODAL_TYPE_CHANGE, payload: window};
}
