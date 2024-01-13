import FieldButton from "../../components/FieldButton";

function MatchApp() {
    const [isBlueAlliance, setIsBlueAlliance] = useState(false);
    const currentImage = isBlueAlliance ? fieldmapBLUE : fieldmapRED; //use this boolean whenever switching from red/blue is needed
    const [counterNear, setCounterNear] = useState(0);
    const [counterMid, setCounterMid] = useState(0);
    const [counterFar, setCounterFar] = useState(0);
    const [AMP, setAMP] = useState(0);
    const [counterTrap, setCounterTrap] = useState(0);
    const [counterHigh, setCounterHigh] = useState(0);
    const [AMPtoggle, setAMPToggle] = useState(false);
    const AMPtoggleBoo = Boolean; //hopefully this works for amp switch

    const handleToggle = () => {
        setIsBlueAlliance(!isBlueAlliance);
        setAMPToggle(!AMPtoggle);
    };

   
    function addOneNear(){
        setCounterNear(counterNear + 1);
    };
    function addOneMid(){
        setCounterMid(counterMid + 1);
    };
    function addOneFar(){
        setCounterFar(counterFar + 1);
    };
    function addOneAMP(){
        setAMP(AMP + 1);
    }
    function addOneTrap(){
        setCounterTrap(counterTrap + 1);
    }
    function addOneHigh(){
        setCounterHigh(counterHigh + 1);
    }
   

    return (
        <>
            <p>Match Scouting App</p>
            <FieldButton />

            <ToggleButton
                value='check'
                selected={currentImage === fieldmapRED}
                onChange={handleToggle}
                className='font-serif'>
                Toggle Map Color
            </ToggleButton>

            {/* <ToggleButton
                       value='check'
                       selected={AMPtoggleBoo === false}
                       onChange={handleToggle}
                       className='font-serif' >
            toggle amp 

            </ToggleButton> wip ;-;*/}

            {/* <div style={{ backgroundImage: `url(${currentImage})` }}> */}
                <div
                    style={{
                        backgroundImage: `url(${currentImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '40em',
                        width: '40em',
                        objectFit: 'contain',
                        filter: 'brightness(80%)',
                        alignSelf:'center'
                        
                    }}>
                      
                       <button className='bg-orange-500 w-1/3 h-full md:bg-opacity-50 font-semibold  text-white text-6xl font-sans'  onClick={addOneNear} id='one'>{counterNear}</button>
                       <button className='bg-blue-500 w-1/3 h-full md:bg-opacity-50 font-semibold  text-white text-6xl font-sans' onClick={addOneMid} id='one'>{counterMid}</button>
                       <button className='bg-green-500 w-1/3 h-full md:bg-opacity-50 font-semibold  text-white text-6xl font-sans' onClick={addOneFar} id='one'>{counterFar}</button>
                       <button className='px-4 border border-1 rounded-lg border-gray-700 shadow-xl' onClick={addOneAMP} id='one'>{AMP}</button>
                       <button className='px-4 border border-1 rounded-lg border-gray-700 shadow-xl' onClick={addOneTrap}>{counterTrap}</button>
                       <button className='px-4 border border-1 rounded-lg border-gray-700 shadow-xl' onClick={addOneHigh}>{counterHigh}</button>
                      
                    </div>
                    <br />
                < p>hello {isBlueAlliance ? 'world' : 'natalie'}</p>

            
            {/* <img src={currentImage} className='background-image' /> */}
            <p>Alliance: {isBlueAlliance ? 'Blue' : 'Red'}</p>
       
        </>
    );
}



export default MatchApp;
