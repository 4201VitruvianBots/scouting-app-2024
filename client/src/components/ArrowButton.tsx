import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

interface ArrowComponentRef {
    onOtherClick: () => void;
}

const ArrowComponent = forwardRef<ArrowComponentRef, {
    onClick: (ascending: boolean) => void 
}>(({ onClick }, ref) => {
    const [isAscending, setIsAscending] = useState(false);
    const [bothArrows, setBothArrows] = useState(true);
    
    // Handles when this button is clicked
    const handleOnClick = () => {
        setIsAscending(!isAscending);
        setBothArrows(false);
        onClick(isAscending);
    }
    
    // Handles when another button is clicked
    const onOtherClick = () => {
        setBothArrows(true);
        setIsAscending(false);
    };

    // Expose onOtherClick to the parent component
    useImperativeHandle(ref, () => ({
        onOtherClick
    }));

    useEffect(onOtherClick, [onOtherClick]);
    
    return (
        <div className="h-8 flex items-center" onClick={handleOnClick}>
            {bothArrows ? (
                <div className="flex flex-col">
                    <MaterialSymbol icon="expand_less" />
                    <MaterialSymbol icon="expand_more" />
                </div>
            ) : (
                isAscending ? <MaterialSymbol icon="expand_less" /> : <MaterialSymbol icon="expand_more" />
            )}
        </div>
    );
});

export { ArrowComponent };
export type { ArrowComponentRef };
export default ArrowComponent;