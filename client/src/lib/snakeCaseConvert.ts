function snakeToSpaced(snakeCaseString: string) {
    return snakeCaseString
        .split('_')
        .map(e => e[0].toUpperCase() + e.slice(1))
        .join(' ');
}

export { snakeToSpaced };
