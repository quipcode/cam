import { Cam, CamColor } from './state';
export enum ActionType {
    AddCam,
    SetColor
}
export interface AddCam {
    type: ActionType.AddCam;
    payload: Cam
}
export interface SetCamColor {
    type: ActionType.SetColor;
    payload: CamColor
}
export type CamActions = AddCam 
export type CamColorActions = SetCamColor