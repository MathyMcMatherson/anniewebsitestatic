let currentMood = 2;

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

function handleChatForm(e) {
  console.log(e);
}

$(document).ready(function() {
  setupMoodButtons();

  let chatForm = document.querySelector("#chatForm");
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    handleChatForm(e);
  });


});
