const API_URL = "https://6795a936aad755a134ec74bd.mockapi.io/KruArmFinalProject/users";
const Game_Type_API = "https://6795a936aad755a134ec74bd.mockapi.io/KruArmFinalProject/gametype"
const Game_Card_API = "https://67a5fa0a510789ef0df9f7a4.mockapi.io/KruArmFinalProject/game_card"
const Game_Data_API = "https://67a5fa0a510789ef0df9f7a4.mockapi.io/KruArmFinalProject/game_data";
const GamePass_API = "https://67b27287bc0165def8cd939a.mockapi.io/KruArmFinalProject/gamepass"
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function base64UrlDecode(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) {
        str += "=";
    }
    return atob(str);
}
function base64UrlEncode(str) {
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");//URL-safe
}

function base64UrlEncodeArrayBuffer(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return base64UrlEncode(binary);
}

async function newjwt(payload, secret, expireinsec = 9999) {
    const encoder = new TextEncoder();
    const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
    const body = JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + expireinsec });

    const headerBase64 = base64UrlEncode(header);
    const bodyBase64 = base64UrlEncode(body);

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(`${headerBase64}.${bodyBase64}`)
    );

    const signatureBase64 = base64UrlEncodeArrayBuffer(signature);
    return `${headerBase64}.${bodyBase64}.${signatureBase64}`;
}
async function verifyJWT(token, secret) {
        const [headerB64, bodyB64, signatureB64] = token.split(".");

        if (!headerB64 || !bodyB64 || !signatureB64) {
            return { valid: false, reason: "Invalid token format" };
        }

        const header = JSON.parse(base64UrlDecode(headerB64));
        const body = JSON.parse(base64UrlDecode(bodyB64));

        if (header.alg !== "HS256") {
            return { valid: false, reason: "Invalid algorithm" };
        }
        if (Date.now() / 1000 > body.exp) {
            return { valid: false, reason: "Token expired" };
        }

        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const data = encoder.encode(`${headerB64}.${bodyB64}`);
        const validSignature = await crypto.subtle.sign("HMAC", key, data);
        const validSignatureB64 = base64UrlEncodeArrayBuffer(validSignature);
        if (signatureB64 !== validSignatureB64) {
            return { valid: false, reason: "Invalid signature" };
        }
        return { valid: true, payload: body };
        
}
function showError(msg) {
    swal("ข้อผิดพลาด !", msg + " | กรุณาล็อคอินใหม่", "error", {
        button: { className: 'hyper-btn-notoutline-danger' },
        closeOnClickOutside: false,
    });
    localStorage.removeItem("token");
    sleep(2000).then(() => { window.location.href = "../../index.html"; });
}
async function chktoken() {
    const token = await localStorage.getItem("token");
    if (!token) {
        showError("Token Not Found | กรุณาล็อคอินใหม่");
        return { valid: false };
    }

    const result = await verifyJWT(token, "mysecret");

    if (!result.valid) {
        console.log(result.reason)
        showError(result.reason === "Token expired" ? "Token Expired" : "Invalid Token");
        return { valid: false };
    }
    return { valid: true };
}
async function getUserPoints(username) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(),5000);
        let res = await fetch(API_URL,{signal:controller.signal});
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("response err");
        let users = await res.json();
        let user = users.find(user => user.username === username);
        return user ? user.points : null;
    } catch (error) {
        console.error("Fetching Error : ", error);
        return null;
    }
}
function validationtk(param){
    var chktk = localStorage.getItem("token");
    if(chktk){
        window.location.href=param
    }
}
async function getselled(param){
    const a = await fetch(`${Game_Data_API}?selled=${param}`)
    const b=await(a.json())
    if(b==="Not found"){
        return null
    }else{
        return b;
    }
}

$(document).ready(function(){
    const buttons = document.querySelectorAll('div#footerhistory a');
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            swal("System not available", "ระบบนี้ไม่พร้อมใช้งาน", "info", {
                button:false,
                closeOnClickOutside: false,
                timer:1000
            });
        });
    });
    $('#logoutButton').click(async(p)=>{
        localStorage.removeItem('token')
        swal("Success", "ออกจากระบบ เสร็จสิ้น !", "success", {
            button:false,
            closeOnClickOutside: false,
        });
        sleep(1000).then(() => { window.location.href = "../../index.html"; });
    })
})

