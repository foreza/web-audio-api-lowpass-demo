// Depends on a pre=existing context and audio source
let filter;
let isFilterActive = false; // Track the state of the filter for some basic logic


// Any sort of attaching to listeners/events should be done here to be run during initialization
function initializeLPFilter() {

  if (typeof context == 'undefined') {
    console.error("Context not defined; ensure audio.js (dependency) is loaded correctly")
    return;
  }

  if (typeof source == 'undefined') {
    console.error("Source is not defined; ensure audio.js (dependency) is loaded correctly")
    return;
  }


  // Create filter
  filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = getLowPassValueFromInput(); // default, configurable


  // Set up slider stuff
  let slider = document.getElementById("low-pass");
  let sliderVal = document.getElementById("low-pass-display-val");

  slider.addEventListener('input', () => {
    sliderVal.innerHTML = slider.value;
    // Automatically update it
    try {
      let tVal = getLowPassValueFromInput();
      console.log("Changing LP filter to: ", tVal);
      filter.frequency.value = tVal;
    } catch (e) {
      console.error(e);
    }
  }, false);



  console.log("[LP Filter] Loaded LP Filter");

}


function applyFilterToAudio() {

  source.connect(filter);
  filter.connect(context.destination);

  isFilterActive = true;
  let filterStateText = document.getElementById("filter-state");
  filterStateText.innerHTML = "Active";

  console.log("[LP Filter] Applied Filter");

}


function disconnectFilterFromAudio() {
  try {
    // Connect source back to destination
    source.connect(context.destination);
    // ensure we're
    // source.connect(analyzer);
  } catch (e) {
    console.error(e);
  }

  isFilterActive = false;
  let filterStateText = document.getElementById("filter-state");
  filterStateText.innerHTML = "Inactive";
}

// Fetches the current low pass value
function getLowPassValueFromInput() {
  let val = document.getElementById("low-pass").value;
  if (typeof (val) == 'undefined' || val < 0) {
    return 0;
  }

  if (val > 24000) {
    return 24000;
  }

  return val;
}