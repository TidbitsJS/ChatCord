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

const socket = io();
