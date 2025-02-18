async function decryptPassword(encryptedPassword, salt, iv, inputPassword) {
    try {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            encoder.encode(inputPassword),
            "PBKDF2",
            false,
            ["deriveKey"]
        );
        const key = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: encoder.encode(salt),
                iterations: 24000,
                hash: "SHA-512"
            },
            keyMaterial,
            {
                name: "AES-CBC",
                length: 256
            },
            false,
            ["encrypt", "decrypt"]
        );
        const ivArray = base64ToArrayBuffer(iv);
        const encryptedArray = hexStringToUint8Array(encryptedPassword);
        const decryptedPassword = await crypto.subtle.decrypt(
            { name: "AES-CBC", iv: ivArray },
            key,
            encryptedArray
        );
        const decoder = new TextDecoder();
        return decoder.decode(decryptedPassword);
    } catch (error) {
        console.error("Decrypting err??!", error);
        return null;
    }
}
function hexStringToUint8Array(hexString) {
    const length = hexString.length / 2;
    const array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        array[i] = parseInt(hexString.substr(i * 2, 2), 16);
    }
    return array;
}
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < length; i++) {
        view[i] = binaryString.charCodeAt(i);
    }
    return arrayBuffer;
}