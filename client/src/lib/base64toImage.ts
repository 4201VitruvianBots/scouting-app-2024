function base64toImage(base64: string): HTMLImageElement {
    const avatarImage = new Image();
    // Convert base64 to blob
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let j = 0; j < byteCharacters.length; j++) {
        byteNumbers[j] = byteCharacters.charCodeAt(j);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    avatarImage.src = URL.createObjectURL(blob);
    return avatarImage;
}

export default base64toImage;
