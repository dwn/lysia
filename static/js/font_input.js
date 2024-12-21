$(document).ready(() => {
  function selectItem(item, char) {
    document.querySelectorAll('.selector-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    console.log(`Selected: ${char}`);
  }

  for(let i = 33; i < 256; i++) {
    if ((i > 126 && i < 161) || [43, 45, 92, 95, 124, 173].includes(i)) continue;
    const char = String.fromCharCode(i);
    const item = document.createElement('div');
    item.classList.add('selector-item');
    item.innerHTML = `<div style="display: inline-block; width: 2.2rem"><span style="color:#f5f6fa; font-size:1rem">${char}</span></div>${i}`;
    item.tabIndex = 0;
    item.addEventListener('click', () => {
      selectItem(item, char);
    });
    if (i == 33) selectItem(item, char);
    $('#selector-container')[0].appendChild(item);
  }

  const canvas = $('#font-canvas')[0];
  const input = $('#font-glyph-code')[0];
  let inputCode = '';
  let isInputReady = false;
  const pos = [
    ['a','a-','b','b-','c','c-','d','d-','e','e-'],
    ['a|','a+','b|','b+','c|','c+','d|','d+','e|','e+'],
    ['f','f-','g','g-','h','h-','i','i-','j','j-'],
    ['f|','f+','g|','g+','h|','h+','i|','i+','j|','j+'],
    ['k','k-','l','l-','m','m-','n','n-','o','o-'],
    ['k|','k+','l|','l+','m|','m+','n|','n+','o|','o+'],
    ['p','p-','q','q-','r','r-','s','s-','t','t-'],
    ['p|','p+','q|','q+','r|','r+','s|','s+','t|','t+'],
    ['u','u-','v','v-','w','w-','x','x-','y','y-'],
    ['u|','u+','v|','v+','w|','w+','x|','x+','y|','y+'],
    ['z','z-',']',']-','^','^-','_','_-','`','`-'],
    ['z|','z+',']|',']+','^|','^+','_|','_+','`|','`+']
  ];

  $('#font-glyph-code')[0].addEventListener('change', () => {
    inputCode = input.value;
    isInputReady = true;

    //$('.wrap-everything').
  });

  function removeAllPoints() {
    let p = null;
    for(;;) {
      p = $('.point');
      if (!p.length) break; //Shouldn't be necessary, but is
      $('.main-1')[0].removeChild(p[0]);
    }
  }

  function addPointByIndex(xIndex, yIndex, updateInputText = true) {
    if (updateInputText) {
      if (input.value.length > 0) input.value += '/';
      input.value += pos[yIndex][xIndex];
    }
    const canvasRect = canvas.getBoundingClientRect();
    xStep = canvasRect.width * .1;
    yStep = canvasRect.height * .1;
    const mainOffset = $('#main').offset();
    const main1Offset = $('.main-1').offset();
    const xGrid = (.5 + xIndex) * xStep - mainOffset.left + main1Offset.left;
    const yGrid = (1 + yIndex) * yStep - mainOffset.top + main1Offset.top;
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.left = `${ xGrid }px`;
    point.style.top = `${ yGrid }px`;
    $('.main-1')[0].appendChild(point);
  }

  function addPointByPositionCode(positionCode, updateInputText = true) {
    //Look up positionCode in pos table
    let xIndex = -1;
    let yIndex = -1;
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos[i].length; j++) {
        if (pos[i][j] === positionCode) {
          xIndex = j;
          yIndex = i;
          break;
        }
      }
    }
    if (xIndex === -1 || yIndex === -1) return;
    addPointByIndex(xIndex, yIndex, updateInputText);
  }

  function addPointByWindowCoordinate(xo, yo, updateInputText = true) {
    const main1Rect = $('.main-1')[0].getBoundingClientRect();
    const dx = xo - main1Rect.left;
    const dy = yo - main1Rect.top;
    xIndex = Math.round(((dx / main1Rect.width) - .05) * 10);
    yIndex = Math.round(((dy / main1Rect.height) - .05) * 10);
    addPointByIndex(xIndex, yIndex, updateInputText);
  }

  function addCurvePoints(cursorPos, codeString) {
    const curveCode = ['/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let nearestPos = -1;
    let minDistance = Infinity;
    // Loop through the curveCode array
    for (let i = 0; i < curveCode.length; i++) {
      const codeChar = curveCode[i];
      let pos = codeString.indexOf(codeChar);
      // Search for all occurrences of the current curveCode character
      while (pos !== -1) {
        // Calculate the distance from cursorPos
        const distance = Math.abs(cursorPos - pos);
        // If this is the closest match, update the nearest position
        if (distance < minDistance) {
          minDistance = distance;
          nearestPos = pos;
        }
        // Continue searching for the next occurrence of this character
        pos = codeString.indexOf(codeChar, pos + 1);
      }
    }
    // NearestPos is the index of the curve code character that is closest to the cursor
    // Just before this index, we would expect to find some code matching one of the elements in pos
    // Just after this index, we would expect to find some code matching one of the elements in pos
    // Find the code before and after nearestPos
    let beforeCode = '';
    let afterCode = '';
    // Find the code before nearestPos
    for (let i = nearestPos - 1; i >= 0; i--) {
      if (pos.some(row => row.includes(codeString[i]+codeString[i+1]))) {
        beforeCode = codeString[i]+codeString[i+1];
        break;
      }
      if (pos.some(row => row.includes(codeString[i]))) {
        beforeCode = codeString[i];
        break;
      }
    }
    // Find the code after nearestPos
    for (let i = nearestPos + 1; i < codeString.length; i++) {
      if (pos.some(row => row.includes(codeString[i]+codeString[i+1]))) {
        afterCode = codeString[i]+codeString[i+1];
        break;
      }
      if (pos.some(row => row.includes(codeString[i]))) {
        afterCode = codeString[i];
        break;
      }
    }
    // Add the two points
    addPointByPositionCode(beforeCode, updateInputText = false);
    addPointByPositionCode(afterCode, updateInputText = false);
  }

  function updateCurvePoints() {
    removeAllPoints();
    addCurvePoints(input.selectionStart, input.value);
  }

  canvas.addEventListener('click', (ev) => {
    console.log('Click');
    addPointByWindowCoordinate(ev.clientX, ev.clientY); // This will update the value of the input box
    updateCurvePoints();
    input.focus();
    updateArrows();
  });

  canvas.addEventListener('touchend', (ev) => {
    const touch = ev.changedTouches[0];
    addPointByWindowCoordinate(touch.clientX, touch.clientY);
    updateCurvePoints();
    input.focus();
    updateArrows();
  });

  input.addEventListener('click', updateCurvePoints);
  input.addEventListener('keyup', updateCurvePoints);
  input.addEventListener('mousedown', updateCurvePoints);
  input.addEventListener('touchstart', updateCurvePoints);
  input.addEventListener('touchmove', updateCurvePoints);
  input.addEventListener('touchend', updateCurvePoints);
  input.addEventListener('touchcancel', updateCurvePoints);
  input.addEventListener('touchleave', updateCurvePoints);
  input.addEventListener('touchenter', updateCurvePoints);

  function moveCursor(direction) {
    const input = document.getElementById('font-glyph-code');
    const cursorPos = input.selectionStart;
    if (direction === 'left') {
      if (cursorPos > 0) {
        input.setSelectionRange(cursorPos - 1, cursorPos - 1);
      }
    } else if (direction === 'right') {
      if (cursorPos < input.value.length) {
        input.setSelectionRange(cursorPos + 1, cursorPos + 1);
      }
    }
    input.focus();
    updateArrows();
  }

  const leftArrow = $('.icon-left')[0];
  const rightArrow = $('.icon-right')[0];

  function updateArrows() {
    const cursorPos = input.selectionStart;
    const inputValue = input.value;
    // Hide/show the left arrow
    if (cursorPos === 0 || inputValue === '') {
      leftArrow.style.visibility = 'hidden';
    } else {
      leftArrow.style.visibility = 'visible';
    }
    // Hide/show the right arrow
    if (cursorPos === inputValue.length || inputValue === '') {
      rightArrow.style.visibility = 'hidden';
    } else {
      rightArrow.style.visibility = 'visible';
    }
    // If input is empty, hide both arrows
    if (inputValue === '') {
      leftArrow.style.visibility = 'hidden';
      rightArrow.style.visibility = 'hidden';
    }
  }

  leftArrow.addEventListener('click', () => {
    moveCursor('left');
    updateCurvePoints();
  });
  rightArrow.addEventListener('click', () => {
    moveCursor('right');
    updateCurvePoints();
  });

  // Add event listeners to trigger the arrow visibility update
  input.addEventListener('input', updateArrows);
  input.addEventListener('click', updateArrows);
  input.addEventListener('keyup', updateArrows);

  // On resize, recalculate the two points
  window.addEventListener('resize', updateCurvePoints);

  // Initially check arrow visibility on load
  updateArrows();
});