// let rightArrow = document.querySelector('.right-arrow');
// let leftArrow = document.querySelector('.right-arrow');
const boxScreen = document.querySelectorAll('.carousel-screen');
const numberOfScreen = boxScreen.length;
const boxLine = document.querySelectorAll('.lines-container .line');
const currentScreen = 0;
const inAnimation = false;
// let animationTime = 500

/**
 * Slide sorting function by position, avoid overlapping slides
 * @param mainScreen { object } - main slide
 * @param leftScreen { object } - previous slide
 * @param rightScreen { object } - next slide
 * @return void
 */
function sortPosition(mainScreen, leftScreen, rightScreen) {
  // Repeat first screen again if rightScreen is undefined
  if (rightScreen === undefined) {
    rightScreen = boxScreen[0];
  }
  // Repeat last screen again if leftScreen is undefined
  if (leftScreen === undefined) {
    leftScreen = boxScreen[numberOfScreen - 1];
  }

  boxScreen.forEach((screen) => {
    if (screen === mainScreen) {
      screen.style.display = 'block';
      screen.style.left = '0px';
    } else if (screen === leftScreen) {
      screen.style.display = 'block';
      screen.style.left = '-100%';
    } else if (screen === rightScreen) {
      screen.style.display = 'block';
      screen.style.left = '100%';
    } else {
      screen.style.display = 'none';
    }
  });
}

/**
 * Initial style addition to the first line
 * @param lineSelect { object } - selected line
 * @param direction
 * @return void
 */
function coloringLine(lineSelect, direction) {
  if (lineSelect === undefined && direction === 'right') {
    lineSelect = boxLine[0];
  } else if (lineSelect === undefined && direction === 'left') {
    lineSelect = boxLine[numberOfScreen - 1];
  }
  boxLine.forEach((line) => {
    if (line === lineSelect) {
      line.classList.add('line-fill');
    } else {
      line.classList.remove('line-fill');
    }
  });
}

// Processing of clicking on the line
boxLine.forEach((line) => {
  line.addEventListener('click', (event) => {
    if (!inAnimation) {
      // let arrLine = Array.prototype.slice.call(boxLine);
      // let lineIndex = arrLine.indexOf(event.target);
      // applying the current line coloring function
      coloringLine(event.target);
    }
  });
});

// initial display of the first slide
sortPosition(
  boxScreen[currentScreen],
  boxScreen[currentScreen - 1],
  boxScreen[currentScreen + 1],
);
// initial style addition to the first line
coloringLine(boxLine[0]);
