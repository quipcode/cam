import * as React from 'react';
import { CamContext } from '../context/camContext';
import { CamContextType, ICam } from '../@types/cam';

const AddCam: React.FC = () => {
    const {saveCam} = React.useContext(CamContext) as CamContextType
    const [formData, setFormData] = React.useState<ICam | {}>();
    const handleForm = (e : React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id] : e.currentTarget.value,
        })
    }
    const handleSaveCam = (e: React.FormEvent, formData: ICam | any) => {
        e.preventDefault()
        saveCam(formData)
    }

    return (
        <form className="Form" onSubmit={(e) => handleSaveCam(e, formData)}>
            <div>
                <div>
                    <label htmlFor="name">Title</label>
                    <input onChange={handleForm} type="text" id="momentName" />
                </div>
                {/* <div>
                    <label htmlFor="description">Description</label>
                    <input onChange={handleForm} type="text" id="description" />
                </div> */}
            </div>
            <button disabled={formData === undefined ? true : false}>Add Todo</button>
        </form>
    );
}

export default AddCam