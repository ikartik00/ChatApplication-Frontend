// AES-256 session key banao
// AES-GCM — ek symmetric algorithm hai, matlab ek hi key se encrypt aur decrypt hota hai
// RSA se alag — RSA mein do alag keys thi (public/private), AES mein ek hi
// length: 256 — key kitni badi ho — 256 bits matlab ek bahut bada random number, practically impossible to guess
// true — ye key export ho sakti hai — zaroori hai kyunki baad mein hume ise RSA se encrypt karke doosron ko deni hai

export async function generateAESKey() {
  return window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
  );
}

// IV = Initialization Vector — ek random 12-byte number
// Ye isliye zaroori hai ki agar tum same message do baar bhejo, toh dono baar encrypted output alag aaye — attacker pattern na pakad sake

// Message abhi text string hai — "Hello!"
// Crypto engine text nahi, bytes chahta hai
// TextEncoder text ko bytes mein badalta hai → [72, 101, 108, 108, 111, 33]
// Teen cheezein andar jaati hain — algorithm + iv, key, message bytes
// Bahar aata hai — encrypted gibberish bytes jo bina key ke kuch nahi bata

//Encrypted bytes directly JSON mein nahi bhej sakte — isliye Base64 string mein convert karo
// btoa = bytes to Base64 — network pe safely bheja ja sake
// IV bhi saath bhejni padti hai — decrypt karte waqt zaroorat padegi, koi secret nahi hai ye.

export async function encryptMessage(plaintext, aesKey) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encoded);
  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    iv: btoa(String.fromCharCode(...iv))
  };
}

// AES key ko member ki public key se encrypt karo
// AES key abhi browser ke andar ek CryptoKey object hai — directly use nahi ho sakta
// Pehle use raw bytes mein nikalo
//Ab AES key ko member ki RSA public key se encrypt karo
//Matlab sirf wo member apni private key se ye AES key khol sakta hai

export async function encryptAESKeyForMember(aesKey, memberPublicKey) {
  const rawKey = await window.crypto.subtle.exportKey("raw", aesKey);
  const encrypted = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, memberPublicKey, rawKey);
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export function bufferToBase64(buffer) {
  return btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  );
}

export function base64ToBuffer(base64) {
  return Uint8Array.from(
    atob(base64),
    c => c.charCodeAt(0)
  );
}

// Apni private key se AES key recover karo
// Server se aai encrypted AES key Base64 mein thi
// atob = Base64 wapas bytes mein — encryptAESKeyForMember ka ulta kaam
//Apni RSA private key se AES key decrypt karo
//Sirf tumhare paas private key hai — isliye sirf tum ye kar sakte ho
//Raw bytes wapas CryptoKey object banao — tabhi decrypt function use kar sakta hai
//false — ab ye key export nahi hogi, memory mein safe rahegi

export async function decryptAESKey(encryptedKeyB64, privateKey) {
  console.log(privateKey);
  const buffer = Uint8Array.from(atob(encryptedKeyB64), c => c.charCodeAt(0));
  const rawKey = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, buffer);
  return window.crypto.subtle.importKey("raw", rawKey, { name: "AES-GCM" }, false, ["decrypt"]);
}

export async function deriveKeyFromPassword(password, salt) {
  // Password ko raw key material mein badlo
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // PBKDF2 se AES key derive karo
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,          // random salt
      iterations: 100000,  // 100k iterations — brute force slow karta hai
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptPrivateKey(privateKeyBuffer, password) {
  console.log(privateKeyBuffer);
  // Random salt aur IV banao
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Password se AES key derive karo
  const aesKey = await deriveKeyFromPassword(password, salt);

  // Private key encrypt karo
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    privateKeyBuffer
  );

  // Sab saath mein return karo — server ko ye store karna hai
  return {
    encryptedPrivateKey: bufferToBase64(encrypted),
    salt: bufferToBase64(salt),
    iv: bufferToBase64(iv)
  };
}

export async function decryptPrivateKey(encryptedPrivateKeyB64, iv64, salt64, password) {
  let encryptedPrivateKey = base64ToBuffer(encryptedPrivateKeyB64)
  let iv = base64ToBuffer(iv64)
  let salt = base64ToBuffer(salt64)

  const aesKey = await deriveKeyFromPassword(password, salt);
  console.log(aesKey);
  const privateKeyBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(iv)
    },
    aesKey,
    encryptedPrivateKey
  );
  const key = await window.crypto.subtle.importKey(
    "pkcs8",
    privateKeyBuffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["decrypt"]
  );
  console.log(key);
  console.log("instanceof CryptoKey:", key instanceof CryptoKey);

  return key;

}

// Message decrypt karo
//Server se aaya ciphertext aur IV — dono Base64 mein the
//Dono ko wapas bytes mein badlo — crypto engine bytes chahta ha
//AES key aur IV use karke message decrypt karo
//IV same honi chahiye jo encrypt karte waqt use ki thi — isliye saath bheja tha
//Decrypt hone ke baad bytes aate hain — [72, 101, 108, 108, 111]
//TextDecoder bytes ko wapas readable text mein badalta hai → "Hello!"

export async function decryptMessage(ciphertextB64, ivB64, aesKey) {
  const ciphertext = Uint8Array.from(atob(ciphertextB64), c => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(ivB64), c => c.charCodeAt(0));
  const plaintext = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, aesKey, ciphertext);
  return new TextDecoder().decode(plaintext);
}