let currentMood = 2;
let playerName = "";
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

const moodResponses = [
  "YOU'RE HAPPY?!?!? I'M HAPPY TOOO!!! I feed off other people's emotions",
  "I MADE YOU SMILE! HA!",
  "I can't read your facial expression. You're boring. I'm gonna take a nap",
  "WHY YOU SAD?!?! LET ME CHEER YOU UP!",
  "Oh wow - you're super sad. Maybe you should talk to a therapist instead of a dog on the internet?"
]


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

            addMessage("annie", moodResponses[i]);

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
  annieMessage = "";

  if(playerMessage.includes("walk")) {
    annieMessage = `DID YOU SAY WALK?!?! Let's go on a walk${(playerName.length != 0 ? " " + playerName : "")}! RIGHT NOW!`;
  }
  if(playerMessage.includes("park")) {
    annieMessage = `DID YOU SAY PARK?!?! Let's go to the park${(playerName.length != 0 ? " " + playerName : "")}! RIGHT NOW!`;
  }
  if(playerMessage.includes("food")) {
    annieMessage = `Food? Where? I want some. Give me food${(playerName.length != 0 ? " " + playerName : "")}!`;
  }
  if(playerMessage.includes("?")) {
    annieMessage = "I know you asked me a question but I'm just going to ignore it and stare at you because I'm a dumb dog. Like really, why would you assume I can understand complex sentence structures like questions?";
  }
  if(playerMessage.includes("i like")) {
      let temp = playerMessage.split("i like ")[1].split(" ")[0];
      annieMessage = `WHOA! I like ${temp} too! Since we have something in common, PET ME${(playerName.length != 0 ? " " + playerName : "")}!`;
  }
  if(playerMessage.includes("i hate")) {
      let temp = playerMessage.split("i hate ")[1].split(" ")[0];
      annieMessage = `Yah I hate ${temp} too! Since we have something in common, PET ME${(playerName.length != 0 ? " " + playerName : "")}!`;
  }
  if(playerMessage.includes("my name is")) {
      let temp = playerMessage.split("my name is ")[1].split(" ")[0];
      playerName = temp.toUpperCase();
      annieMessage = `Hi ${playerName}! Let's talk. Talk talk talk. I'm a dog.`;
  }


  if(annieMessage.length == 0) {
    let rand = Math.floor(Math.random() * 5);
    if(rand == 0) {
        annieMessage = "I'm bored. You're boring. I'm gonna wait for someone else to talk to";
    } else if (rand == 1) {
        annieMessage = `WAIT.... Did you hear that?! I heard something... Don't worry, I'll protect you${(playerName.length != 0 ? " " + playerName : "")}...`;
    } else if (rand == 2) {
        annieMessage = "I IGNORED WHAT YOU SAID BECAUSE I'M EXCITED YOU'RE HERE";
    } else if (rand == 3) {
        annieMessage = "I'M A SPACE DOG!";
    } else if (rand == 4) {
        annieMessage = `${(playerName.length != 0 ? playerName + ": " : "")}That is a very informed and intellectual thought that I don't understand because I'm just a dumb dog`;
    }
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

  /*
  let chatForm = document.querySelector("#chatForm");
  chatForm.addEventListener('submit', e => {
    e.preventDefault();

  });
  */

  let playerMessageInput = document.querySelector("#playerMessage");
  playerMessageInput.addEventListener('keypress', e => {
      if(e.key == "Enter") {
        handleChatForm(e);
      }
  });

  addMessage("annie", "HI I'M ANNIE WHO ARE YOU?!?!");


});
