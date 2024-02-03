import LinkButton from './components/LinkButton';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ListIcon from '@mui/icons-material/ListAlt';

function RootMenu() {
    return (
        <main className='box-border grid h-screen grid-cols-1 items-stretch gap-5 p-5'>
            <p
                style={{
                    fontSize: '30px',
                    fontFamily: 'monospace',
                    color: 'green',
                    textAlign: 'center',
                }}>
                welcome to vitruvian scouting
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
                link='/picklist'
                icon={<ListIcon style={{ fontSize: '50px' }} />}>
                Picklist
            </LinkButton>
        </main>
    );
}

export default RootMenu;
