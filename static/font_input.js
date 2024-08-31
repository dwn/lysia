for(let i = 33; i < 256; i++) {
  if ((i > 126 && i < 161) || [43, 45, 92, 95, 124, 173].includes(i)) continue;
  const char = String.fromCharCode(i);
  const item = document.createElement('div');
  item.classList.add('selector-item');
  item.innerHTML = `<span style="color: #f5f6fa; font-size: 1rem; font-family: 'Arial Narrow'">${char}</span>&emsp;${i}`;
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
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const left = canvasRect.left + scrollLeft;
  const top = canvasRect.top + scrollTop;
  const adjustedX = xo - left;
  const adjustedY = yo - top;
  const x = adjustedX / canvasRect.width;
  const y = adjustedY / canvasRect.height;
  const xStep = canvasRect.width * 0.1;
  const yStep = canvasRect.height * 0.1;
  xIndex = Math.round((x - .05) * 10);
  yIndex = Math.round((y - .05) * 10);
  pos = [
    ['A','A-','B','B-','C','C-','D','D-','E','E-'],
    ['A|','A+','B|','B+','C|','C+','D|','D+','E|','E+'],
    ['F','F-','G','G-','H','H-','I','I-','J','J-'],
    ['F|','F+','G|','G+','H|','H+','I|','I+','J|','J+'],
    ['K','K-','L','L-','M','M-','N','N-','O','O-'],
    ['K|','K+','L|','L+','M|','M+','N|','N+','O|','O+'],
    ['P','P-','Q','Q-','R','R-','S','S-','T','T-'],
    ['P|','P+','Q|','Q+','R|','R+','S|','S+','T|','T+'],
    ['U','U-','V','V-','W','W-','X','X-','Y','Y-'],
    ['U|','U+','V|','V+','W|','W+','X|','X+','Y|','Y+'],
    ['Z','Z-',']',']-','^','^-','_','_-','`','`-'],
    ['Z|','Z+',']|',']+','^|','^+','_|','_+','`|','`+']
  ];
  input.value += pos[yIndex][xIndex];
  const xf = xStep * (xIndex + 0.5);
  const yf = yStep * (yIndex + 0.5);
  const point = document.createElement('div');
  point.classList.add('point');
  point.style.left = `${left + xf}px`;
  point.style.top = `${top + yf}px`;
  document.body.appendChild(point);
}

canvas.addEventListener('click', (event) => {
  showPoint(event.clientX, event.clientY);
});

canvas.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  showPoint(touch.clientX, touch.clientY);
});
