const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('#sendbtn');
const chatBox = document.querySelector('.chatbox');

let userMessage;
const API_KEY = "9c0ec1253cmshae0b5b70e4747f7p18f4b0jsn14778a9d9af4";

const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add('chat', className);

    let chatContent = className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-symbols-outlined"> smart_toy </span><p>${message}</p>`;

    chatLi.innerHTML = chatContent;
    return chatLi;
};

const generateResponse = async () => {
    const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: userMessage
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        const botMessage = result.response.replace(/Human:.*?AI:/, "").trim(); // 'response' property থেকে মেসেজ নিয়ে আসা এবং 'Human: ... AI:' অংশ বাদ দেওয়া

        chatBox.appendChild(createChatLi(botMessage, "incoming"));
    } catch (error) {
        console.error('Error:', error);
        chatBox.appendChild(createChatLi("Sorry, something went wrong. Please try again.", "incoming"));
    }
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatBox.appendChild(createChatLi(userMessage, "outgoing"));

    chatInput.value = ''; // এটি ইনপুট ফিল্ড ক্লিয়ার করার জন্য

    generateResponse();
};

sendChatBtn.addEventListener('click', handleChat);
