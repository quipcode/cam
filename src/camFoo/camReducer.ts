export function camReducer(state: CamState, action: Actions): CamState{
    switch(action.type){
     
        case 'setCam':
            // A `Foo` specific method not on Bar
            // action.payload.establishCam();

            return {
                ...state,
                cam: action.payload,
            };
            //struggling to get update to work...seems that typescript doesn't like that there is a camForm coming in as the action and a camData being returned
        case 'updateCam':
            const updatedCam = action.payload; //CamForm
            let actId = updatedCam.activityId;
            const udpatedCamList: CamData[] = state.cam.data.map((cam: CamData) => {
                if (cam.activityId === actId) return updatedCam
                return cam
            })
            const updateCamState = {data: udpatedCamList}
            return {
                ...state,
                cam: updateCamState
                // employees: updatedEmployees,
            };

        case "doubleCam":
            return{
                ...state,
                cam: {
                    ...state.cam,
                    // startTime: state.cam.startTime * 2,
                },
            }
        case "setCamForm":
            // action.payload.establishCamForm();
            return{
                ...state,
                camForm: action.payload,
            }
    }
}
export interface CamData {
    activityId: number
    activityName: string
    startTime: number
    endTime: number
    duration: number,
    dayStart: number;
    dayEnd: number;
}
export interface Cam{
    // establishCam: () => void;
    data : Array<CamData>
}

export interface CamForm{
    // establishCamForm: () => void;
    activityId: number;
    activityName: string;
    startTime: number;
    endTime: number;
}

export type CamState = {
    cam: Cam
    camForm: CamForm
}

export type ActionsMap = {
    updateCam: CamData;
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