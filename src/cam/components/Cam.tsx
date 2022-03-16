import * as React from 'react'
import {ICam} from '../@types/cam'

type Props = {
    cam: ICam;
    updateCam : (cam: ICam) => void;
}

const Cam: React.FC<Props> = ({cam, updateCam}) => {
    const checkCam: string = cam ? `line-through` : '';
    return (
        <div className='Card'>
            <div className='Card--text'>
                {console.log("Cam")}
                <h1 className={checkCam}>{cam.momentName}</h1>
                <span className={checkCam}>{cam.momentId}</span>
            </div>
            <button onClick={() => updateCam(cam)} className={cam ? `hide-button` : 'Card--button'}>
                Complete
            </button>
        </div>
    )

}
export default Cam