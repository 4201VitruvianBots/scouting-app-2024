import coneIcon from '../assets/cone.svg';
import Dialog from './Dialog';
import { MaterialSymbol } from 'react-material-symbols';

function ConeStacker() {
    return (
        <Dialog
            trigger={open => (
                <button onClick={open}>
                    <img className="w-[60px] h-[60px]" src={coneIcon}/>
                </button>
            )}>{close => (<>
                <button
                    onClick={close}
                    className='absolute top-0 right-0 translate-x-1/2 
                    -translate-y-1/2 grid w-8 h-8 place-items-center 
                    rounded-full bg-[#dee4f5] hover:bg-[#dee4f5]'>
                    <MaterialSymbol icon='close' size={30} />
                </button>
                <iframe src="/ConeStacker/index.html" width="720px" height="480px" />
            </>)}</Dialog>
    );
}

export default ConeStacker;
