import { ChangeEventHandler } from "react";

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
        <label>
            <input type="file" accept="image/jpeg" onChange={handleChange} />
            <img src={value} />
        </label>
    );
}
export default ImageUploader;