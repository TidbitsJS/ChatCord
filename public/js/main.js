const userSelect = document.querySelector("#user-select");
const users = document.querySelector("#users");
var set = false;

userSelect.addEventListener("click", () => {
  console.log(userSelect.dataset.set);
  if (set === false) {
    users.style.display = "block";
    users.style.padding = "0px 10px";
    set = true;
  } else {
    users.style.display = "none";
    set = false;
  }
});

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username, room);

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputRoomUsers(users);
});

socket.on("message", (message) => {
  console.log("message", message);
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
  const userDiv = document.createElement("div");
  const botDiv = document.createElement("div");
  userDiv.classList.add("message");
  botDiv.classList.add("message");

  if (message.username === "J.A.R.V.I.S.") {
    botDiv.innerHTML = `

      <p class="meta">${message.username}<span>${message.time}</span></p>
      <p class="text"><i class="fas fa-robot"></i>${message.text}</p>
    `;
    document.querySelector(".chat-messages").appendChild(botDiv);
  } else {
    userDiv.innerHTML = `
    <p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">${message.text}</p>
    `;

    document.querySelector(".chat-messages").appendChild(userDiv);
  }
};

const outputRoomName = (room) => {
  roomName.innerText = room;
};

const outputRoomUsers = (users) => {
  userList.innerHTML = `
    ${users
      .map(
        (user) => `
      <li> <i class="fab fa-discord"></i> ${user.username}</li>
    `
      )
      .join("")}
  `;
};
