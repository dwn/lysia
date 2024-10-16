from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request
import markdown2 as md
import util as ut
#from lcars import lcars
#from font_tool import font_tool
#from font_input import font_input
app = FastAPI()
# Use Jinja2 templates for HTML rendering
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
favicon = "data:image/svg+xml,<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='white' viewBox='0 0 24 24'><path stroke='gray' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'/></svg>"
############################################
# Home page route
############################################
@app.get("/", response_class=HTMLResponse)
def get_home(request: Request):
  # Convert markdown to HTML using markdown2
  html_content = md.markdown('# Colibri')
  return templates.TemplateResponse("index.html", {
    "request": request,
    "title": "Lysia - Briefing",
    "content": html_content
  })
############################################
# Font page route
############################################
@app.get("/font", response_class=HTMLResponse)
def get_font(request: Request):
  # Read markdown content from a file
  brief_md = md.markdown(ut.read('md/brief.md'))
  font_tool_html = ut.read("templates/font_tool.html")  # Assuming font_tool returns HTML content
  font_input_html = ut.read("templates/font_input.html")  # Assuming font_input returns HTML
  # Prepare content for the template
  context = {
    "request": request,
    "title": "Lysia - Font",
    "headline": "system lysia",
    "brief": brief_md,
    "primary_contents": font_tool_html,
    "wing_contents": font_input_html,
    "bottom_contents": md.markdown("## Hello, World!")
  }
  # Use lcars template to combine components
  return templates.TemplateResponse("lcars.html", context)
############################################
# Route to serve HTMX content dynamically
############################################
@app.get("/data-cascade", response_class=HTMLResponse)
def get_data_cascade():
  # Example dynamic content returned for HTMX request
  return HTMLResponse("""
    <div>
      <div>Dynamic Data Row 1</div>
      <div>Dynamic Data Row 2</div>
    </div>
  """)
############################################
# To run the app
############################################
if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)
