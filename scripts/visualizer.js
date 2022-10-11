let analyzer; // For visualization
let bufferLength;
let dataArray; // our uint8 array of happy little things


let canvas;
let ctx;
let WIDTH = 300;
let HEIGHT = 100;

function initializeVisualizer() {

  analyser = context.createAnalyser();
  source.connect(analyser);

  analyser.fftSize = 2048;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  // set up our canvas
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  console.log("[Audio] Loaded visualizer");

  draw();
}

// To be called by other methods
function reconnectAnalyzer(src) {
  src.connect(analyser);
}


function doVizSample() {
  analyser.getByteTimeDomainData(dataArray);
  console.log(dataArray);
}

function draw() {

  const drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  ctx.fillStyle = "rgb(30,144,255)";

  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(240,248,255)";
  ctx.beginPath();

  const sliceWidth = WIDTH / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * (HEIGHT / 2);
  
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  
    x += sliceWidth;
  }

  ctx.lineTo(WIDTH, HEIGHT/2);
  ctx.stroke();

}

