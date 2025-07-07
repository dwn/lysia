from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request
from starlette.responses import Response
import markdown2 as md
import util as ut
app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
ut.set_colors({
  "r": 1,
  "r_hover": 2,
  "o": 3,
  "y": 4,
  "y_hover": 5,
  "g": 6,
  "b_hover": 7,
  "b": 8,
  "i": 9,
  "v_hover": 10,
  "v": 11,
})
############################################
# Disables caching for all routes
############################################
@app.middleware("http")
async def add_cache_headers(request, call_next):
  response = await call_next(request)
  response.headers["Cache-Control"] = "no-store"
  response.headers["Pragma"] = "no-cache"
  response.headers["Expires"] = "0"
  return response
############################################
# Favicon route
############################################
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
  svg_content = "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#ffffff' viewBox='0 0 24 24'><path stroke='gray' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'/></svg>"
  return Response(content=svg_content, media_type="image/svg+xml")
############################################
# Home page route
############################################
@app.get("/", response_class=HTMLResponse)
def get_home_content(request: Request):
  brief_md = md.markdown(ut.read('static/md/brief.md'))
  print(ut.generate_hover_style())
  context = {
    "request": request,
    "head_contents": ut.generate_hover_style(),
    "title": "Lysia - Font",
    "headline": "system wfo",
    "headline_svg": ut.read("static/images/star-system.svg").replace("#000000", "#f70"),
    "brief": brief_md
  }
  return templates.TemplateResponse("lcars.html", context)
############################################
# Account page
############################################
@app.get("/account")
async def get_account_content(request: Request):
  primary_html = ut.show_colors()
  context = {
    "request": request,
    "primary_contents": primary_html,
    "wing_contents": "",
    "bottom_contents": ""
  }
  return templates.TemplateResponse("layout.html", context)
############################################
# Font page
############################################
@app.get("/font")
async def get_font_content(request: Request):
  primary_html = ut.read("templates/font_editor_primary.html")
  wing_html = ut.read("templates/font_editor_wing.html")
  context = {
    "request": request,
    "primary_contents": primary_html,
    "wing_contents": wing_html,
    "bottom_contents": md.markdown("## Hello, World!")
  }
  return templates.TemplateResponse("layout.html", context)
############################################
# Script page
############################################
@app.get("/script")
async def get_script_content(request: Request):
  primary_html = ut.read("templates/script_editor_primary.html")
  wing_html = ut.read("templates/script_editor_wing.html")
  context = {
    "request": request,
    "primary_contents": primary_html,
    "wing_contents": wing_html,
    "bottom_contents": md.markdown("## Hello, World!")
  }
  return templates.TemplateResponse("layout.html", context)
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
