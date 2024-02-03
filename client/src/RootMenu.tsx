import LinkButton from './components/LinkButton';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

function RootMenu() {
    return (
        <main className='box-border grid h-screen auto-rows-fr grid-cols-2 grid-rows-[auto] items-stretch gap-5 p-5'>
            <p className='col-span-2 text-center font-mono text-3xl text-green-700'>
                Welcome to Vitruvian Scouting
            </p>

            <LinkButton
                link='/public'
                icon={<PersonSearchIcon style={{ fontSize: '50px' }} />}>
                Public
            </LinkButton>

            <LinkButton
                link='/match'
                icon={<ContentPasteSearchIcon style={{ fontSize: '50px' }} />}>
                Match
            </LinkButton>

            <LinkButton
                link='/super'
                icon={<ScreenSearchDesktopIcon style={{ fontSize: '50px' }} />}>
                Super
            </LinkButton>

            <LinkButton
                link='/pit'
                icon={<SettingsIcon style={{ fontSize: '50px' }} />}>
                Pit
            </LinkButton>

            <LinkButton
                link='/recon'
                icon={<QueryStatsIcon style={{ fontSize: '50px' }} />}>
                Recon
            </LinkButton>

            <LinkButton
                link='/recon'
                icon={<SportsEsportsIcon style={{ fontSize: '50px' }} />}>
                Cone Stacker
            </LinkButton>
        </main>
    );
}

export default RootMenu;
