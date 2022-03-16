import * as React from 'react';
import { CamContextType, ICam } from '../@types/cam';

export const CamContext = React.createContext<CamContextType | null>(null);

let rawData = [
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "2",
        "momentName": "workout",
        "startTime": "1645450800000",
        "endTime": "1645458000000",
        "duration": "7200000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "3",
        "momentName": "pray",
        "startTime": "1645450200000",
        "endTime": "1645450800000",
        "duration": "600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "4",
        "momentName": "music",
        "startTime": "1645461600000",
        "endTime": "1645465200000",
        "duration": "3600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "5",
        "momentName": "read",
        "startTime": "1645472400000",
        "endTime": "1645486800000",
        "duration": "14400000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "6",
        "momentName": "golf",
        "startTime": "1645468800000",
        "endTime": "1645472400000",
        "duration": "3600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "1",
        "momentName": "hygiene",
        "startTime": "1645448400000",
        "endTime": "1645450200000",
        "duration": "1800000"
    }
]

const CamProvider: React.FC<React.ReactNode> = ({children}) => {
    const [cams, setCams] = React.useState<ICam[]>(rawData)

    const saveCam = (cam : ICam) => {
        const newCam: ICam = {
            userName: "mustafa",
            dayStart:  cam.dayStart,
            dayEnd: cam.dayEnd,
            momentId: Math.random().toString(),
            momentName: cam.momentName,
            startTime: cam.startTime,
            endTime: cam.endTime,
            duration: (parseInt(cam.endTime) - parseInt(cam.startTime)).toString()
        }
        setCams([...cams, newCam])
    }

    const updateCam = (incomingCam: ICam) => {
        cams.filter((cam : ICam) => {
            if (cam.momentId === incomingCam.momentId){
                cam.userName = incomingCam.userName;
                cam.dayStart = incomingCam.dayStart,
                cam.dayEnd = incomingCam.dayEnd,
                cam.momentName = incomingCam.momentName,
                cam.startTime = incomingCam.startTime,
                cam.endTime = incomingCam.endTime,
                cam.duration = (parseInt(incomingCam.endTime) - parseInt(incomingCam.startTime)).toString()
                setCams([...cams])
            }
        })
    }

    return <CamContext.Provider value={{cams, saveCam, updateCam}}>{children}</CamContext.Provider>
}

export default CamProvider