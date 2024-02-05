import { AnalysisEntry } from "./data";

function numberColumns(data: AnalysisEntry[] | undefined) {
    return data
    ? Object.keys(data[0]).filter(
          e => e !== 'teamNumber' && typeof data[0][e] === 'number'
      )
    : [];
}

function Series<T extends object>(data: T[]): T[] & { [K in keyof T]: T[K][] } {
    const props = [...new Set(data.flatMap(e => Object.keys(e)))] as (keyof T)[];
    return new Proxy(data, {
        get(target, prop, reciever) {
            if (props.includes(prop as keyof T)) {
                return target.map(e => e[prop as keyof T])
            }
            return Reflect.get(target, prop, reciever);
        }
    }) as T[] & { [K in keyof T]: T[K][] };
}

export { numberColumns, Series };
