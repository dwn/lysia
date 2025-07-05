import math
from typing import List, Tuple
from urllib.parse import urlsplit, unquote
##########################################
# ASCII FUNCTIONS
##########################################
# Converts a character code to a properly escaped and printable character, maintaining escaping on special markdown characters
def char(i): 
  c = '\\' + chr(i)
  return (c[1] if len(c) > 1 and c != '\\#' and c != '\\*' else c)
# Converts character string to ascii value, taking only the last character, not any escaping
def asc(c): 
  return (ord(c[-1]) if len(c) > 1 else ord(c))
##########################################
# FILE FUNCTIONS
##########################################
# Reads multiple files from an array of filenames (or just one file from a string)
def read(file_paths):
  contents = []
  if isinstance(file_paths, str):
    file_paths = [file_paths]
    not_array = True
  for file_path in file_paths:
    try:
      with open(file_path, 'r') as file:
        content = file.read()
        contents.append(content)
    except FileNotFoundError:
      contents.append(None)
  return contents[0] if not_array else contents
##########################################
# COLOR FUNCTIONS
##########################################
num_spectrum_colors_in_octave = 12
color = {}
spectrum_anchors = [
  (380, '000000'), # Black
  (421, '8000f0'), # Violet
  (446, '4000c0'), # Indigo
  (473, '3444ff'), # Blue
  (499, '00e0e0'), # Cyan
  (528, '00cc10'), # Green
  (559, 'c6d000'), # Lemon
  (590, 'fac000'), # Amber
  (623, 'f05000'), # Orange
  (658, 'ff0007'), # Red
  (690, 'd10007'), # Cardamine
  (742, '000000'), # Black
]
# On-the-fly color interpolation from wavelength (nm)
def spectrum_hex_from_nm(nm: int) -> str:
  def hex_to_rgb(h: str) -> Tuple[int, int, int]:
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
  def rgb_to_hex(rgb: Tuple[int, int, int]) -> str:
    return '{:02x}{:02x}{:02x}'.format(*rgb)
  def lerp(a, b, t): 
    return int(a + (b - a) * t)
  if nm < 380 or nm > 740:
    return '#000000'
  for i in range(len(spectrum_anchors) - 1):
    nm1, hex1 = spectrum_anchors[i]
    nm2, hex2 = spectrum_anchors[i + 1]
    if nm1 <= nm <= nm2:
      t = (nm - nm1) / (nm2 - nm1)
      rgb1 = hex_to_rgb(hex1)
      rgb2 = hex_to_rgb(hex2)
      rgb_interp = tuple(lerp(rgb1[j], rgb2[j], t) for j in range(3))
      return '#' + rgb_to_hex(rgb_interp)
  return '#000000'
# Defines a color octave with num_spectrum_colors divisions, starting with baseColor_THz
# color_index runs from lowest red (0) to highest violet (num_spectrum_colors - 1)
# Optional return type: 'hex' (default), 'THz' (frequency), 'nm' (wavelength)
def spectrum(color_index, return_type='hex', base_color_thz=400, index_offset=0):
  color_index += index_offset
  c_over_1000 = 299792.458  # speed of light in nm/THz
  base_color_nm = c_over_1000 / base_color_thz
  thz = 2**(color_index / num_spectrum_colors_in_octave) * c_over_1000 / base_color_nm
  nm = c_over_1000 / thz
  if return_type == 'nm':
    return round(nm)
  if return_type == 'THz':
    return round(thz, 3)
  if return_type == 'cents':
    cents = 1200 * math.log2(thz / base_color_thz)
    return round(cents)
  nm_rounded = round(nm)
  return spectrum_hex_from_nm(nm_rounded)
# Set hex colors from palette
def set_colors(palette):
  global color
  color = {}
  for key, val in palette.items():
    if isinstance(val, int):
      # Single index, add the hex color directly
      color[key] = spectrum(val)
    elif isinstance(val, list):
      # Blending, calculate the average hex color
      num_colors = len(val)
      blended_color = '#'
      r_total, g_total, b_total = 0, 0, 0
      for i in val:
        hex_color = spectrum(i)
        r_total += int(hex_color[1:3], 16)
        g_total += int(hex_color[3:5], 16)
        b_total += int(hex_color[5:7], 16)
      blended_color += format(r_total // num_colors, '02x')
      blended_color += format(g_total // num_colors, '02x')
      blended_color += format(b_total // num_colors, '02x')
      color[key] = blended_color
# Display palette colors and spectrum
def show_colors():
  html = ""
  if color:
    html += "<h5>symmetric-diatonic</h5><br>"
    i = 0
    for key, val in color.items():
      html += f'<div style="width:100%; text-align:center; color:ivory; background-color:{val}; text-shadow:-1px -1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,1px 1px 0 #000">{key} | {i} | {val}</div><br>'
      i += 1
  html += '<h5>12-tone</h5><br>'
  for i in range(0, num_spectrum_colors_in_octave + 1):
    html += '<div style="width:100%; text-align:center; color:ivory; background-color:{hex}; text-shadow:-1px -1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,1px 1px 0 #000">{index} | {hex} | {nm} nm | {THz} THz | {cents} ¢</div><br>'.format(
      index=i,
      hex=spectrum(i),
      nm=spectrum(i, 'nm'),
      THz=spectrum(i, 'THz'),
      cents=spectrum(i, 'cents')
    )
  return html
