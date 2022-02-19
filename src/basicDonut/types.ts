// export namespace Types {
//     export type Data = {
//         userName?: string,
//         date?: number,
//         activityId?: string,
//         activityName?: string,
//         startTime?: number,
//         endTime?: number,
//         duration?:number
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

export namespace Types {
    export type Data = {
        name?: string,
        value?: number
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