const chatbotWidget = document.getElementById("chatbot-widget");

const chatContainer = document.getElementById("chat-container");
const chatLog = document.getElementById("chat-log");

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-message-input-field");

let waitingForAnswer = false;

// A function for simulating the chatbot generating a reply
const replyGenerationTime = 3000;
function geneterateReply(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    chatInput.focus();

    if(!waitingForAnswer && chatInput.value.trim().length > 0) {
        waitingForAnswer = true;

        const messageText = chatInput.value.trim();

        // Log the user's message in the chat log and delete it from the chat input field
        let msgField = document.createElement("article");
        msgField.classList.add("chat-message", "user");
        msgField.textContent = messageText;
        chatLog.appendChild(msgField);
        chatInput.value = "";

        // Scroll down as needed to have the user's message in view
        chatLog.scrollTop = chatLog.scrollHeight;

        // Demonstrate chatlog layout with "Lorem ipsum." replies from the chatbot
        chatbotWidget.classList.add("think-anim");
        await geneterateReply(replyGenerationTime);
        chatbotWidget.classList.remove("think-anim");

        msgField = document.createElement("article");
        msgField.classList.add("chat-message", "bot");
        msgField.textContent = "Lorem ipsum.";
        chatLog.appendChild(msgField);

        // Scroll down as needed to have the bot's message in view
        chatLog.scrollTop = chatLog.scrollHeight;

        waitingForAnswer = false;
    }
});

chatbotWidget.addEventListener("click", (e) => {
    if(!chatbotWidget.classList.contains("think-anim")) {
        chatbotWidget.classList.add("wobble-anim");
        chatbotWidget.addEventListener("animationend", () => {
            chatbotWidget.classList.remove("wobble-anim");
        }, { once: true }); // Remove listener once animation has ended
    }

    chatContainer.classList.toggle("open");

    if (chatLog.children.length === 0) {
        // Demonstrate a chat bot starter message "Lorem ipsum?"
        const msgField = document.createElement("article");
        msgField.classList.add("chat-message", "bot");
        msgField.textContent = "Lorem ipsum?";
        chatLog.appendChild(msgField);

        // Scroll down as needed to have the bot's message in view
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});