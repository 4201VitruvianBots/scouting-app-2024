import MultiButton from '../../components/MultiButton';
//import ToggleButton from '../../components/ToggleButton'
import React, { useEffect, useState } from 'react';
import Checkbox from '../../components/Checkbox';
import { PitFile, teamRoles, drivebase } from 'requests';
import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';
import TeamDropdown from '../../components/TeamDropdown';
import Dialog from '../../components/Dialog';
import SignIn from '../../components/SignIn';
import ConeStacker from '../../components/ConeStacker';
import { usePreventUnload } from '../../lib/usePreventUnload';
import ImageUploader from './components/ImageUploader';
import { useFetchJson } from '../../lib/useFetch';
import { postJson } from '../../lib/postJson';

function PitApp() {
    usePreventUnload();

    const [scoutedTeams, refreshScoutedTeams] = useFetchJson<number[]>(
        '/data/pit/scouted-teams'
    );

    const [sending, setSending] = useState(false);

    const [autoInputValues, setAutoInputValues] = useState(['']);
    const [role, setRole] = useState<teamRoles | undefined>();
    const [drivetrain, setDrivetrain] = useState<drivebase | undefined>();
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [batteryNumber, setBatteryNumber] = useState(Number);
    const [teamNumber, setTeamNumber] = useState(Number);

    const [ampChecked, setAmpChecked] = useState(false);
    const [trapChecked, setTrapChecked] = useState(false);
    const [speakerChecked, setSpeakerChecked] = useState(false);
    const [climbingChecked, setClimbingChecked] = useState(false);
    const [chainTraversalChecked, setChainTraversalChecked] = useState(false);
    const [ampPrefChecked, setAmpPrefChecked] = useState(false);
    const [trapPrefChecked, setTrapPrefChecked] = useState(false);
    const [speakerPrefChecked, setSpeakerPrefChecked] = useState(false);
    const [climbingPrefChecked, setClimbingPrefChecked] = useState(false);

    const [scouterName, setScouterName] = useState('');
    const [robotImage, setRobotImage] = useState('');
    useEffect(() => {
        const timeout = setInterval(refreshScoutedTeams, 60 * 1000);
        return () => clearInterval(timeout);
    }, [refreshScoutedTeams]);

    const handleSubmit = async () => {
        if (sending) return;

        if (!drivetrain || !role) {
            alert('data is missing :(');
            return;
        }

        const data: PitFile = {
            scouterName: 'bcdsh',
            teamNumber,
            capabilities: {
                amp: ampChecked,
                speaker: speakerChecked,
                trap: trapChecked,
                climb: climbingChecked,
                chainTraversal: chainTraversalChecked,
            },
            preference: {
                ampPrefer: ampPrefChecked,
                speakerPerfer: speakerPrefChecked,
                trapPrefer: trapPrefChecked,
                climbPrefer: climbingPrefChecked,
            },
            autoCapability: autoInputValues,
            teamRole: role,
            pitBatteryCount: batteryNumber,
            drivebase: drivetrain,
            photo: robotImage,
            comments: additionalNotes,
        };

        setSending(true);
        try {
            const result = await postJson('/data/pit', data);
            if (!result.ok) throw new Error('Request Did Not Succeed');
            refreshScoutedTeams();
            setAutoInputValues(['']);
            setAmpChecked(false);
            setAmpPrefChecked(false);
            setBatteryNumber(0);
            setAdditionalNotes('');
            setRole(undefined);
            setTeamNumber(0);
            setChainTraversalChecked(false);
            setClimbingChecked(false);
            setClimbingPrefChecked(false);
            setDrivetrain(undefined);
            setTrapChecked(false);
            setTrapPrefChecked(false);
            setSpeakerChecked(false);
            setSpeakerPrefChecked(false);
            setRobotImage('');
        } catch {
            alert('Sending Data Failed');
        }
        setSending(false);
    };

    const inputBattery = {
        width: '150px',
        height: '50px',
    };

    return (
        <>
            <div className='bg-[#171c26]'>
                <div className='mb-7 border border-neutral-900 bg-gray-800'>
                    <br />
                    <h1 className='mb-4 text-center text-3xl font-bold text-[#48c55c]'>
                        Pit App
                    </h1>
                </div>

                <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-2'>
                    <LinkButton link='/' className='snap-none'>
                        <MaterialSymbol
                            icon='home'
                            size={60}
                            fill
                            grade={200}
                            color='green'
                            className='snap-none'
                        />
                    </LinkButton>

                    <Dialog
                        open
                        trigger={open => (
                            <button onClick={open}>
                                <MaterialSymbol
                                    icon='account_circle'
                                    size={60}
                                    fill
                                    grade={200}
                                    className={` ${scouterName ? 'text-green-400' : 'text-gray-400'} snap-none`}
                                />
                            </button>
                        )}>
                        {close => (
                            <SignIn
                                scouterName={scouterName}
                                onChangeScouterName={setScouterName}
                                pitScouting
                                onSubmit={close}
                            />
                        )}
                    </Dialog>
                    <ConeStacker />
                </div>

                <div className='mb-8 flex items-center justify-center'>
                    <div className='flex h-24 w-2/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646]'>
                        <h1 className='text-center text-white'>Team Number</h1>
                        <TeamDropdown
                            onChange={setTeamNumber}
                            value={teamNumber}
                            disabledOptions={scoutedTeams}
                        />
                    </div>
                </div>

                <h1 className='mb-7 text-center text-white '>
                    Capabilities? Choose all that apply.
                </h1>
                <div className='pad mx-auto !flex w-min flex-wrap place-content-center'>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={ampChecked}
                            onChange={setAmpChecked}
                            className='form-checkbox mr-2 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='ampNotes'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Amp Notes
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={speakerChecked}
                            onChange={setSpeakerChecked}
                            className='form-checkbox ml-5 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='speakerNotes'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Speaker Notes
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={trapChecked}
                            onChange={setTrapChecked}
                            className='form-checkbox mr-2 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='trapNotes'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Trap Notes
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={climbingChecked}
                            onChange={setClimbingChecked}
                            className='form-checkbox ml-16 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='climbingCapability'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Climbing Capability
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={chainTraversalChecked}
                            onChange={setChainTraversalChecked}
                            className='form-checkbox ml-20 h-5 w-10 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='underChainTraversal'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Under Chain Traversal
                        </label>
                    </div>
                </div>

                <h1 className='mb-3 mt-8 text-center text-white'>
                    What is their preference? Choose all that apply.
                </h1>
                <div className='pad mx-auto !flex w-min flex-wrap place-content-center'>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={ampPrefChecked}
                            onChange={setAmpPrefChecked}
                            className='form-checkbox h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='ampPreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Amp Preferred?
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={speakerPrefChecked}
                            onChange={setSpeakerPrefChecked}
                            className='form-checkbox ml-7 h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='speakerPreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Speaker Preferred?
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={trapPrefChecked}
                            onChange={setTrapPrefChecked}
                            className='form-checkbox h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='trapPreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Trap Preferred?
                        </label>
                    </div>
                    <div className='mb-4 flex items-center whitespace-nowrap'>
                        <Checkbox
                            checked={climbingPrefChecked}
                            onChange={setClimbingPrefChecked}
                            className='form-checkbox ml-9 h-5 w-5 text-blue-600'
                            boxClassName='h-7 w-7'
                        />
                        <label
                            htmlFor='climbPreferred'
                            className='ml-5 mr-4 cursor-pointer select-none text-white'>
                            Climbing Preferred?
                        </label>
                    </div>
                </div>

                <div className='mb-8 mt-7 flex items-center justify-center'>
                    <div className='flex h-24 w-2/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646] '>
                        <h1 className='text-center text-white'>
                            Number of Batteries?
                        </h1>
                        <input
                            min={0}
                            onChange={event =>
                                setBatteryNumber(parseInt(event.target.value))
                            }
                            value={batteryNumber}
                            style={inputBattery}
                            className='border-1 mx-auto !flex w-min place-content-center rounded-lg border border-gray-700 text-center text-4xl'
                            type='number'
                            placeholder='0'></input>
                    </div>
                </div>

                <div className='ml-1 flex flex-col items-center justify-center'></div>

                <div className='mb-8 flex items-center justify-center'>
                    <div className='flex h-48 w-3/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646] '>
                        <h1 className='mb-3 text-center font-semibold text-white'>
                            Team role?
                        </h1>
                        <div className='grid grid-cols-2 justify-center gap-4'>
                            <MultiButton
                                onChange={setRole}
                                value={role}
                                labels={['Scoring', 'Defense']}
                                values={['scoring', 'defense']}
                                className={[
                                    'mx-auto !flex w-min place-content-center px-8',
                                ]}
                            />
                            <MultiButton
                                onChange={setRole}
                                value={role}
                                labels={['Support', 'All-Round']}
                                values={['support', 'all-round']}
                                className={[
                                    'mx-auto !flex w-min place-content-center px-8',
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className='mb-8 flex items-center justify-center'>
                    <div className='flex h-48 w-3/4 flex-col items-center justify-center rounded-lg border-4 border-[#2f3646] bg-[#2f3646] '>
                        <h1 className='mb-3 text-center font-semibold text-white'>
                            Drivetrain type?
                        </h1>
                        <div className='grid grid-cols-2 justify-center gap-4'>
                            <MultiButton
                                onChange={setDrivetrain}
                                value={drivetrain}
                                labels={['Tank', 'Swerve']}
                                values={['tank', 'swerve']}
                                className={[
                                    'mx-auto !flex w-min place-content-center px-12',
                                ]}
                            />
                            <MultiButton
                                onChange={setDrivetrain}
                                value={drivetrain}
                                labels={['Mecanum', 'Other']}
                                values={['MECANUM', 'other']}
                                className={[
                                    'mx-auto !flex w-min place-content-center px-7',
                                    'mx-auto !flex w-min place-content-center px-10',
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <h1 className='my-2 text-center text-white '>Robot Image</h1>
                <ImageUploader value={robotImage} onChange={setRobotImage} />

                <h1 className='pt-6 text-center text-white'>
                    Additional Notes?
                </h1>
                <input
                    className='border-1 mx-auto mb-3 !flex w-5/6 place-content-center rounded-lg border border-gray-700 text-center text-4xl'
                    onChange={event => setAdditionalNotes(event.target.value)}
                    value={additionalNotes}
                    type='text'></input>

                <button
                    onClick={handleSubmit}
                    className='border-1 pad mx-auto !flex w-min place-content-center rounded-lg border border-gray-700 bg-[#48c55c] px-4 py-4 font-sans text-4xl font-semibold text-black shadow-xl md:bg-opacity-50 '>
                    {sending ? 'Sending...' : 'Submit'}
                </button>
            </div>
        </>
    );
}

export default PitApp;
