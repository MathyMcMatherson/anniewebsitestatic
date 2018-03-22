let currentMood = 2;
let messages = [
  {
    owner: "",
    message: ""
  },
  {
    owner: "",
    message: ""
  },
  {
    owner: "",
    message: ""
  },
  {
    owner: "",
    message: ""
  },
  {
    owner: "",
    message: ""
  }
];


function setupMoodButtons() {
  for(let i = 0; i < 5; i++) {
      let moodBtn = document.querySelector('#myMood' + i);
      moodBtn.addEventListener('click', e => {
          if(i != currentMood) {
            moodBtn.classList.remove('icon-unselected');
            moodBtn.classList.add('icon-selected');

            let oldMoodBtn = document.querySelector('#myMood' + currentMood);
            oldMoodBtn.classList.remove('icon-selected');
            oldMoodBtn.classList.add('icon-unselected');
            currentMood = i;
          }
      });
  }
}

function addMessage(owner, message) {
  for(let i = messages.length-1; i > 0; i--) {
    messages[i] = messages[i-1];
  }
  messages[0] = {
    owner: owner,
    message: message
  };
  setMessages();
}


function handleChatForm(e) {
  let playerInput = document.querySelector("#playerMessage");
  let playerMessage = playerInput.value;

  addMessage("player", playerMessage);
  playerInput.value = "";
}

function setMessages() {
  for(const [index, msg] of messages.entries()) {
    let msgDiv = document.querySelector("#message" + index);
    msgDiv.classList.remove("annie");
    msgDiv.classList.remove("player");
    if(msg.owner.length != 0) {
      msgDiv.classList.add(msg.owner);
    }
    msgDiv.innerHTML = msg.message;
  }
}


$(document).ready(function() {
  setupMoodButtons();

  let chatForm = document.querySelector("#chatForm");
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    handleChatForm(e);
  });


});
