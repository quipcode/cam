import { useCallback, useContext } from "react";
import { Cam, CamForm, CamData } from './camReducer'
import { CamContext } from "./camContext";

export function useCam(){
    // const [cam, setCam] = useContext(CamContext);
    // setCam({
    //     cam: {},
    //     camForm: {},
    // })

    const [{cam, camForm} , dispatch] = useContext(CamContext);
    const setCam = useCallback((cam: Cam) => dispatch('setCam', cam), []);
    const doubleCam = useCallback(() => dispatch('doubleCam'), [])
    const setCamForm = useCallback((camForm: CamData) => {
        dispatch('setCamForm', camForm)
        const updatedCam = camForm
        let actId = updatedCam.activityId;
        const udpatedCamList: CamData[] = cam.data.map((cam: CamData) => {
            if (cam.activityId == actId) return updatedCam
            return cam
        })
        const updateCamState = { data: udpatedCamList }
        
        dispatch('setCam', updateCamState)
        console.log("updatedcamState", updateCamState, "camform", camForm)
    }, [])
    return{
        cam,
        camForm,
        setCam,
        doubleCam,
        setCamForm
    }
}