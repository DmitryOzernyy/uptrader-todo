export interface ModalWindowState {
    isVisible: boolean;
    window: number
}

export enum ModalWindowActionTypes {
    MODAL_VISIBLE_ON = 'MODAL_VISIBLE_ON',
    MODAL_VISIBLE_OFF = 'MODAL_VISIBLE_OFF',
    MODAL_INPUT_NAME = 'MODAL_INPUT_NAME',
    MODAL_TYPE_CHANGE = 'MODAL_WINDOW_TYPE_CHANGE'
}

interface ModalWindowOnAction {
    type: ModalWindowActionTypes.MODAL_VISIBLE_ON;
}

interface ModalWindowOffAction {
    type: ModalWindowActionTypes.MODAL_VISIBLE_OFF;
}

interface ModalWindowInputNameActiom {
    type: ModalWindowActionTypes.MODAL_INPUT_NAME;
}

interface ModalWindowTypeChangeAction {
    type: ModalWindowActionTypes.MODAL_TYPE_CHANGE;
    payload: number;
}

export type ModalWindowAction = ModalWindowOnAction |
                                ModalWindowOffAction |
                                ModalWindowInputNameActiom |
                                ModalWindowTypeChangeAction