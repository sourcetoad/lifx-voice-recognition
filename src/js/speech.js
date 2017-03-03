import { sendLightRequest } from './light';

let speechActive = false;

document.getElementById('mic').onclick = toggleVoiceRecognition;

const recognition = new webkitSpeechRecognition({
  continuous: true
});

recognition.onresult = function(event) {
  let text = '';
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      text += event.results[i][0].transcript.toLowerCase();
    }
  }
  document.getElementById('text').innerHTML = `${document.getElementById('text').innerHTML} ${text}`;
  parseText(text);
}

function parseText(text) {
  const colors = ['white', 'red', 'orange', 'yellow', 'cyan', 'green', 'blue', 'purple', 'pink'];
  if (text.indexOf('power') > -1) {
    sendLightRequest('power');
  } else if (text.indexOf('color') >- 1) {
    for (let i=0;i<colors.length;i++) {
      if (text.indexOf(colors[i]) > -1) {
        sendLightRequest('color',text.substring(text.indexOf(colors[i]),text.length));
      }
    }
  } else if (text.indexOf('dim') >- 1) {
    sendLightRequest('brightness', 0.25);
  } else if (text.indexOf('full bright') >- 1) {
    sendLightRequest('brightness', 1);
  }
}

export function toggleVoiceRecognition() {
  speechActive = !speechActive;
  if (speechActive === true) {
    recognition.start();
    document.getElementById('text').innerHTML = '';
    document.getElementById('mic').style.color = 'red';
  } else {
    recognition.stop();
    document.getElementById('mic').style.color = 'black';
  }
}
