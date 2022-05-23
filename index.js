/** Game constants */
const canvas = document.querySelector(".canvas");
const player = document.querySelector(".player");
const frameInterval = 1000 / 25; // 40 FPS
const maxPlayerVelocity = 15;
const LEFT_ARROW = "ArrowLeft";
const RIGHT_ARROW = "ArrowRight";
const UP_ARROW = "ArrowUp";
const DOWN_ARROW = "ArrowDown";

/** Game variables */
let playerVelocity_X = 0;
let playerVelocity_Y = 0;
let playerDirection = "";

const initialPlayerStyles = getComputedStyle(player);
let playerStyles = initialPlayerStyles;

/** Game functions */
function sleep(timeMS) {
  return new Promise((resolve) => setTimeout(resolve, timeMS));
}

// Change style of any DOM element
function changeStyle(domElement, styleProp, propValue) {
  domElement.style[styleProp] = propValue;
}

// Get pixels from a string like so "50px", and returns an integer, e.g: 50
function getPixelsFromString(str) {
  const pxIndex = str.indexOf("px");
  const num = str.substring(0, pxIndex);
  try {
    return parseInt(num);
  } catch (e) {
    console.error(e);
  }
}

function init() {
  document.addEventListener("keydown", (evt) => {
    const keyCode = evt.code;
    if (keyCode === RIGHT_ARROW) {
      playerVelocity_X = maxPlayerVelocity;
      playerDirection = "RIGHT";
    } else if (keyCode === LEFT_ARROW) {
      playerVelocity_X = -maxPlayerVelocity;
      playerDirection = "LEFT";
    } else if (keyCode === DOWN_ARROW) {
      playerVelocity_Y = -maxPlayerVelocity;
      playerDirection = "DOWN";
    } else if (keyCode === UP_ARROW) {
      playerVelocity_Y = maxPlayerVelocity;
      playerDirection = "UP";
    }
  });

  document.addEventListener("keyup", (evt) => {
    const keyCode = evt.code;
    if (keyCode === RIGHT_ARROW) {
      playerVelocity_X = 0;
      playerDirection = "";
    } else if (keyCode === LEFT_ARROW) {
      playerVelocity_X = 0;
      playerDirection = "";
    } else if (keyCode === DOWN_ARROW) {
      playerVelocity_Y = 0;
      playerDirection = "";
    } else if (keyCode === UP_ARROW) {
      playerVelocity_Y = 0;
      playerDirection = "";
    }
  });
}

// Direction should be "UP", "DOWN", "LEFT" or "RIGHT"
function handleNewPlayerPosition(direction) {
  const validDirections = ["UP", "DOWN", "LEFT", "RIGHT"];

  if (validDirections.includes(direction) === false) {
    return;
  }

  // Four conditionals are used instead of two to handle the limits of the playable area
  // TODO: Handle the limits of the playable area
  if (direction === "LEFT") {
    const newPosition =
      getPixelsFromString(playerStyles.left) + playerVelocity_X + "px";
    changeStyle(player, "left", newPosition);
  } else if (direction === "RIGHT") {
    const newPosition =
      getPixelsFromString(playerStyles.left) + playerVelocity_X + "px";
    changeStyle(player, "left", newPosition);
  } else if (direction === "UP") {
    const newPosition =
      getPixelsFromString(playerStyles.bottom) + playerVelocity_Y + "px";
    changeStyle(player, "bottom", newPosition);
  } else if (direction === "DOWN") {
    const newPosition =
      getPixelsFromString(playerStyles.bottom) + playerVelocity_Y + "px";
    changeStyle(player, "bottom", newPosition);
  }
}

// The main loop, also called the "draw loop" in some videogames tutorials
async function loop() {
  for (let i = 0; i > -1; i++) {
    handleNewPlayerPosition(playerDirection)

    await sleep(frameInterval);
  }
}

init();
loop();
