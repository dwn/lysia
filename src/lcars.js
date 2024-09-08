$(document).ready(function() {
  let isExpanded = false;
  let isCollapsed = false;
  let isExpanding = false;
  let isCollapsing = false;
  let contentWidth = -1;
  let contentHeight = -1;
  let contentAspectRatio = 1;
  // Easing functions
  jQuery.easing.easeInCirc = function (x, t, b, c, d) { return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b; };
  jQuery.easing.easeOutCirc = function (x, t, b, c, d) { return c * Math.sqrt(1 - (t = t / d - 1) * t) + b; };
  // Scroll-top button
  $(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
      $('.scroll-top a').fadeIn();
    } else {
      $('.scroll-top a').fadeOut();
    }
  });
  $(document).ready(function() {
    $("#scroll-top").click(function(event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  });
  // Fullscreen function
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
  // If banner clicked, toggle fullscreen
  $(".fullscreen-button").click(function() { toggleFullScreen(document.documentElement); });
  // Collapse top menu without animation
  function immediateCollapse() {
    $(".panel-1-contents").hide();
    $(".panel-1").stop(true, false).css("height", 0).css("bottom-border-width", 0);
    $(".top-menu").stop(true, false).css("height", $(".banner")[0].offsetHeight + $(".first-bar-panel")[0].offsetHeight);
    isExpanded = false;
    isCollapsed = true;
    isExpanding = false;
    isCollapsing = false;
  }
  // Collapse top menu
  function collapse() {
    $(".panel-1").stop(true, false).animate({ height: 0 }, 300, function() { $(".panel-1-contents").hide(); $(".panel-1").animate({ "border-bottom-width": 0 }, 100, "easeOutCirc") });
    $(".top-menu").stop(true, false).animate({ height: $(".banner")[0].offsetHeight + $(".first-bar-panel")[0].offsetHeight }, function() { isCollapsed = true; });
    //$(".panel-2").fadeOut();
    isExpanded = false;
    isExpanding = false;
    isCollapsing = !isCollapsed;
  }
  // Expand top menu without animation
  function immediateExpand() {
    const expandedHeight = $(".banner").outerHeight() + $(".data-cascade-button-group").outerHeight();
    $(".panel-1").stop(true, false).css("border-bottom-width", 5).css("height", .382 * expandedHeight);
    $(".panel-1-contents").show();
    $(".top-menu").stop(true, false).css("height", expandedHeight);
    isExpanded = true;
    isCollapsed = false;
    isCollapsing = false;
    isExpanding = false;
  }
  // Expands top menu
  function expand() {
    const expandedHeight = $(".banner").outerHeight() + $(".data-cascade-button-group").outerHeight();
    $(".panel-1").stop(true, false).animate({ "border-bottom-width": 5 }, 100, "easeInCirc", function() { $(".panel-1-contents").show(); $(".panel-1").animate({ height: .382 * expandedHeight }, 300) });
    $(".top-menu").stop(true, false).animate({ height: expandedHeight }, function() { isExpanded = true; });
    //$(".panel-2").fadeIn();
    isCollapsed = false;
    isExpanding = !isExpanded;
    isCollapsing = false;
  }
  // Event expand top menu
  $(".top-menu").on("click mouseenter touchstart", function() { if (!(isExpanded || isExpanding)) { expand(); }});
  // Event collapse top menu
  $(".main-frame").on("click mouseenter touchstart", function() { if (!(isCollapsed || isCollapsing)) { collapse(); }});
  // Update clock in top menu
  (function clock() {
    $('#blank').text(new Date().toLocaleString().replace(',', '').replace(/:.. /, ' ').replace(/\//g, '·').replace('M', ''));
    setTimeout(clock, 60000);
  })();
  // If clicking on panel-1, expand top menu with animation to the bottom of the whole window
  $(".panel-1").click(function() {
    $(".brief").hide();
    $('html, body').css({ overflow: 'hidden', height: '100%' }); // Turn off vertical scrolling
    const expandedHeight = $(window).height();
    $(".panel-1").animate({ height: .382 * expandedHeight });
    $(".top-menu").animate({ height: expandedHeight });
    $(".top-menu-inside").fadeOut(function() { $(".brief").fadeIn(); });
  });
  // If clicking on top-menu when it is expanded to the whole screen, collapse it with animation
  $(".top-menu").click(function() {
    if (Math.round($(".top-menu").height()) != $(window).height()) return;
    $(".top-menu-inside").show(); //Temporarily show top-menu-inside so that collapse can calculate target height
    collapse(true);
    $(".top-menu-inside").hide(); //Hide top-menu-inside now that collapse animation started
    $(".brief").fadeOut(function() { $(".top-menu-inside").fadeIn(function() {
      $('html, body').css({ overflow: 'auto', height: 'auto'}); // Turn on vertical scrolling
    })});
  });
  // Update grid layout and update associated global variables
  function updateGridLayout() {
    contentWidth = $(window).width() - $("#main").position().left;
    contentHeight = $(window).height() - $("#main").position().top;
    contentAspectRatio = contentWidth / contentHeight;
    if (contentAspectRatio >= 1) { // Apply two-column layout if aspect ratio is >= 1
      main.classList.remove('one-column');
      main.classList.add('two-column');
    } else { // Apply one-column layout if aspect ratio is < 1
      main.classList.remove('two-column');
      main.classList.add('one-column');
    }
  }
  // On window resize, immediately collapse top menu
  $(window).resize(function() {
    immediateCollapse();
    updateGridLayout();
  });
  // Initially expanded top menu
  immediateExpand();
  updateGridLayout();
});
