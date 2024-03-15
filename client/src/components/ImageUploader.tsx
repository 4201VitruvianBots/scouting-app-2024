import { ChangeEventHandler } from "react";
import { MaterialSymbol } from "react-material-symbols";

function ImageUploader({value, onChange}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
        const reader = new FileReader();

        if (!event.target.files) {
            return;
        }

        reader.readAsDataURL(event.target.files[0]);

        reader.onload = () => {
            //Make sure this is string type
            onChange(reader.result as string);
        }
    }

    return (
        <label className="justify-center flex ">
            <input type="file" accept="image/jpeg" onChange={handleChange} className= 'hidden'/>
            
            <div className="max-h-[270px] max-w-[200px] object-contain">
            
            {value ?  <img src={value} /> :  <MaterialSymbol
                        icon='add_a_photo'
                        size={50}
                        fill
                  
                        color='green'
                        className='snap-none'
                    />}

           
               
            </div>
            
        </label>
    );
}
export default ImageUploader;