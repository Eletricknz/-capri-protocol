
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

let memoria = JSON.parse(
  localStorage.getItem("capri_memoria") || "{}"
);

let historico = JSON.parse(
  localStorage.getItem("capri_historico") || "[]"
);

function salvarMemoria() {
  localStorage.setItem(
    "capri_memoria",
    JSON.stringify(memoria)
  );
}

function addMessage(sender, text) {
  const message = document.createElement("p");
  message.textContent = `${sender}: ${text}`;

  messages.appendChild(message);

  historico.push({ sender, text });

  localStorage.setItem(
    "capri_historico",
    JSON.stringify(historico)
  );
}

function carregarHistorico() {
  historico.forEach(item => {
    const message = document.createElement("p");
    message.textContent = `${item.sender}: ${item.text}`;
    messages.appendChild(message);
  });
}

carregarHistorico();

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = userInput.value.trim();

  if (text === "") return;

  addMessage("VOCÊ", text);
  userInput.value = "";

  const nome = text.match(/meu nome é (.+)/i);

  if (nome) {
    memoria.nome = nome[1].trim();
    salvarMemoria();
  }

  setTimeout(() => {
    let resposta;

    if (/qual meu nome/i.test(text)) {
      resposta = memoria.nome
        ? `Seu nome é ${memoria.nome}!`
        : "Ainda não sei seu nome. Pode me contar?";
    } else if (memoria.nome && /quem sou eu/i.test(text)) {
      resposta = `Você é ${memoria.nome}!`;
    } else {
      resposta = memoria.nome
        ? `Entendi, ${memoria.nome}! Vou guardar nossa conversa.`
        : "Mensagem recebida! Ainda estou aprendendo.";
    }

    addMessage("CAPRI", resposta);
  }, 600);
});
