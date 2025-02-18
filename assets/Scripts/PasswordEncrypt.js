async function encryptPassword(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
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
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encodedPassword = encoder.encode(password);
    const encryptedPassword = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv: iv },
        key,
        encodedPassword
    );
    const encryptedArray = new Uint8Array(encryptedPassword);
    let encryptedHex = '';
    encryptedArray.forEach(byte => {
        encryptedHex += byte.toString(16).padStart(2, '0');
    });
    return {
        encryptedPassword: encryptedHex,
        iv: arrayBufferToBase64(iv),
        salt: salt
    };
}
function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
}
function generateRandomSalt() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('');
}