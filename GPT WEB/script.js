var loader = document.getElementById('loader');

window.addEventListener('load', function() {
    loader.style.display = 'none';
});

function back(){
    window.open("/ar/index.html")
}

function faq() {
    document.querySelector(".contentFAQ").style.display = "flex"
}

function closeFaq() {
    document.querySelector(".contentFAQ").style.display = "none"
}

var iconTheme = document.getElementById("theme-button")
function changeTheme(){
    document.body.classList.toggle("lightTheme")
    if(document.body.classList.contains("lightTheme")){
        iconTheme.innerText = "dark_mode";
    }else{
        iconTheme.innerText = "light_mode";
    }
}

var greetElem = document.getElementById("greetings");
var curHr = new Date().getHours();
var greetMes = ["Wow! Masih Begadang?",
    "Selamat Pagi.",
    "Selamat Siang.",
    "Selamat Sore.",
    "Selamat Malam.",
    "Belum Tidur ya?"];
let greetText = "";
if (curHr < 4) greetText = greetMes[0];
else if (curHr < 10) greetText = greetMes[1];
else if (curHr < 16) greetText = greetMes[2];
else if (curHr < 18) greetText = greetMes[3];
else if (curHr < 22) greetText = greetMes[4];
else greetText = greetMes[5];
greetElem.setAttribute('data-content', greetText);

let chatInput = document.querySelector(".chat-input input");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatBox");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className)
    let chatContent = className === "outgoing" ? `<p></p>`: `<pre><p></p></pre>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const chatId = Math.floor(Math.random() * 100000) + 1;
let generateResponse = (incomingChatLi) => {
    const prompt = document.getElementById('message').value;
    let apiUrl = `https://itzpire.com/ai/gpt-web?q=${encodeURIComponent(prompt)}&chat_id=${chatId}`;
    console.log(apiUrl)
    let hasil = incomingChatLi.querySelector("p")
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            hasil.textContent = data.result;
        } else {
            hasil.textContent = 'Maaf, saya tidak mengerti apa yang Anda tanyakan. Bisakah Anda ulangi pertanyaan Anda?';
        }
    })
    .catch(error => {
        hasil.textContent = 'Terjadi kesalahan pada sistem, coba lagi nanti.';
        console.error('Error:', error);
    }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight)

    const incomingChatLi = createChatLi("...", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight)
    generateResponse(incomingChatLi)
    chatInput.value = "";

    var counter = 6;
    setInterval(function() {
        counter--;
        if (counter >= 0) {
            chatInput.readOnly = true;
            chatInput.placeholder = 'Mohon tunggu dalam ' + counter + ' detik';
        }
        if (counter === 0) {
            chatInput.readOnly = false;
            chatInput.placeholder = 'Masukkan pertanyaanmu disini...';
        }
    },
        1000);
}

sendChatBtn.addEventListener("click",
    handleChat);

const paste = document.getElementById('paste-button');

paste.addEventListener("click",
    async() => {
        const read = await navigator.clipboard.readText()
        chatInput.value = read
    })