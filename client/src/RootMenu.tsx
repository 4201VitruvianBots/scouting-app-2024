import LinkButton from './components/LinkButton';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

function RootMenu() {
    return (
        <main >
            <p style={{fontSize:'30px', fontFamily:'monospace', color:'green', textAlign:'center', paddingTop:'10px'}}>welcome to vitruvian scouting</p>
           
           <div className='box-border grid h-screen grid-cols-2 items-stretch gap-5 p-5 pb-10 '>
            <LinkButton
                    link='/public'
                    icon={
                        <PersonSearchIcon style={{ fontSize: '50px' }} />
                    }>
                    Public
            </LinkButton>

                <LinkButton
                    link='/match'
                    icon={
                        <ContentPasteSearchIcon style={{ fontSize: '50px' }} />
                    }>
                    Match
                </LinkButton>

                <LinkButton
                    link='/super'
                    icon={
                        <ScreenSearchDesktopIcon style={{ fontSize: '50px' }} />
                    }>
                    Super
                </LinkButton>

                <LinkButton
                    link='/pit'
                    icon={
                        <SettingsIcon style={{ fontSize: '50px' }} />
                    }>
                    Pit
                </LinkButton>
               

                <LinkButton
                    link='/recon'
                    icon={
                        <QueryStatsIcon style={{ fontSize: '50px' }} />
                    }>
                    Recon
                </LinkButton>

                <LinkButton
                    link='/recon'
                    icon={
                        <SportsEsportsIcon style={{ fontSize: '50px' }} />
                    }>
                    Cone Stacker
                </LinkButton>
                </div>
           
        </main>
    );
}

export default RootMenu;
