export default function Carousel(containerID, autoplayDefault = false) {
  const container = document.querySelector(containerID);
  const rightArrow = document.querySelector('.right-arrow');
  const leftArrow = document.querySelector('.left-arrow');
  const boxScreen = document.querySelectorAll('.carousel-screen');
  const numberOfScreen = boxScreen.length;
  const boxLine = document.querySelectorAll('.lines-container .line');
  let currentScreen = 0;
  let inAnimation = false;
  const animationTime = 500;
  const autoplay = autoplayDefault;

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

  // Implementation of animation methods
  function toLeft(screen) {
    screen.style.animation = 'to-left 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, animationTime);
  }

  function toRight(screen) {
    screen.style.animation = 'to-right 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, animationTime);
  }

  function comeRight(screen) {
    screen.style.animation = 'come-right 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, animationTime);
  }

  function comeLeft(screen) {
    screen.style.animation = 'come-left 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, animationTime);
  }

  /**
   * The function of flipping the slide to the right
   * @return void
   */
  function moveRight() {
    if (currentScreen < numberOfScreen - 1) {
      toLeft(boxScreen[currentScreen]);
      comeRight(boxScreen[currentScreen + 1]);
      setTimeout(() => {
        inAnimation = false;
        currentScreen++;
        sortPosition(
          boxScreen[currentScreen],
          boxScreen[currentScreen - 1],
          boxScreen[currentScreen + 1],
        );
      }, animationTime);
    } else {
      toLeft(boxScreen[currentScreen]);
      comeRight(boxScreen[0]);
      setTimeout(() => {
        inAnimation = false;
        currentScreen = 0;
        sortPosition(
          boxScreen[currentScreen],
          boxScreen[currentScreen - 1],
          boxScreen[currentScreen + 1],
        );
      }, animationTime);
    }
  }

  /**
   * The function of flipping the slide to the left
   * @return void
   */
  function moveLeft() {
    if (currentScreen > 0) {
      toRight(boxScreen[currentScreen]);
      comeLeft(boxScreen[currentScreen - 1]);
      setTimeout(() => {
        inAnimation = false;
        currentScreen--;
        sortPosition(
          boxScreen[currentScreen],
          boxScreen[currentScreen - 1],
          boxScreen[currentScreen + 1],
        );
      }, animationTime);
    } else {
      toRight(boxScreen[currentScreen]);
      comeLeft(boxScreen[numberOfScreen - 1]);
      setTimeout(() => {
        inAnimation = false;
        currentScreen = numberOfScreen - 1;
        sortPosition(
          boxScreen[currentScreen],
          boxScreen[currentScreen - 1],
          boxScreen[currentScreen + 1],
        );
      }, animationTime);
    }
  }

  /**
   * Start animation right or left
   * @param direction { string } - animation direction
   * @return void
   */
  function startAnimation(direction) {
    if (!inAnimation) {
      inAnimation = true;
      if (direction === 'right') {
        moveRight();
        coloringLine(boxLine[currentScreen + 1], 'right');
      } else if (direction === 'left') {
        moveLeft();
        coloringLine(boxLine[currentScreen - 1], 'left');
      } else {
        inAnimation = false;
      }
    }
  }

  /**
   * Slide switching function using lines
   * @param lineIndex { number } - index of the pressed line
   * @param direction { string } - of the direction of movement
   * @return void
   */
  function moveSlideLineClick(lineIndex, direction) {
    inAnimation = true;
    if (direction === 'right') {
      sortPosition(
        boxScreen[currentScreen],
        boxScreen[currentScreen - 1],
        boxScreen[lineIndex],
      );
      toLeft(boxScreen[currentScreen]);
      comeRight(boxScreen[lineIndex]);
    } else if (direction === 'left') {
      sortPosition(
        boxScreen[currentScreen],
        boxScreen[lineIndex],
        boxScreen[currentScreen + 1],
      );
      toRight(boxScreen[currentScreen]);
      comeLeft(boxScreen[lineIndex]);
    } else {
      inAnimation = false;
    }
    setTimeout(() => {
      inAnimation = false;
      currentScreen = lineIndex;
      sortPosition(
        boxScreen[currentScreen],
        boxScreen[currentScreen - 1],
        boxScreen[currentScreen + 1],
      );
    }, animationTime);
  }

  // Processing of clicking on the line
  boxLine.forEach((line) => {
    line.addEventListener('click', (event) => {
      if (!inAnimation) {
        const arrLine = Array.prototype.slice.call(boxLine);
        const lineIndex = arrLine.indexOf(event.target);
        // applying the current line coloring function
        coloringLine(event.target, 'none');
        if (lineIndex > currentScreen) {
          moveSlideLineClick(lineIndex, 'right');
        } else if (lineIndex < currentScreen) {
          moveSlideLineClick(lineIndex, 'left');
        }
      }
    });
  });

  // Processing of clicking on the right arrow
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      startAnimation('right');
    });
  }

  // Processing of clicking on the left arrow
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      startAnimation('left');
    });
  }

  // initial display of the first slide
  sortPosition(
    boxScreen[currentScreen],
    boxScreen[currentScreen - 1],
    boxScreen[currentScreen + 1],
  );
  // initial style addition to the first line
  coloringLine(boxLine[0], 'none');
}
