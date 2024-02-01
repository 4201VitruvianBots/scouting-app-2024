function Tab({
    onClick,
    title,
    selected,
}: {
    onClick: () => void;
    title: string;
    selected: boolean;
}) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer border-r border-black px-2 py-1 ${selected ? '' : 'text-neutral-500'}`}>
            {title}
        </div>
    );
}

export default Tab;
