let gAudio; // A reference to our audio dom node
let context; // Created once during initialization
let source; // Audio source


// This function is run once to setup everything.
function initializeAudio(){
  // TODO: Select from different points of audio
  gAudio = document.createElement("audio");
  gAudio.src = "./citypop-yvonneyuan.m4a";
  document.head.appendChild(gAudio);

  context = new AudioContext();
  source = context.createMediaElementSource(document.getElementsByTagName('audio')[0]);
  
  // Setup default connector state
  source.connect(context.destination);

  console.log("[Audio] Loaded initial audio");
}


// Internal Player API to play/pause
function playAudio() {
  if (typeof(gAudio) == "undefined") {
    console.error("Audio missing/undefined");
    return;
  }
  console.log("Begin audio playback");
  gAudio.play();
}

function pauseAudio() {
  if (typeof(gAudio) == "undefined") {
    console.error("Audio missing/undefined");
    return;
  }
  console.log("Pause audio playback");
  gAudio.pause();
}