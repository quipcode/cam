import { useCallback, useContext } from "react";
import {Cam} from './camReducer'
import { CamContext } from "./camContext";

export function useCam(){
    const [{cam} , dispatch] = useContext(CamContext);
    const setCam = useCallback((cam: Cam) => dispatch('setCam', cam), []);
    const doubleCam = useCallback(() => dispatch('doubleCam'), [])
    return{
        cam,
        setCam,
        doubleCam
    }
}