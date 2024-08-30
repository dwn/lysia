$(document).ready(function() {
  $("#scroll-top").click(function(event) {
      event.preventDefault();
      if (!$("html, body").is(":animated")) {
          $("html, body").animate({ scrollTop: 0 }, "slow");
      }
      return false;
  });

  let panel1Height;
  let panel1BorderBottomWidth;
  let barPanelPaddedHeight;

  function setExpandedValues() { // Only call this when expanded
    panel1Height = $(".panel-1").outerHeight();
    panel1BorderBottomWidth = $(".panel-1").css("border-bottom-width");
    barPanelPaddedHeight = $(".first-bar-panel").outerHeight() + $(".first-bar-panel").css("margin-top"); // The same value when expanded or retracted

    //retractedHeight =
    //$(".banner").outerHeight() +
    //parseInt($('body').css('padding-top'));
    //if ($("panel-2").height() >= retractedHeight) {
      //$("panel-2").fadeOut();
    //}
    //else {
    //  $("panel-2").show();
    //}
    retractMenu();
  }

  function expandMenu() {
      if (!$(".top-menu, .first-bar-panel, .panel-1").is(":animated")) {
          const expandedHeight =
              $(".banner").outerHeight() +
              $(".data-cascade-button-group").outerHeight() +
              $(".bar-panel").outerHeight() +
              parseInt($('body').css('padding-top'));
          const barTop = expandedHeight - barPanelPaddedHeight;
          $(".first-bar-panel").animate({ top: barTop }); // Animate first-bar-panel
          $(".top-menu").animate({ height: expandedHeight }, { // Animate top-menu
              duration: 400, // Adjust as needed
              complete: function() {
                  // Check if the mouse is still hovering
                  if (!$(".top-menu").is(":hover")) {
                      // Trigger the retraction animation if not hovering
                      retractMenu();
                  }
              }
          });
          $(".panel-1").animate({ height: panel1Height }); // Animate panel-1
          $(".panel-1").css("border-bottom-width", panel1BorderBottomWidth);
          $(".panel-1").text("INSTRUCTIONS");
      }
  }

  function retractMenu() {
    const retractedHeight =
      $(".banner").outerHeight() +
      parseInt($('body').css('padding-top'));
    const barTop = retractedHeight - barPanelPaddedHeight;
    $(".top-menu").animate({ height: retractedHeight }); // Animate top-menu
    //$(".first-bar-panel").animate({ top: barTop }); // Animate first-bar-panel
    $(".panel-1").animate({ height: 0 }, 350, "linear", function() { // Animate panel-1
        $(".panel-1").text("");
        $(".panel-1").animate({ "border-bottom-width": 0 }, 25, "linear"); // Animate panel-1 border-bottom-width
      });
  }

  // Attach hover events
  $(".top-menu").hover(expandMenu, function() {
    if (!$(".top-menu, .first-bar-panel, .panel-1").is(":animated")) {
      retractMenu();
    }
  });

  // Set values on resize
  $(window).resize(setExpandedValues());

  setExpandedValues();
});
