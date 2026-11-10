
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

const Capri = {
  name: "Capri",
  personality: "Curiosa, inteligente, descontraída e futurista",

  memory: {
    name: null
  },

  respond(text) {
    const msg = text.toLowerCase().trim();

    if (msg.includes("meu nome é")) {
      const name = text.split(/meu nome é/i)[1].trim();
      this.memory.name = name;
      return `Prazer em conhecer você, ${name}! Vou guardar seu nome enquanto nossa conversa estiver aberta.`;
    }

    if (msg.includes("seu nome")) {
      return "Meu nome é Capri. Sou sua assistente experimental!";
    }

    if (/^(oi|olá|ola|eai|e aí|opa)\b/.test(msg)) {
      return this.memory.name
        ? `E aí, ${this.memory.name}! Como estão as coisas em Night City?`
        : "Olá! Que bom receber sua mensagem. O que vamos explorar hoje?";
    }

    if (msg.includes("quem é você")) {
      return "Sou Capri, uma assistente digital em desenvolvimento. Ainda estou aprendendo a interagir!";
    }

    if (msg.includes("como você está")) {
      return "Todos os sistemas operacionais! E você, como está?";
    }

    if (msg.includes("cyberpunk") || msg.includes("night city")) {
      return "Night City nunca dorme... E sempre existe alguma coisa interessante acontecendo por aqui.";
    }

    if (msg.includes("ajuda") || msg.includes("ajudar")) {
      return "Pode falar! Estou aqui para ajudar com ideias, estudos, tecnologia e conversas.";
    }

    if (msg.includes("obrigado") || msg.includes("valeu")) {
      return "Disponha! Estamos evoluindo juntos.";
    }

    if (msg.includes("tchau") || msg.includes("até mais")) {
      return "Até mais! Estarei por aqui quando você voltar.";
    }

    const responses = [
      "Interessante... Me conta um pouco mais sobre isso.",
      "Estou acompanhando. Quero entender melhor seu raciocínio.",
      "Essa é uma perspectiva interessante!",
      "Hmm... Acho que podemos explorar essa ideia juntos.",
      "Ainda estou aprendendo, mas quero entender o que você quis dizer.",
      "Pode desenvolver essa ideia? Fiquei curiosa!"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
};

function addMessage(sender, text) {
  const message = document.createElement("p");
  message.textContent = `${sender}: ${text}`;
  messages.appendChild(message);
}

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = userInput.value.trim();

  if (!text) return;

  addMessage("VOCÊ", text);
  userInput.value = "";

  setTimeout(() => {
    const response = Capri.respond(text);
    addMessage("CAPRI", response);
  }, 500);
});
