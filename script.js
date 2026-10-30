
const password = document.getElementById("password");
const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const message = document.getElementById("message");

length.addEventListener("input", function () {
    lengthValue.textContent = length.value;
});

document.getElementById("generateBtn").addEventListener("click", function () {
    let chars = "";
    let required = [];

    if (document.getElementById("uppercase").checked) {
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        required.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if (document.getElementById("lowercase").checked) {
        chars += "abcdefghijklmnopqrstuvwxyz";
        required.push("abcdefghijklmnopqrstuvwxyz");
    }

    if (document.getElementById("numbers").checked) {
        chars += "0123456789";
        required.push("0123456789");
    }

    if (document.getElementById("symbols").checked) {
        chars += "!@#$%^&*";
        required.push("!@#$%^&*");
    }

    if (!chars) {
        message.textContent = "Select at least one option.";
        return;
    }

    const size = Number(length.value);

    if (size < required.length) {
        message.textContent = "Increase the password length.";
        return;
    }

    function randomIndex(max) {
        const array = new Uint32Array(1);
        const limit = Math.floor(4294967296 / max) * max;

        do {
            crypto.getRandomValues(array);
        } while (array[0] >= limit);

        return array[0] % max;
    }

    let result = required.map(set => set[randomIndex(set.length)]);

    while (result.length < size) {
        result.push(chars[randomIndex(chars.length)]);
    }

    for (let i = result.length - 1; i > 0; i--) {
        const j = randomIndex(i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }

    password.value = result.join("");
    message.textContent = "Password generated successfully!";
});

document.getElementById("copyBtn").addEventListener("click", async function () {
    if (!password.value) {
        message.textContent = "Generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(password.value);
        message.textContent = "Password copied successfully!";
    } catch {
        message.textContent = "Copy failed. Open using localhost or HTTPS.";
    }
});
