function appendMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.classList.add(sender + "-msg");
  
    const bubble = document.createElement("div");
    bubble.classList.add("msg");
    bubble.textContent = text;
  
    msgDiv.appendChild(bubble);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;
  
    appendMessage("user", message);
  
    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: message })
    })
    .then(response => response.json())
    .then(data => appendMessage("bot", data.answer))
    .catch(() => appendMessage("bot", "Oops! Something went wrong."));
  
    input.value = "";
  }
  