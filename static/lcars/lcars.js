$(document).ready(function() {
  // Scroll to top on button click
  $("#scroll-top").click(function(event) {
    event.preventDefault();
    if (!$("html, body").is(":animated")) {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    return false;
  });
  // Collapses top menu without animation
  function immediateCollapse() {
    $(".panel-1").css("height", 0);
    $(".top-menu").css("height", $(".banner").outerHeight(true) + $(".first-bar-panel").outerHeight());
  }
  // Collapses top menu
  function collapse() {
    $(".top-menu").stop(true, false).animate({ height: $(".banner").outerHeight(true) + $(".first-bar-panel").outerHeight() });
    $(".panel-1").stop(true, false).animate({ height: 0 }, function() { $(".panel-1").hide(); });
  }
  // Expands top menu
  function expand() {
    $(".panel-1").show();
    const expandedHeight = $(".banner").outerHeight() + $(".data-cascade-button-group").outerHeight();
    $(".panel-1").stop(true, false).animate({ height: .5 * expandedHeight });
    $(".top-menu").stop(true, false).animate({ height: $(".banner").outerHeight() + $(".data-cascade-button-group").outerHeight() });
  }
  // Event expand
  $(".top-menu").on("mouseenter", function() { expand(); });
  // Event collapse
  $(".top-menu").on("mouseleave touchend", function() { collapse(); });
  // On window resize, immediately collapse top menu
  $(window).resize(function() { immediateCollapse(); });
});
