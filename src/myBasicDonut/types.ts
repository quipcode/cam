export namespace Types {
    export type Data = {
        userName: string,
        activityId: string,
        activityName: string,
        startTime: string,
        endTime: string,
        duration: string,
        dayStart: string;
        dayEnd: string;
    }
    export type  ActivityColor = {
        userName?: string,
        activityName?: string,
        colorHexCode?: string,
    }

    export type Dimensions = {
        width: number
        height: number
        margin: {
            left: number
            right: number
            top: number
            bottom: number
        }
        boundedWidth: number
        boundedHeight: number
    }
}

// export namespace Types {
//     export type Data = {
//         name?: string,
//         value?: number
//     }
//     export type Dimensions = {
//         width: number
//         height: number
//         margin: {
//             left: number
//             right: number
//             top: number
//             bottom: number
//         }
//         boundedWidth: number
//         boundedHeight: number
//     }
// }