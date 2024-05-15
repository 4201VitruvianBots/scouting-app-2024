// Written by ChatGPT
function camelToSpaced(camelCaseString: string): string {
    return camelCaseString
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, str => str.toUpperCase());
}

export default camelToSpaced;
