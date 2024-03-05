import coneIcon from '../assets/cone.svg';
import Dialog from './Dialog';
import { MaterialSymbol } from 'react-material-symbols';

function ConeStacker() {
    return (
        <Dialog
            trigger={open => (
                <button className="" onClick={open}>
                    <img className="w-[68px] h-[68px]" src={coneIcon} />
                </button>
            )}>{close => (<>
                <button
                    onClick={close}
                    className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 grid w-8 h-8 place-items-center rounded-full bg-gray-400 hover:bg-gray-300'>
                    <MaterialSymbol icon='close' size={20} />
                </button>
                <iframe src="/ConeStacker/index.html" width="720px" height="480px" />
            </>)}</Dialog>
    );
}

export default ConeStacker;
