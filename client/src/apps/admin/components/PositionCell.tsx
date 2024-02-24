import { MaterialSymbol } from "react-material-symbols"

function PositionCell ({scouter}:{scouter:{schedule: number, real:number[]} | boolean }){
    return (
        <td className="border-2 border-slate-700 text-center w-auto">{
            typeof scouter==='boolean'
                ?scouter&&<MaterialSymbol icon='check'/>
                :scouter.real.length===0?scouter.schedule
                :scouter.real.length===1?scouter.real[0]
                :<MaterialSymbol icon="warning"/>}
        </td>
    )
}
export default PositionCell