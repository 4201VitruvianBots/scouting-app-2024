import { MaterialSymbol } from 'react-material-symbols';

function RobotPhotoDialog({
    teamNumber,
    onClose,
}: {
    teamNumber: number;
    onClose?: () => void;
}) {

    return (
        <>
            <div className='flex justify-end space-x-2'>
                <img src={`/image/${teamNumber}.jpeg`} style={{height: "90vh"}} />
                <button
                    onClick={onClose}
                    className='grid aspect-square h-3/4 rounded-full hover:bg-gray-500/50'>
                    <MaterialSymbol icon='close' />
                </button>
            </div>
        </>
    );
}

export default RobotPhotoDialog;