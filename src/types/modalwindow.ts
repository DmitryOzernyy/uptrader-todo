export interface ModalWindowState {
    isVisible: boolean;
}

export enum ModalWindowActionTypes {
    MODAL_VISIBLE_ON = 'MODAL_VISIBLE_ON',
    MODAL_VISIBLE_OFF = 'MODAL_VISIBLE_OFF',
    MODAL_INPUT_NAME = 'MODAL_INPUT_NAME'
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

export type ModalWindowAction = ModalWindowOnAction | ModalWindowOffAction | ModalWindowInputNameActiom;