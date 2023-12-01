class Carousel {
  constructor(containerId, options = {}) {
    this.container = document.querySelector(containerId);
    this.rightArrow = null;
    this.leftArrow = null;
    this.boxScreen = document.querySelectorAll('.carousel-screen');
    this.numberOfScreen = this.boxScreen.length;
    this.boxLine = null;
    this.containerLines = null;
    this.line = null;
    this.label = null;
    this.currentScreen = 0;
    this.inAnimation = false;
    this.animationTime = 500;
    this.autoplayInterval = 5000;
    this.autoplayDelay =
      options && options.autoplayDelay ? options.autoplayDelay : 0;
    this.autoplayEnabled = options && options.autoplayEnabled;

    this.initialize();
    this.addEventListeners();
    this.sortPosition(
      this.boxScreen[this.currentScreen],
      this.boxScreen[this.currentScreen - 1],
      this.boxScreen[this.currentScreen + 1],
    );

    if (this.autoplayEnabled) {
      this.startAutoplay();
    }
  }

  initialize() {
    if (!this.container) {
      console.error('Carousel element not found.');
    }

    this.containerLines = document.createElement('div');
    this.containerLines.classList.add('lines-container');
    this.container.appendChild(this.containerLines);

    for (let i = 0; i < this.numberOfScreen; i++) {
      this.line = document.createElement('div');
      this.line.classList.add('line');
      this.containerLines.appendChild(this.line);
    }

    this.leftArrow = document.createElement('div');
    this.leftArrow.classList.add('left-arrow');
    this.container.appendChild(this.leftArrow);
    this.label = document.createElement('span');
    this.label.classList.add('label', 'left');
    this.leftArrow.appendChild(this.label);

    this.rightArrow = document.createElement('div');
    this.rightArrow.classList.add('right-arrow');
    this.container.appendChild(this.rightArrow);
    this.label = document.createElement('span');
    this.label.classList.add('label', 'right');
    this.rightArrow.appendChild(this.label);

    this.boxLine = document.querySelectorAll('.lines-container .line');
    this.coloringLine(this.boxLine[0], 'none');
  }

  addEventListeners() {
    this.boxLine.forEach((line) => {
      line.addEventListener('click', (event) => {
        if (!this.inAnimation) {
          const arrLine = Array.prototype.slice.call(this.boxLine);
          const lineIndex = arrLine.indexOf(event.target);
          // applying the current line coloring function
          this.coloringLine(event.target, 'none');
          if (lineIndex > this.currentScreen) {
            this.moveSlideLineClick(lineIndex, 'right');
          } else if (lineIndex < this.currentScreen) {
            this.moveSlideLineClick(lineIndex, 'left');
          }
        }
      });
    });

    // Processing of clicking on the right arrow
    if (this.rightArrow) {
      this.rightArrow.addEventListener('click', () => {
        this.startAnimation('right');
      });
    }

    // Processing of clicking on the left arrow
    if (this.leftArrow) {
      this.leftArrow.addEventListener('click', () => {
        this.startAnimation('left');
      });
    }
  }

  startAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }

    this.autoplayInterval = setInterval(() => {
      this.startAnimation('right');
    }, this.autoplayDelay);
  }

  /* stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  } */

  /**
   * Slide sorting function by position, avoid overlapping slides
   * @param mainScreen { object } - main slide
   * @param leftScreen { object } - previous slide
   * @param rightScreen { object } - next slide
   * @return void
   */
  sortPosition(mainScreen, leftScreen, rightScreen) {
    // Repeat first screen again if rightScreen is undefined
    if (rightScreen === undefined) {
      rightScreen = this.boxScreen[0];
    }
    // Repeat last screen again if leftScreen is undefined
    if (leftScreen === undefined) {
      leftScreen = this.boxScreen[this.numberOfScreen - 1];
    }

    this.boxScreen.forEach((screen) => {
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
  coloringLine(lineSelect, direction) {
    if (lineSelect === undefined && direction === 'right') {
      lineSelect = this.boxLine[0];
    } else if (lineSelect === undefined && direction === 'left') {
      lineSelect = this.boxLine[this.numberOfScreen - 1];
    }
    this.boxLine.forEach((line) => {
      if (line === lineSelect) {
        line.classList.add('line-fill');
      } else {
        line.classList.remove('line-fill');
      }
    });
  }

  // Implementation of animation methods
  toLeft(screen) {
    screen.style.animation = 'to-left 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, this.animationTime);
  }

  toRight(screen) {
    screen.style.animation = 'to-right 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, this.animationTime);
  }

  comeRight(screen) {
    screen.style.animation = 'come-right 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, this.animationTime);
  }

  comeLeft(screen) {
    screen.style.animation = 'come-left 0.5s ease-in-out forwards';
    setTimeout(() => {
      screen.style.animation = '';
    }, this.animationTime);
  }

  /**
   * The function of flipping the slide to the right
   * @return void
   */
  moveRight() {
    if (this.currentScreen < this.numberOfScreen - 1) {
      this.toLeft(this.boxScreen[this.currentScreen]);
      this.comeRight(this.boxScreen[this.currentScreen + 1]);
      setTimeout(() => {
        this.inAnimation = false;
        this.currentScreen++;
        this.sortPosition(
          this.boxScreen[this.currentScreen],
          this.boxScreen[this.currentScreen - 1],
          this.boxScreen[this.currentScreen + 1],
        );
      }, this.animationTime);
    } else {
      this.toLeft(this.boxScreen[this.currentScreen]);
      this.comeRight(this.boxScreen[0]);
      setTimeout(() => {
        this.inAnimation = false;
        this.currentScreen = 0;
        this.sortPosition(
          this.boxScreen[this.currentScreen],
          this.boxScreen[this.currentScreen - 1],
          this.boxScreen[this.currentScreen + 1],
        );
      }, this.animationTime);
    }
  }

  /**
   * The function of flipping the slide to the left
   * @return void
   */
  moveLeft() {
    if (this.currentScreen > 0) {
      this.toRight(this.boxScreen[this.currentScreen]);
      this.comeLeft(this.boxScreen[this.currentScreen - 1]);
      setTimeout(() => {
        this.inAnimation = false;
        this.currentScreen--;
        this.sortPosition(
          this.boxScreen[this.currentScreen],
          this.boxScreen[this.currentScreen - 1],
          this.boxScreen[this.currentScreen + 1],
        );
      }, this.animationTime);
    } else {
      this.toRight(this.boxScreen[this.currentScreen]);
      this.comeLeft(this.boxScreen[this.numberOfScreen - 1]);
      setTimeout(() => {
        this.inAnimation = false;
        this.currentScreen = this.numberOfScreen - 1;
        this.sortPosition(
          this.boxScreen[this.currentScreen],
          this.boxScreen[this.currentScreen - 1],
          this.boxScreen[this.currentScreen + 1],
        );
      }, this.animationTime);
    }
  }

  /**
   * Start animation right or left
   * @param direction { string } - animation direction
   * @return void
   */
  startAnimation(direction) {
    if (!this.inAnimation) {
      this.inAnimation = true;
      if (direction === 'right') {
        this.moveRight();
        this.coloringLine(this.boxLine[this.currentScreen + 1], 'right');
      } else if (direction === 'left') {
        this.moveLeft();
        this.coloringLine(this.boxLine[this.currentScreen - 1], 'left');
      } else {
        this.inAnimation = false;
      }
    }
  }

  /**
   * Slide switching function using lines
   * @param lineIndex { number } - index of the pressed line
   * @param direction { string } - of the direction of movement
   * @return void
   */
  moveSlideLineClick(lineIndex, direction) {
    this.inAnimation = true;
    if (direction === 'right') {
      this.sortPosition(
        this.boxScreen[this.currentScreen],
        this.boxScreen[this.currentScreen - 1],
        this.boxScreen[lineIndex],
      );
      this.toLeft(this.boxScreen[this.currentScreen]);
      this.comeRight(this.boxScreen[lineIndex]);
    } else if (direction === 'left') {
      this.sortPosition(
        this.boxScreen[this.currentScreen],
        this.boxScreen[lineIndex],
        this.boxScreen[this.currentScreen + 1],
      );
      this.toRight(this.boxScreen[this.currentScreen]);
      this.comeLeft(this.boxScreen[lineIndex]);
    } else {
      this.inAnimation = false;
    }
    setTimeout(() => {
      this.inAnimation = false;
      this.currentScreen = lineIndex;
      this.sortPosition(
        this.boxScreen[this.currentScreen],
        this.boxScreen[this.currentScreen - 1],
        this.boxScreen[this.currentScreen + 1],
      );
    }, this.animationTime);
  }
}
