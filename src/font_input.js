for(let i = 33; i < 256; i++) {
  if ((i > 126 && i < 161) || [43, 45, 92, 95, 124, 173].includes(i)) continue;
  const char = String.fromCharCode(i);
  const item = document.createElement('div');
  item.classList.add('selector-item');
  item.innerHTML = `<span style="color:#f5f6fa; font-size:1rem; font-family:'Arial Narrow'">${char}</span>&emsp;${i}`;
  item.tabIndex = 0;
  item.addEventListener('click', () => {
    document.querySelectorAll('.selector-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    console.log(`Selected: ${char}`);
  });
  me('#selector-container').appendChild(item);
}

const canvas = me('#font-canvas');
const input = me('#font-glyph-code');

me('#font-glyph-code').addEventListener('change', () => {
  const code = input.value;
  console.log(`Code: ${code}`);
  //me('.wrap-everything').
});

function showPoint(xo, yo) {
  const canvasRect = canvas.getBoundingClientRect();
  const mainRect = me('main').getBoundingClientRect();
  const topOffset = (me('main').clientHeight - me('.main-1').clientHeight) * .5;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const left = canvasRect.left - mainRect.left + scrollLeft;
  const top = canvasRect.top - mainRect.top + scrollTop;// + topOffset;
  const adjustedX = xo - canvasRect.left - scrollLeft;
  const adjustedY = yo - canvasRect.top - scrollTop;
  const x = adjustedX / canvasRect.width;
  const y = adjustedY / canvasRect.height;
  const xStep = canvasRect.width * 0.1;
  const yStep = canvasRect.height * 0.1;
  xIndex = Math.round((x - 0.05) * 10);
  yIndex = Math.round((y - 0.05) * 10);
  pos = [
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
  input.value += pos[yIndex][xIndex];
  const xf = xStep * (xIndex + 0.5);
  const yf = yStep * (yIndex + 0.5);
  const point = document.createElement('div');
  point.classList.add('point');
  point.style.left = `${left + xf}px`;
  point.style.top = `${top + yf}px`;
  me('.main-top').appendChild(point);
}

canvas.addEventListener('click', (event) => {
  showPoint(event.clientX, event.clientY);
});

canvas.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  showPoint(touch.clientX, touch.clientY);
});

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
}
