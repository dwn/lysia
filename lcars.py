from fasthtml.common import *

def lcars(*args, **kw): # Star Trek ultra classic LCARS layout converted to FastHTML (https://www.thelcars.com/)
  sty = StyleX('static/lcars/lcars-ultra-classic.css')
  sty2 = StyleX('static/lcars/lcars-colors.css')
  scr = ScriptX('static/lib/jquery-3-7-0.min.js')
  scr2 = ScriptX('static/lcars/lcars.js')
  return Div(
    Section( #column-1
      Div( #lcars-frame
        Div( #1
          Div(cls="frame-col-1-cell-a"),
          Div(cls="frame-col-1-cell-b"),
          Div(cls="frame-col-1-cell-c"),
        cls="frame-col-1"),
        Div(cls="frame-col-2"), #2
        Div( #3
          Div(cls="line"), Div(cls="line"), Div(cls="line"), Div(cls="line"),
          Div(cls="line"), Div(cls="line"), Div(cls="line"), Div(cls="line"),
          Div(cls="line"), Div(cls="line"), Div(cls="line"), Div(cls="line"),
          Div(cls="line"), Div(cls="line"), Div(cls="line"), Div(cls="line"),
        cls="frame-col-3 display-vertical"),
        Div(cls="frame-col-4"), #4
        Div( #5
          Div(cls="frame-col-5-cell-a"),
          Div(cls="frame-col-5-cell-b"),
          Div(cls="frame-col-5-cell-c"),
        cls="frame-col-5"),
      cls="lcars-frame"),
      Div( #pillbox
        Div(A("J-001", href=""), cls="pill"),
        Div(A("R-002", href=""), cls="pill"),
        Div(A("R-003", href=""), cls="pill"),
        Div(A("I-004", href=""), cls="pill"),
        Div(A("C-005", href=""), cls="pill"),
        Div(A("A-006", href=""), cls="pill"),
      cls="pillbox"),
      Div( #lcars-list-2
        Ul(
          Li("Subspace Link: Established"),
          Li("Starfleet Database: Connected"),
          Li("Quantum Memory Field: stable"),
          Li("Optical Data Network: rerouting", cls="oc-almond-creme go-almond-creme")
        ),
      cls="lcars-list-2 uppercase"),
      Div( #pillbox
        Div(A("F12-22", href=""), cls="pill-2"),
        Div(A("G24-22", href=""), cls="pill-2"),
        Div(cls="pill-2"),
        Div(A("H-07AM", href=""), cls="pill-2"),
        Div(A("I50-72", href=""), cls="pill-2"),
        Div(A("J5369", href=""), cls="pill-2"),
      cls="pillbox"),
    id="column-1"),
    Section( #column-2
      Div("AA-1524", cls="section-2-panel-a"), #a
      Div(
        A("JS2B-01", href=""),
        A("IS2B-02", href=""),
        A("MS2B-03", href=""),
      cls="section-2-buttons"),
      Div(A("B2-0730", href=""), cls="section-2-panel-b"),
      Div("C-318", cls="section-2-panel-c"),
      Div("DL-44", cls="section-2-panel-d"),
      Div("E-3504", cls="section-2-panel-e"),
    id="column-2"),
    Section( #column-3
      Div( #top-menu wrap
        Div( #scroll-top
          A(Span("screen", cls="hop"), " top", id="scroll-top", href=""),
        cls="scroll-top"),
        Div( #left-frame-top
          Div(A("INSTRUCTIONS", href=""), cls="panel-1"),
          Div("02", Span("-262000", cls="hop"), cls="panel-2"),
        cls="left-frame-top"),
        Div( #right-frame-top
          Div( #top-menu-inside
            Div(kw.get("headline", "").replace(" "," ✧ "), " • ", Span("Online", cls="blink"), cls="banner"),
            Div( #data-cascade-button-group
              Div( #cascade-wrapper
                Div( #data-cascade
                  Div( #1
                    Div("101", cls="dc1"), Div("7109", cls="dc2"), Div("1966", cls="dc3"), Div("36", cls="dc4"),
                    Div("880", cls="dc5"), Div("11.03", cls="dc6"), Div("1954", cls="dc7"), Div("03", cls="dc8"),
                    Div("6.08", cls="dc9"), Div("241", cls="dc10"), Div("309", cls="dc11"), Div("7.08", cls="dc12"),
                    Div("1935", cls="dc13"), Div("12.20", cls="dc14"), Div("53", cls="dc15"), Div("1961", cls="dc15"),
                    Div("2.16", cls="dc15"),
                  cls="row-1"),
                  Div( #2
                    Div("102", cls="dc1"), Div("8102", cls="dc2"), Div("1987", cls="dc3"), Div("044", cls="dc4"),
                    Div("0051", cls="dc5"), Div("1968", cls="dc6"), Div("704", cls="dc7"), Div("10.31", cls="dc8"),
                    Div("1984", cls="dc9"), Div("1954", cls="dc10"), Div("764", cls="dc11"), Div("1940", cls="dc12"),
                    Div("9.9", cls="dc13"), Div("1972", cls="dc14"), Div("815", cls="dc15"), Div("4.12", cls="dc15"),
                    Div("2023", cls="dc15"),
                  cls="row-2"),
                  Div( #3
                    Div("103", cls="dc1"), Div("714", cls="dc2"), Div("1993", cls="dc3"), Div("0222", cls="dc4"),
                    Div("4.4", cls="dc5"), Div("1969", cls="dc6"), Div("2450", cls="dc7"), Div("91", cls="dc8"),
                    Div("56", cls="dc9"), Div("21", cls="dc10"), Div("716", cls="dc11"), Div("801", cls="dc12"),
                    Div("417", cls="dc13"), Div("602", cls="dc14"), Div("5618", cls="dc15"), Div("238", cls="dc15"),
                    Div("1443", cls="dc15"),
                  cls="row-3"),
                  Div( #4
                    Div("104", cls="dc1"), Div("6104", cls="dc2"), Div("1995", cls="dc3"), Div("3.22", cls="dc4"),
                    Div("1931", cls="dc5"), Div("0.0", cls="dc6"), Div("0000", cls="dc7"), Div("1701", cls="dc8"),
                    Div("1984", cls="dc9"), Div("218", cls="dc10"), Div("908", cls="dc11"), Div("10", cls="dc12"),
                    Div("85", cls="dc13"), Div("1888", cls="dc14"), Div("27", cls="dc15"), Div("2879", cls="dc15"),
                    Div("213", cls="dc15"),
                  cls="row-4"),
                  Div( #5
                    Div("105", cls="dc1"), Div("08", cls="dc2"), Div("2001", cls="dc3"), Div("713", cls="dc4"),
                    Div("079", cls="dc5"), Div("1977", cls="dc6"), Div("LV", cls="dc7"), Div("426", cls="dc8"),
                    Div("105", cls="dc9"), Div("10", cls="dc10"), Div("1642", cls="dc11"), Div("1979", cls="dc12"),
                    Div("402", cls="dc13"), Div("795", cls="dc14"), Div("361", cls="dc15"), Div("0852", cls="dc15"),
                    Div("984", cls="dc15"),
                  cls="row-5"),
                  Div( #6
                    Div("106", cls="dc1"), Div("31", cls="dc2"), Div("2017", cls="dc3"), Div("429", cls="dc4"),
                    Div("65", cls="dc5"), Div("871", cls="dc6"), Div("24", cls="dc7"), Div("541", cls="dc8"),
                    Div("656", cls="dc9"), Div("M", cls="dc10"), Div("113", cls="dc11"), Div("12.6", cls="dc12"),
                    Div("27", cls="dc13"), Div("05", cls="dc14"), Div("85", cls="dc15"), Div("12.25", cls="dc15"),
                    Div("7884", cls="dc15"),
                  cls="row-6"),
                  Div( #7
                    Div("107", cls="dc1"), Div("5", cls="dc2"), Div("2022", cls="dc3"), Div("784", cls="dc4"),
                    Div("3304", cls="dc5"), Div("42", cls="dc6"), Div("733", cls="dc7"), Div("1224", cls="dc8"),
                    Div("5801", cls="dc9"), Div("23", cls="dc10"), Div("1015", cls="dc11"), Div("84", cls="dc12"),
                    Div("36", cls="dc13"), Div("029", cls="dc14"), Div("24", cls="dc15"), Div("318", cls="dc15"),
                    Div("12.24", cls="dc15"),
                  cls="row-7"),
                  Div( #8
                    Div("108", cls="dc1"), Div("23", cls="dc2"), Div("174", cls="dc3"), Div("91", cls="dc4"),
                    Div("947", cls="dc5"), Div("28", cls="dc6"), Div("527", cls="dc7"), Div("04", cls="dc8"),
                    Div("0469", cls="dc9"), Div("2200", cls="dc10"), Div("88", cls="dc11"), Div("1985", cls="dc12"),
                    Div("540", cls="dc13"), Div("3121", cls="dc14"), Div("308", cls="dc15"), Div("9571", cls="dc15"),
                    Div("404", cls="dc15"),
                  cls="row-8"),
                cls="data-cascade", id="default"),
              cls="cascade-wrapper"),
              Nav(
                A(" • ".join(["01", "info"]), href="", id="b-one"),
                Div(id="blank"),
                A(" • ".join(["02", "font"]), href="", id="b-two"),
                A(" • ".join(["03", "script"]), href="", id="b-three"),
                A(" • ".join(["04", "writing"]), href="", id="b-four", cls="go-away"),
                A(" • ".join(["05", "account"]), href="", id="b-five"),
              ),
            cls="data-cascade-button-group"),
          cls="top-menu-inside"),
          Div(
            Div(cls="bar-1"), Div(cls="bar-2"), Div(cls="bar-3"), Div(cls="bar-4"), Div(cls="bar-5"),
          cls="bar-panel first-bar-panel"),
        cls="right-frame-top"),
      cls="top-menu wrap"),
      Div( #wrap gap
        Div( #left-frame
          Div(
            Div("03", Span("-111968", cls="hop"), cls="panel-3"),
            Div("04", Span("-041969", cls="hop"), cls="panel-4"),
            Div("05", Span("-1701D", cls="hop"), cls="panel-5"),
            Div("06", Span("-071984", cls="hop"), cls="panel-6"),
            Div("07", Span("-081940", cls="hop"), cls="panel-7"),
            Div("08", Span("-47148", cls="hop"), cls="panel-8"),
            Div("09", Span("-081966", cls="hop"), cls="panel-9")
          ),
          Div(
            Div("10", Span("-31", cls="hop"), cls="panel-10")
          ),
        cls="left-frame"),
        Div( #right-frame
          Div( #bar-panel
            Div(cls="bar-6"), Div(cls="bar-7"), Div(cls="bar-8"), Div(cls="bar-9"), Div(cls="bar-10"),
          cls="bar-panel"),
          Main(
            Div(
              Div(
                *args,
              cls="main-1"),
              Div(
                Div(
                  Div(
                    kw.get("menu", ""),
                  cls="main-2-text"),
                cls="main-2-inside"),
                Div(
                  Span("22", cls="hop"),
                  "47",
                cls="main-2-panel"),
              cls="main-2"),
            cls="main-top"),
            Div(
              kw.get("bottom_elements", ""),
            cls="main-3"),
          ),
        cls="right-frame",),
      cls="wrap", id="gap"),
    cls="column-3", style="width: 100%;"),
  sty, sty2, scr, scr2, cls="wrap-everything", **kw)
