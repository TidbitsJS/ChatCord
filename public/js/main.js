const userSelect = document.querySelector("#user-select");
const users = document.querySelector("#users");
var set = false;

userSelect.addEventListener("click", () => {
  console.log(userSelect.dataset.set);
  if (set === false) {
    users.style.display = "block";
    set = true;
  } else {
    users.style.display = "none";
    set = false;
  }
});

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = "";
});

const outputMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");

  div.innerHTML = `
  <p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">${message.text}</p>
  `;

  document.querySelector(".chat-messages").appendChild(div);
};
