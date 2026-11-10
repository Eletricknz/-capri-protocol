
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

function addMessage(sender, text) {
  const message = document.createElement("p");
  message.textContent = `${sender}: ${text}`;
  messages.appendChild(message);
}

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = userInput.value.trim();

  if (text === "") return;

  addMessage("VOCÊ", text);

  userInput.value = "";

  setTimeout(() => {
    addMessage(
      "CAPRI",
      "Mensagem recebida. Meu sistema ainda está em desenvolvimento!"
    );
  }, 600);
});
