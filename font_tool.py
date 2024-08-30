from fasthtml.common import *

def font_tool(**kw):
  sty = StyleX('static/font_tool.css')
  scr = ScriptX('static/lib/imagetracer.js')
  scr2 = ScriptX('static/font_tool.js')
  return Div(
      Canvas(id="font-canvas", width="500", height="500"),
      Canvas(id='scratch-canvas', width='500', height='500'),
      Img(id='scratch-img', alt='scratch'),
    sty, scr, scr2, **kw)
