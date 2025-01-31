// Your script here.
const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = "";
    voices.forEach(function(voice, index) {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute("value", index);
      voicesDropdown.appendChild(option);
    });
  }

  function speak() {
    if (speechSynthesis.speaking) {
      console.error("SpeechSynthesis is already speaking");
      return;
    }
    const text = document.querySelector('[name="text"]').value;
    if (text !== "") {
      msg.text = text;
      msg.voice = voices[voicesDropdown.value];
      msg.rate = document.querySelector('[name="rate"]').value;
      msg.pitch = document.querySelector('[name="pitch"]').value;
      speechSynthesis.speak(msg);
    }
  }

  function stop() {
    speechSynthesis.cancel();
  }

  voicesDropdown.addEventListener('change', function() {
    msg.voice = voices[voicesDropdown.value];
  });

  speakButton.addEventListener('click', function() {
    speak();
  });

  stopButton.addEventListener('click', function() {
    stop();
  });

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
  } else {
    populateVoices();
  }
