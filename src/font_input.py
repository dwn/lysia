from fasthtml.common import *

def moveCursor(direction):
    return f"moveCursor('{direction}')"

def font_input(**kw):
  sty = StyleX('src/font_input.css')
  scr = ScriptX('src/font_input.js')

  return Div(Div(
      Span("◀", cls="icon-left", onclick=moveCursor('left')),
      Input(cls="input-with-icons", id="font-glyph-code"),
      Span("▶", cls="icon-right", onclick=moveCursor('right')),
    cls="input-container"),
    Div(id="selector-container", cls="selector-container", style=f"height:{kw.get('height', '16rem')}"),
    sty, scr, **kw)
