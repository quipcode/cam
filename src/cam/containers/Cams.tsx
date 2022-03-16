import * as React from 'react'
import { CamContextType, ICam } from '../@types/cam'
import { CamContext } from '../context/camContext'
import Cam from '../components/Cam'

const Cams = () => {
    const {cams, updateCam} = React.useContext(CamContext) as CamContextType;
    return (
        <>
            
            {cams.map((cam: ICam) => {
                
                return (<Cam key={cam.momentId} updateCam={updateCam} cam={cam} />)
                
            })}
        </>
    )
}

export default Cams