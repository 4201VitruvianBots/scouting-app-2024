import { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

function ArrowComponent({ onClick, onSort }: { onClick: (ascending: boolean) => void, onSort: () => void }) {
    const [isAscending, setIsAscending] = useState(false);
    const [bothArrows, setBothArrows] = useState(true);

    const handleClick = () => {
        setIsAscending(!isAscending);
        setBothArrows(false);
        onClick(isAscending);
    };

    const handleSort = () => {
        setBothArrows(true);
        setIsAscending(true);
        onSort();
    };

    return (
        <div className="h-8 flex items-center" onClick={handleClick}>
            {bothArrows ? (
                <div className="flex flex-col" onClick={handleSort}>
                    <MaterialSymbol icon="expand_less" />
                    <MaterialSymbol icon="expand_more" />
                </div>
            ) : (
                isAscending ? <MaterialSymbol icon="expand_less" /> : <MaterialSymbol icon="expand_more" />
            )}
        </div>
    );
}

export default ArrowComponent;