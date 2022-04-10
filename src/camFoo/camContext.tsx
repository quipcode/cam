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
    startTime: 1
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