import { useState } from 'react';

function Bleh() {
    const [funniheheh, setFunniheheh] = useState(0);
    const videoUrl = [
        'https://youtu.be/o-YBDTqX_ZU',
        'https://www.youtube.com/watch?v=GHMjD0Lp5DY',
    ][funniheheh];
    const handleClick = () => setFunniheheh(Math.floor(2 * Math.random()));
    return (
        <div>
            <p className='uppercase text-red-700 underline'>
                nomnomnom, <br /> once upon a time there was a rat. that rat
                wanted to be a chef. so he tried cooking, but his dad no like
                chef rat. the old lady shoots rats but she has very bad aim and
                misses every shot. the rat floats on a book boat to paris. he
                then has halucinations of his favorite chef. then, he goes to
                his favorite resturant and nearly dies. he meets linguine who
                looks kinda like ed sheeran. ed sheeran cant cook. and neither
                can linguine. at all. so linguine becomes a human puppet for the
                rat and they plan world domination. oh wait nvm i meant they get
                cookin. then, they cook yummy things. like rat patootie. and
                soups. then everyone likes linguine and hes not a goober
                anymore. and he gets a patriarcy obsessed gf. the end. actually
                its not the end bc the mean old short guy tries to sabatoge the
                resturant at the exact same time the old mean critic guy comes
                to eat at the resturant. but the short guy actually fails and
                the other mean old man actually likes the food so its actually
                the end. but wait! oh no! the resturant gets closed bc ppl dont
                like rats in the kitchen. so they open their own resturant and
                everyone lives happily ever after. yippee :3{' '}
            </p>
            <a href={videoUrl} onClick={handleClick}>
                {' '}
                <button className='rounded-lg border-2 border-dotted border-green-900 px-4 shadow-xl'>
                    Yippee
                </button>
            </a>
        </div>
    );
}

export default Bleh;
