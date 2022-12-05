import { ModalWindowAction, ModalWindowActionTypes, ModalWindowState } from "../../types/modalwindow"

export const ModalWindowActionVisible = (vis: boolean): ModalWindowAction =>{
    return {type: vis ? ModalWindowActionTypes.MODAL_VISIBLE_ON : ModalWindowActionTypes.MODAL_VISIBLE_OFF};
}

