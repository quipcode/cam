import { useCallback, useContext } from "react";
import { Cam, CamForm } from './camReducer'
import { CamContext } from "./camContext";

export function useCam(){
    const [{cam, camForm} , dispatch] = useContext(CamContext);
    const setCam = useCallback((cam: Cam) => dispatch('setCam', cam), []);
    const doubleCam = useCallback(() => dispatch('doubleCam'), [])
    const setCamForm = useCallback((camForm: CamForm) => dispatch('setCamForm', camForm), [])
    return{
        cam,
        camForm,
        setCam,
        doubleCam,
        setCamForm
    }
}