import { MaterialSymbol } from "react-material-symbols";
import { StatusReport } from "requests";

function BatteryLevelIcon (batteryLevel:number){
    if (batteryLevel > 75) {
        return (
            <MaterialSymbol icon='battery_full' className="mb-4 mr-3"/>
        )
    }
    else if (batteryLevel >50){
        return (
            <MaterialSymbol icon='battery_3_bar' className="mb-4 mr-3"/>
        )
    }
    else if (batteryLevel > 25){
        return (
            <MaterialSymbol icon='battery_1_bar' className="mb-4 mr-3"/>
        )
    }
    else {
        return (
            <MaterialSymbol icon='battery_alert' className="mb-4 mr-3"/>
        )
    }
}
function ScouterCard({scouter, title, red=false}: {scouter: StatusReport[], title: string, red?:boolean}) {

    

    return(
        <div className={`${red?'bg-red-500 border-red-900': 'bg-blue-500 border-blue-900'} px-4 border-2 content-center text-center text-white items-center text-lg rounded-md`}>
            <div className="mt-4 mb-2 font-semibold">
                {title}
            </div>
            {scouter.length === 0 ? <MaterialSymbol icon="wifi_off" size={32}/>: scouter.length === 1 ? <>
            <div className="">
                {scouter[0].matchNumber}
                </div>
            <div>
                {scouter[0].scouterName}
                </div>
            <div>
                {BatteryLevelIcon(Math.floor((scouter[0].battery??0)*100))}
                {Math.floor((scouter[0].battery??0)*100)}%
                </div>
            </>: <>
            <div> <MaterialSymbol icon='warning' size={32} className="text-yellow-300"/></div>
            {scouter.map(e => <div>{e.scouterName}</div>)}

            </>}
        </div> 
    )

}

export {ScouterCard}