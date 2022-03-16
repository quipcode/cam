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

export interface ICamColor {
    userName: string,
    momentName: string,
    colorHexCode: string,
}

export type CamColorContextType = {
    colors: ICamColor[];
    saveColor: (color: ICamColor) => void;
    updateColor: (color: ICamColor) => void;
}

export type CamContextType = {
    cams: ICam[];
    saveCam: (cam: ICam) => void;
    updateCam: (cam: ICam) => void;
}