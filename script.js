const ably = new Ably.Realtime('pM-ddA.ZbUG5g:uJoBm_lSQjCl8VZlAcVSaEGMH9ZcYFfJHZLKAtVCfps'); // Replace with your Ably API key
const channel = ably.channels.get('chat');

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const musicInput = document.getElementById('music-input');
const audioPlayer = document.getElementById('audio-player');
const usernameInput = document.getElementById('username-input');

// Listen for messages
channel.subscribe('chat', (message) => {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', 'received');
    msgElement.innerHTML = `<strong>${message.username}:</strong> ${message.data}`;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
});

// Send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    const username = usernameInput.value || 'Anonymous'; // Default to 'Anonymous' if no username is provided
    if (message) {
        const msgElement = document.createElement('div');
        msgElement.classList.add('message', 'sent');
        msgElement.innerHTML = `<strong>${username}:</strong> ${message}`;
        chatBox.appendChild(msgElement);
        channel.publish('chat', { data: message, username: username });
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});

// Handle music upload
musicInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioPlayer.play();
    }
});