$(document).ready(function() {
  // Scroll to top on button click
  $("#scroll-top").click(function(event) {
    event.preventDefault();
    if (!$("html, body").is(":animated")) {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    return false;
  });
  // Full-screen function
  function toggleFullScreen(elem) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
      if (elem.requestFullScreen) elem.requestFullScreen();
      else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
      else if (elem.webkitRequestFullScreen) elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.cancelFullScreen) document.cancelFullScreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  }
  // If banner clicked, toggle full screen
  $(".banner").click(function() { toggleFullScreen(document.documentElement); });
  // Collapses top menu without animation
  function immediateCollapse() {
    $(".panel-1").css("height", 0);
    $(".panel-1").hide();
    $(".top-menu").css("height", $(".banner").outerHeight(true) + $(".first-bar-panel").outerHeight());
  }
  // Collapse top menu
  function collapse() {
    $(".panel-1").stop(true, false).animate({ height: 0 }, function() { $(".panel-1").hide(); });
    $(".top-menu").stop(true, false).animate({ height: $(".banner").outerHeight(true) + $(".first-bar-panel").outerHeight() });
  }
  // Expand top menu without animation
  function immediateExpand() {
    $(".panel-1").show();
    const expandedHeight = $(".banner").outerHeight() + $(".data-cascade-button-group").outerHeight();
    $(".panel-1").css("height", .382 * expandedHeight);
    $(".top-menu").css("height", expandedHeight);
  }
  // Expands top menu
  function expand() {
    $(".panel-1").show();
    const expandedHeight = $(".banner").outerHeight() + $(".data-cascade-button-group").outerHeight();
    $(".panel-1").stop(true, false).animate({ height: .382 * expandedHeight });
    $(".top-menu").stop(true, false).animate({ height: expandedHeight });
  }
  // Event expand top menu
  let isExpanded = false;
  $(".top-menu").on("click mousemove touchstart", function() { if (!isExpanded) { expand(); isExpanded = true; }});
  // Event collapse top menu
  $(".top-menu").on("mouseleave touchend", function() { collapse(); isExpanded = false; }); 
  // On window resize, immediately collapse top menu
  $(window).resize(function() { immediateCollapse(); });
  // Update clock in top menu
  (function clock() {
    $('#blank').text(new Date().toLocaleString().replace(',', '').replace(/:.. /, ' ').replace(/\//g, '·').replace('M', ''));
    setTimeout(clock, 60000);
  })();
  // If clicking on panel-1, expand top menu with animation to the bottom of the whole window
  $(".panel-1").click(function() {
    $('html, body').css({ overflow: 'hidden', height: '100%' }); // Turn off vertical scrolling
    const expandedHeight = $(window).height();
    $(".panel-1").animate({ height: .382 * expandedHeight });
    $(".top-menu").animate({ height: expandedHeight });
    $(".top-menu-inside").fadeOut().hide();
  });
  // If clicking on top-menu when it is expanded to the whole screen, collapse it with animation
  $(".top-menu").click(function() {
    if (Math.round($(".top-menu").height()) != $(window).height()) return;
    $(".top-menu-inside").fadeIn(function() {
      collapse();
      $('html, body').css({ overflow: 'auto', height: 'auto'}); // Turn on vertical scrolling
    });
  });
  // Initially expanded top menu
  immediateExpand();
});
