export interface CamState {
    cams: Cam[];
    selectCam: Cam | null;
}


export interface Cam {
    userName: string,
    momentId: string,
    momentName: string,
    startTime: string,
    endTime: string,
    duration: string,
    dayStart: string;
    dayEnd: string;
}


export interface CamColor {
    userName: string,
    momentName: string,
    colorHexCode: string,
}

export interface CamColorState {
    colors: CamColor[];
    selectedColor: CamColor | null
}


export const initialCamState: CamState = {
    cams: [],
    selectCam: null
};

export const initialCamColorState: CamColorState = {
    colors: [],
    selectedColor: null
}