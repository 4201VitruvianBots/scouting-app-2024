import { AnalysisEntry } from "./data";

function numberColumns(data: AnalysisEntry[] | undefined) {
    return data
    ? Object.keys(data[0]).filter(
          e => e !== 'teamNumber' && typeof data[0][e] === 'number'
      )
    : [];
}

export {numberColumns};