from fasthtml.common import *

def font_input(**kw):
  sty = StyleX('static/font_input.css')
  scr = ScriptX('static/font_input.js')
  return Div(Input(id='font-glyph-code', type='text', value=''),
      Div(id="selector-container", cls="selector-container", style=f"height:{kw.get('height', '16rem')}"),
    sty, scr, **kw)
