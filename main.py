import markdown2 as md
import lysia_util as ut
from font_tool import font_tool
from font_input import font_input
from lcars import lcars
from fasthtml.common import *
favicon = "data:image/svg+xml,<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='white' viewBox='0 0 24 24'><path stroke='gray' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'/></svg>"
app = FastHTML(hdrs=[
  Favicon(favicon, favicon),
  StyleX("main.css")])
rt = app.route
############################################
@rt('/')
def get():
  html = md.markdown('# Colibri')
  return Title('Lysia - Briefing'), Div(NotStr(html)) #+ str(font_tool_html)
############################################
@rt('/font')
def get():
  return Title('Lysia - Font'), lcars(font_tool(), headline="project lysia", menu=font_input(), bottom_elements=Div(NotStr(md.markdown('## Hello, World!'))))
  #font_tool_component = FontTool(theme=None, font_glyph_code='A')
  #font_tool_html = font_tool_component.render()
  #return Title('Colibri - Font'), Main(
  #  , cls='container')

############################################
serve()
