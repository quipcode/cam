export interface ICam {
    userName: string,
    momentId: string,
    momentName: string,
    startTime: string,
    endTime: string,
    duration: string,
    dayStart: string;
    dayEnd: string;
}

export type CamContextType = {
    cams: ICam[];
    saveCam: (cam: ICam) => void;
    updateCam: (cam: ICam) => void;
}