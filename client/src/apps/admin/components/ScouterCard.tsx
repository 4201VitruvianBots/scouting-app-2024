import { MaterialSymbol } from "react-material-symbols";
import { StatusReport } from "requests";

function ScouterCard({scouter, title}: {scouter: StatusReport[], title: string}) {

    

    return(
        <div>
            <div>
                {title}
            </div>
            {scouter.length === 0 ? <MaterialSymbol icon="wifi_off"/>: scouter.length === 1 ? <>
            <div>{scouter[0].matchNumber}</div>
            <div>{scouter[0].scouterName}</div>
            <div>{(scouter[0].battery??0)*100}%</div>
            </>: <>
            <div> <MaterialSymbol icon='warning'/></div>
            {scouter.map(e => <div>{e.scouterName}</div>)}

            </>}
        </div> 
    )

}

export {ScouterCard}