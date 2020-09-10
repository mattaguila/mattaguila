<?php

    // Creating the doctype
    thematic_create_doctype();
    echo " ";
    language_attributes();
    echo ">\n";
    
    // Creating the head profile
    thematic_head_profile();

    // Creating the doc title
    thematic_doctitle();
    
    // Creating the content type
    thematic_create_contenttype();
    
    // Creating the description
    thematic_show_description();
    
    // Creating the robots tags
    thematic_show_robots();
    
    // Creating the canonical URL
    thematic_canonical_url();
    
    // Loading the stylesheet
    thematic_create_stylesheet();

	if (THEMATIC_COMPATIBLE_FEEDLINKS) {    
    	// Creating the internal RSS links
    	thematic_show_rss();
    
    	// Creating the comments RSS links
    	thematic_show_commentsrss();
   	}
    
    // Creating the pingback adress
    thematic_show_pingback();
    
    // Enables comment threading
    thematic_show_commentreply();

    // Calling WordPress' header action hook
    wp_head();
    
?>

<link rel="shortcut icon" href="http://aguilainteractive.com/images/favicon.png">
<script src="http://aguilainteractive.com/js/jquery-1.4.3.min.js" type="text/javascript"></script>
<script src="http://aguilainteractive.com/js/coda-slider.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    $(document).ready(function(){
    $(".scrollButtons.left").mouseover(function() {$(".scrollButtons.left").attr('src','http://aguilainteractive.com/images/carouselleftactive.png')});
    $(".scrollButtons.left").mouseout(function() {$(".scrollButtons.left").attr('src','http://aguilainteractive.com/images/carouselleft.png')});
	 $(".scrollButtons.right").mouseover(function() {$(".scrollButtons.right").attr('src','http://aguilainteractive.com/images/carouselrightactive.png')});
    $(".scrollButtons.right").mouseout(function() {$(".scrollButtons.right").attr('src','http://aguilainteractive.com/images/carouselright.png')});
});
  </script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-19164225-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</head>

<?php 

thematic_body();

// action hook for placing content before opening #wrapper
thematic_before(); 

if (apply_filters('thematic_open_wrapper', true)) {
	echo '<div id="wrapper" class="hfeed">';
}
    
    // action hook for placing content above the theme header
    thematic_aboveheader(); 
    
    ?>   

    <div id="header">
    
        <?php 
        
        // action hook creating the theme header
        thematic_header();
        
        ?>

	</div><!-- #header-->
    <?php
    
    // action hook for placing content below the theme header
    thematic_belowheader();
    
    ?>   
    <div id="main">
    