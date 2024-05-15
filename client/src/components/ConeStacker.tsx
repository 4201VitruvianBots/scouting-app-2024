import coneIcon from '../assets/cone.svg';
import Dialog from './Dialog';
import { MaterialSymbol } from 'react-material-symbols';

function ConeStacker() {
    return (
        <Dialog
            trigger={open => (
                <button className='' onClick={open}>
                    <img className='h-[60px] w-[60px]' src={coneIcon} />
                </button>
            )}>
            {close => (
                <>
                    <button
                        onClick={close}
                        className='absolute right-0 top-0 grid h-8 w-8 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-gray-400 hover:bg-gray-300'>
                        <MaterialSymbol icon='close' size={20} />
                    </button>
                    <iframe
                        src='/ConeStacker/index.html'
                        width='720px'
                        height='480px'
                    />
                </>
            )}
        </Dialog>
    );
}

export default ConeStacker;
