export function camReducer(state: CamState, action: Actions): CamState{
    switch(action.type){
     
        case 'setCam':
            // A `Foo` specific method not on Bar
            action.payload.establishCam();

            return {
                ...state,
                cam: action.payload,
            };            
        case "doubleCam":
            return{
                ...state,
                cam: {
                    ...state.cam,
                    startTime: state.cam.startTime * 2,
                },
            }
        case "setCamForm":
            action.payload.establishCamForm();
            return{
                ...state,
                camForm: action.payload,
            }
    }
}

export interface Cam{
    establishCam: () => void;
    startTime: number;
}

export interface CamForm{
    establishCamForm: () => void;
    activityName: string;
    startTime: number;
    endTime: number;
}

export type CamState = {
    cam: Cam
    camForm: CamForm
}

export type ActionsMap = {
    setCam: Cam;
    doubleCam: undefined;
    setCamForm: CamForm
}

export type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key;
        payload: ActionsMap[Key]
    }
}[keyof ActionsMap]