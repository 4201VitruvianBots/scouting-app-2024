import {PythonShell} from "python-shell";

async function runPythonFunction(fileName: string, functionName: string, functionArg: any) {
    return (await PythonShell.run("python/" + fileName, {args: [functionName, functionArg]}))[0];
}

console.log(await runPythonFunction("analysis.py", "average", [1, 2, 3, 4, 5]));

console.log(await runPythonFunction("analysis.py", "find_min", [1, 2, 3, 4, 5]));

console.log(await runPythonFunction("analysis.py", "opposite", true));
