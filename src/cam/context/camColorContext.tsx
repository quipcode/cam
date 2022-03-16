import * as React from 'react'
import { CamColorContextType, ICamColor } from '../@types/cam'

export const CamColorContext = React.createContext<CamColorContextType | null >(null)


let defaultColors =[
    {
        "userName": "mustafa",
        "momentName": "hygiene",
        "colorHexCode": "#f7d967"
    },
{
"userName": "mustafa",
"momentName": "workout",
"colorHexCode": "#97294c"
},

{
"userName": "mustafa",
"momentName": "pray",
"colorHexCode": "#05afc3"
},

{
"userName": "mustafa",
"momentName": "music",
"colorHexCode": "#c5b7db"
},

{
"userName": "mustafa",
"momentName": "read",
"colorHexCode": "#2c0d9e"
},

{
"userName": "mustafa",
"momentName": "golf",
"colorHexCode": "#66794b"
},

{
"userName": "mustafa",
"momentName": "gap",
"colorHexCode": "#4C4C4C"
}
]

const CamColorProvider: React.FC<React.ReactNode> = ({children}) => {
    const [colors, setcolors] = React.useState<ICamColor[]>(defaultColors)
    const saveColor = (color: ICamColor) => {
        const newCamColor: ICamColor = {
            userName: "mustafa",
            momentName: color.momentName,
            colorHexCode: color.colorHexCode
        }
        setcolors([...colors, newCamColor])
    }

    const updateColor = (incomingColor: ICamColor) => {
        colors.filter((color: ICamColor) => {
            if(color.momentName === incomingColor.momentName){
                color.colorHexCode = incomingColor.colorHexCode
                setcolors([...colors])
            }
        })
    }
    return <CamColorContext.Provider value={{colors, saveColor, updateColor}}>{children}</CamColorContext.Provider>
}
export default CamColorProvider