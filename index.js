class Cipher {
    constructor() {
        this.messages = [];
    }

    addMessage(msg) {
        this.messages.push(msg);
    }

    encodeAll(key) {
        this.messages = this.messages.map(msg => this.shiftText(msg, key));
    }

    decodeAll(key) {
        this.messages = this.messages.map(msg => this.shiftText(msg, -key));
    }

    shiftText(text, shift) {
        return text.split('').map(char => {
            if (char >= 'а' && char <= 'я') {
                let code = char.charCodeAt(0) - 'а'.charCodeAt(0);
                code = (code + shift + 33) % 33;
                return String.fromCharCode(code + 'а'.charCodeAt(0));
            }
            if (char >= 'А' && char <= 'Я') {
                let code = char.charCodeAt(0) - 'А'.charCodeAt(0);
                code = (code + shift + 33) % 33;
                return String.fromCharCode(code + 'А'.charCodeAt(0));
            }
            if (char >= 'a' && char <= 'z') {
                let code = char.charCodeAt(0) - 'a'.charCodeAt(0);
                code = (code + shift + 26) % 26;
                return String.fromCharCode(code + 'a'.charCodeAt(0));
            }
            if (char >= 'A' && char <= 'Z') {
                let code = char.charCodeAt(0) - 'A'.charCodeAt(0);
                code = (code + shift + 26) % 26;
                return String.fromCharCode(code + 'A'.charCodeAt(0));
            }
            return char;
        }).join('');
    }
}

const cipher = new Cipher();

cipher.addMessage("Hello!");
cipher.addMessage("Secret message");
cipher.addMessage("JavaScript is cool!");

function addMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        cipher.addMessage(message);
        messageInput.value = '';
        updateDisplay();
    }
}

function encodeMessages() {
    const key = parseInt(document.getElementById('keyInput').value);
    if (cipher.messages.length > 0) {
        cipher.encodeAll(key);
        updateDisplay();
    }
}

function decodeMessages() {
    const key = parseInt(document.getElementById('keyInput').value);
    if (cipher.messages.length > 0) {
        cipher.decodeAll(key);
        updateDisplay();
    }
}

function clearAll() {
    cipher.messages = [];
    updateDisplay();
}

function updateDisplay() {
    const messagesList = document.getElementById('messagesList');

    if (cipher.messages.length === 0) {
        messagesList.innerHTML = '<div class="empty-message">No messages</div>';
    } else {
        messagesList.innerHTML = cipher.messages.map((msg, index) =>
            `<div class="message-item">${index + 1}. ${msg}</div>`
        ).join('');
    }
}

document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addMessage();
    }
});

updateDisplay();

const testCipher = new Cipher();
testCipher.addMessage("Hello!");
testCipher.addMessage("Secret message");

console.log("Before encryption:", testCipher.messages);
testCipher.encodeAll(2);
console.log("After encryption:", testCipher.messages);
testCipher.decodeAll(2);
console.log("After decryption:", testCipher.messages);