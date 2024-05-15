import { Dispatch } from 'react';
import { ScouterPosition, StageLocation } from 'requests';

function MultiSelectFieldButton({
    highNotes,
    setHighNotes,
    alliance,
    className,
    scouterPosition,
}: {
    highNotes: Record<StageLocation, boolean>;
    setHighNotes: Dispatch<Record<StageLocation, boolean>>;
    alliance: boolean | undefined;
    className: string | undefined;
    scouterPosition?: ScouterPosition | undefined;
}) {
    return (
        <div
            className={`${alliance ? 'bg-field-blue-super' : 'bg-field-red-super'} ${scouterPosition === 'red_right' ? 'rotate-180' : ''} ${className} p-10`}>
            {alliance ? (
                <>
                    <button
                        onClick={() =>
                            setHighNotes({
                                ...highNotes,
                                source: !highNotes.source,
                            })
                        }
                        className={` ${highNotes.source ? 'bg-green-300' : 'bg-red-300'} absolute left-[22em] top-[12em] h-[5em] w-[5em] rotate-60 rounded-full `}
                    />
                    <button
                        onClick={() =>
                            setHighNotes({
                                ...highNotes,
                                center: !highNotes.center,
                            })
                        }
                        className={` ${highNotes.center ? 'bg-green-300' : 'bg-red-300'} absolute left-[10em] top-[18em] h-[5em] w-[5em] rotate-60 rounded-full `}
                    />

                    <button
                        onClick={() =>
                            setHighNotes({
                                ...highNotes,
                                amp: !highNotes.amp,
                            })
                        }
                        className={` ${highNotes.amp ? 'bg-green-300' : 'bg-red-300'} absolute left-[22em] top-[24em] h-[5.5em] w-[5.5em] rotate-60 rounded-full `}
                    />
                </>
            ) : (
                <>
                    <button
                        onClick={() =>
                            setHighNotes({
                                ...highNotes,
                                source: !highNotes.source,
                            })
                        }
                        className={` ${highNotes.source ? 'bg-green-300' : 'bg-red-300'} absolute left-[14em] top-[11em] h-[5em] w-[5em] rotate-60 rounded-full `}
                    />

                    <button
                        onClick={() =>
                            setHighNotes({
                                ...highNotes,
                                center: !highNotes.center,
                            })
                        }
                        className={` ${highNotes.center ? 'bg-green-300' : 'bg-red-300'} absolute left-[25.5em] top-[17.5em] h-[5em] w-[5em] rotate-60 rounded-full `}
                    />

                    <button
                        onClick={() =>
                            setHighNotes({
                                ...highNotes,
                                amp: !highNotes.amp,
                            })
                        }
                        className={` ${highNotes.amp ? 'bg-green-300' : 'bg-red-300'} absolute left-[14em] top-[24em] h-[5.5em] w-[5.5em] rotate-60 rounded-full `}
                    />
                </>
            )}
        </div>
    );
}

export default MultiSelectFieldButton;

{
    /*

field that switches with sign in state
dropdown that pulls from list (same as foul inputs)
buttons that you can select multiple of (multibuttons)
can set the state to each of the three


*/
}
