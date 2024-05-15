function postJson(url: string, data: unknown) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
}

export { postJson };
