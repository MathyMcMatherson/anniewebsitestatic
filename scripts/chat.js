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

function annieResponse(playerMessage) {
  playerMessage = playerMessage.toLowerCase();
  annieMessage = "I'm bored. You're boring. I'm gonna wait for someone else to talk to";

  if(playerMessage.includes("walk")) {
    annieMessage = "DID YOU SAY WALK?!?! Let's go on a walk! RIGHT NOW!";
  }
  if(playerMessage.includes("park")) {
    annieMessage = "DID YOU SAY PARK?!?! Let's go to the park! RIGHT NOW!";
  }
  if(playerMessage.includes("food")) {
    annieMessage = "Food? Where? I want some. Give me food.";
  }
  if(playerMessage.includes("?")) {
    annieMessage = "I know you asked me a question but I'm just going to ignore it and stare at you because I'm a dumb dog";
  }
  if(playerMessage.includes("i like")) {
      let temp = playerMessage.split("i like ")[1].split(" ")[0];
      console.log(temp);
      annieMessage = `WHOA! I like ${temp} too! Since we have something in common, PET ME!`;
  }
  if(playerMessage.includes("i hate")) {
      let temp = playerMessage.split("i hate ")[1].split(" ")[0];
      console.log(temp);
      annieMessage = `Yah I hate ${temp} too! Since we have something in common, PET ME!`;
  }

  addMessage("annie", annieMessage);

}


function handleChatForm(e) {
  let playerInput = document.querySelector("#playerMessage");
  let playerMessage = playerInput.value;

  addMessage("player", playerMessage);
  playerInput.value = "";
  setTimeout(() => annieResponse(playerMessage), 300);
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

  addMessage("annie", "HI I'M ANNIE WHO ARE YOU?!?!");


});
