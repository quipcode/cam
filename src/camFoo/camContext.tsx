import React, {createContext, useReducer, useCallback} from 'react'
import {
    camReducer,
    CamState,
    Cam,
    CamForm,
    Actions,
    ActionsMap    
} from './camReducer'

export type Dispatcher = <
    Type extends Actions["type"],
    Payload extends ActionsMap[Type]
    >(
        type: Type,
        ...payload: Payload extends undefined ? [undefined?] : [Payload]
    ) => void;

type CamContextInterface = readonly [CamState, Dispatcher];

const startingCam: Cam = {
    establishCam(){
        console.log("been cammed")
    },
    data: [
        {
            "activityName": "workout",
            "startTime": "1645450800000",
            "endTime": "1645458000000",
        },
        {
            "activityName": "pray",
            "startTime": "1645450200000",
            "endTime": "1645450800000",
        },
        {
            "activityName": "music",
            "startTime": "1645461600000",
            "endTime": "1645465200000",
        },
        {
            "activityName": "read",
            "startTime": "1645472400000",
            "endTime": "1645486800000",
        },
        {
            "activityName": "golf",
            "startTime": "1645468800000",
            "endTime": "1645472400000",
        },
        {
            "activityName": "hygiene",
            "startTime": "1645448400000",
            "endTime": "1645450200000",
        }
    ]
}

const startingCamForm: CamForm = {
    establishCamForm: function (): void {
        throw new Error('Function not implemented.');
    },
    activityName: '',
    startTime: 0,
    endTime: 0
}

export const CamContext = createContext<CamContextInterface>([
    {cam: startingCam,
    camForm: startingCamForm
    },
    ()=> {}
])

export function CamProvider ({children}: any){
    const [state, _dispatch] = useReducer(camReducer, {
        cam: startingCam,
        camForm: startingCamForm
    })

    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({type, payload: payload[0]}  as Actions)
    }, [])
    return (
        <CamContext.Provider value={[state, dispatch]}>
            {children}
        </CamContext.Provider>
    )
}