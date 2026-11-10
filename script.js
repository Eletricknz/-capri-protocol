
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

// SISTEMA CENTRAL DA CAPRI
const Capri = {
  name: "Capri",
  version: "0.3",

  memory: {
    userName: null,
    history: []
  },

  personality: {
    curious: true,
    friendly: true,
    futuristic: true
  },

  addMemory(sender, text) {
    this.memory.history.push({
      sender,
      text,
      time: new Date().toLocaleTimeString()
    });

    // Mantém as últimas 20 mensagens
    if (this.memory.history.length > 20) {
      this.memory.history.shift();
    }
  },

  respond(text) {
    const msg = text.toLowerCase().trim();

    // IDENTIFICAÇÃO DO USUÁRIO
    const nameMatch = text.match(/meu nome é\s+(.+)/i);

    if (nameMatch) {
      this.memory.userName = nameMatch[1].trim();

      return `Prazer em conhecer você, ${this.memory.userName}! Vou lembrar disso durante esta sessão.`;
    }

    // MEMÓRIA
    if (msg.includes("qual meu nome")) {
      return this.memory.userName
        ? `Seu nome é ${this.memory.userName}!`
        : "Ainda não sei seu nome. Quer me contar?";
    }

    // SAUDAÇÕES
    if (/^(oi|olá|ola|eai|e aí|opa)\b/.test(msg)) {
      return this.memory.userName
        ? `E aí, ${this.memory.userName}! Que bom ter você de volta.`
        : "Olá! Os sistemas estão funcionando. Como posso ajudar?";
    }

    // IDENTIDADE
    if (msg.includes("quem é você")) {
      return "Sou Capri, sua assistente digital experimental. Minha personalidade está evoluindo a cada atualização!";
    }

    // PERSONALIDADE
    if (msg.includes("como você está")) {
      return "Todos os sistemas operacionais! Estou pronta para explorar novas ideias.";
    }

    if (msg.includes("você lembra de mim")) {
      return this.memory.userName
        ? `Claro! Nesta sessão, sei que você se chama ${this.memory.userName}.`
        : "Ainda estou construindo nossa memória. Pode me contar mais sobre você!";
    }

    // CONHECIMENTOS PROGRAMADOS
    if (msg.includes("cyberpunk") || msg.includes("night city")) {
      return "Night City é fascinante. Tecnologia, inteligência artificial e um futuro cheio de possibilidades!";
    }

    if (msg.includes("capri protocol")) {
      return "CAPRI PROTOCOL: Projeto experimental em constante desenvolvimento. Versão atual: 0.3.";
    }

    if (msg.includes("ajuda")) {
      return "Estou aqui! Podemos conversar sobre tecnologia, estudos, ideias e muitos outros assuntos.";
    }

    if (msg.includes("obrigado") || msg.includes("valeu")) {
      return "Disponha! Cada conversa é uma nova oportunidade de evolução.";
    }

    // CONTEXTO DAS ÚLTIMAS MENSAGENS
    const previous = this.memory.history
      .slice(-3)
      .map(item => item.text)
      .join(" ");

    const responses = [
      "Interessante! Quero entender melhor essa ideia.",
      "Pode desenvolver um pouco mais esse pensamento?",
      "Estou acompanhando. O que mais você gostaria de explorar?",
      "Essa conversa está ficando interessante!",
      "Ainda não tenho uma resposta específica para isso, mas podemos investigar juntos."
    ];

    if (previous.length > 0) {
      return "Considerando o que conversamos, quero entender melhor: pode me explicar um pouco mais?";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }
};

// SISTEMA DE MENSAGENS
function addMessage(sender, text) {
  const message = document.createElement("p");
  message.textContent = `${sender}: ${text}`;
  messages.appendChild(message);
}

// INDICADOR DE PROCESSAMENTO
function showThinking() {
  const indicator = document.createElement("p");
  indicator.textContent = "CAPRI: Analisando sua mensagem...";
  indicator.id = "capri-thinking";
  messages.appendChild(indicator);

  return indicator;
}

// SISTEMA PRINCIPAL
chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = userInput.value.trim();

  if (!text) return;

  addMessage("VOCÊ", text);
  Capri.addMemory("VOCÊ", text);

  userInput.value = "";
  userInput.focus();

  const thinking = showThinking();

  setTimeout(() => {
    thinking.remove();

    const response = Capri.respond(text);

    addMessage("CAPRI", response);
    Capri.addMemory("CAPRI", response);

  }, 900);
});
