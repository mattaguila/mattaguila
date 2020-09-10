<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Aguila Interactive</title>
<link href="css/styles.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' media='screen and (min-width: 1px) and (max-width: 1315px)' href='css/medium.css' />
<link rel='stylesheet' media='screen and (min-width: 1px) and (max-width: 979px)' href='css/smallmain.css' />
<link rel="shortcut icon" href="images/favicon.png">
<link rel="apple-touch-icon" href="images/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png" />
<meta name="description" content="Seattle, WA based design services and commentary." />
<meta name="keywords" content="HTML,CSS,CSS3,XML,JavaScript,jQuery,PHP,Seattle,WA,Interactive,Design,Web Design,CSS3,Blog,UX,UI,Responsive,Adaptive,Agile" />
<meta name="author" content="Matt Aguila" />
<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1" />
<!--[if IE]>
	<link rel="stylesheet" type="text/css" href="css/medium.css" />
<![endif]-->
  <script src="js/jquery-1.4.3.min.js" type="text/javascript"></script>
  <script type='text/javascript' src='js/last.fm.records.js'></script>
  <script type="text/javascript">
    jQuery(document).ready( function() {
      var _config = {
        // last.fm username
        username: 'iliquid00li',
        // number of images to show
        count: 12,
        // period to get last.fm data from
        period: '7day',
        // when to get new data from last.fm (in minutes)
        refresh: 1,
        // difference between your timezone and GMT.
        offset: 1
    };
   lastFmRecords.init(_config);
   });
  </script>
<script type="text/javascript">
// Don't execute any code until the DOM is ready!
$(document).ready(function(){					
						   
	// Our very special jQuery JSON fucntion call to Flickr, gets details of the most recent 20 images			   
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=37669777@N07&lang=en-us&format=json&jsoncallback=?", displayImages);
	
	function displayImages(data) {																																   
		// Randomly choose where to start. A random number between 0 and the number of photos we grabbed (20) minus 9 (we are displaying 9 photos).
		var iStart = Math.floor(Math.random()*(11));	
		
		// Reset our counter to 0
		var iCount = 0;								
		
		// Start putting together the HTML string
		var htmlString = "<ul>";					
		
		// Now start cycling through our array of Flickr photo details
		$.each(data.items, function(i,item){
									
			// Let's only display 9 photos (a 3x3 grid), starting from a random point in the feed					
			if (iCount > iStart && iCount < (iStart + 10)) {
				
				// I only want the ickle square thumbnails
				var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");		
				
				// Here's where we piece together the HTML
				htmlString += '<li><a href="' + item.link + '" target="_blank">';
				htmlString += '<img src="' + sourceSquare + '" alt="' + item.title + '" title="' + item.title + '"/>';
				htmlString += '</a></li>';
			}
			// Increase our counter by 1
			iCount++;
		});		
		
	// Pop our HTML in the #images DIV	
	$('#images').html(htmlString + "</ul>");
	
	// Close down the JSON function call
	}
	
// The end of our jQuery function	
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
<script language="JavaScript">

	$.getJSON("http://twitter.com/statuses/user_timeline.json?screen_name=mattaguila&count=1&callback=?",

 		function(data){

			$.each(data, function(i,item){

				ct = item.text;

				ct = ct.replace(/http:\/\/\S+/g,  '<a href="$&" target="_blank">$&</a>');

			    ct = ct.replace(/\s(@)(\w+)/g,    ' @<a href="http://twitter.com/$2" target="_blank">$2</a>');

			    ct = ct.replace(/\s(#)(\w+)/g,    ' #<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');

				$("#jstweets").append('<div>'+ct +"</div>");

 			});

		});

</script>	
</head>

<body id="contact">

<div id="wrapper">
<div id="content">
<div id="header">
<div id="logo"><a href="index.html"><h1 class="swap"><span>Aguila Interactive</span></h1></a></div>
<div id="nav">
  <ul>
    <li id="nav-portfolio"><a href="index.html">PORTFOLIO</a></li>
    <li id="nav-info"><a href="about.php">ABOUT</a></li>
  </ul>
</div>
</div>
<div id="title"></div>
<div id="leftcol">
<div id="bio"><h3>I LOVE WHAT I DO.</h3>
<p>Welcome to Aguila Interactive, my name is Matt Aguila. I am a Seattle, WA based UX Designer with 9 years of web design experience. This site serves as my personal portfolio. All work examples are either from previous positions, or business clients as a freelance designer through Aguila Interactive.</p>
<p>UX/UI and interactive prototypes stand out as my areas of expertise, yet I have a versatile background in web and print design. I'm currently working as a Senior UX Designer on the Azure Cloud Engineering Services team at Microsoft in Redmond, Washington. I received a Bachelors of Arts in Visual Communication in 2006 and have since focused much of my career in the web world.</p>
<p>
  <ul>
    <li id="resumelaunch"><a href="resume.pdf" target="_blank">RESUME</a></li>
  </ul>
</p>
</div>
<?php
$display_form = true;
$display_msg = "";
$err_name = false;
$err_email = false;
$err_form = false;
$err_site = false;
$err_msg = false;
if(isset($_POST['email'])) {
    $email_to = "matt@aguilainteractive.com";
    $email_subject = "Message from Aguila Interactive Form";
     
    // validation expected data exists
    if(!isset($_POST['fullname']) ||
        !isset($_POST['email']) ||
        !isset($_POST['website']) ||
        !isset($_POST['message'])) {
        $err_form = true;
    }
     
    $name = $_POST['fullname']; // required
    $email_from = $_POST['email']; // required
    $website = $_POST['website']; // not required
    $message = $_POST['message']; // required
     
    $error_message = "";
    $email_exp = "^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$";
	if(!eregi($email_exp,$email_from)) {
		$err_email = true;;
	}
    $string_exp = "^[a-z .'-]+$";
	if(!eregi($string_exp,$name)) {
		$err_name = true;
	}
	if($message == "" || $message == "Insert message here") {
		$err_msg = true;
	}
	if($err_email || $err_name || $err_msg || $err_form) {
		//DO NOT SEND EMAIL... There was a problem!
	} else {
		//Passed Validations - sending email
		$email_message = "Form details below.\n\n";
		 
		function clean_string($string) {
		  $bad = array("content-type","bcc:","to:","cc:","href");
		  return str_replace($bad,"",$string);
		}
		
		$email_message .= "Name: ".clean_string($name)."\n";
		$email_message .= "Email: ".clean_string($email_from)."\n";
		$email_message .= "Website: ".clean_string($website)."\n";
		$email_message .= "Message: ".clean_string($message)."\n";
		 
		$headers = 'From: '.$email_from."\r\n".
		'Reply-To: '.$email_from."\r\n" .
		'X-Mailer: PHP/' . phpversion();
		@mail($email_to, $email_subject, $email_message, $headers);
		$display_msg = "THANK YOU FOR YOUR MESSAGE.";
		$display_form = false;
	}
}
?>
<?php
if ($display_form){
?>
<div id="contactform"><h3>IT WOULD BE GREAT TO HEAR FROM YOU.</h3><p class="pitalic">(Submit your contact information)</p>
<form name="contact" method="post">
<p class="formbold">Name:</p>
<div class="fieldbg"><input name="fullname" type="text" class="fieldhide" value="<?php if (isset($_POST['fullname'])){ echo $_POST['fullname']; } ?>" /></div>
<?php if ($err_name){ ?>
<div id="validation">The Name you entered does not appear to be valid, please try again.</div>
<?php } ?>
<p class="formbold">Email:</p>
<div class="fieldbg"><input name="email" type="text" class="fieldhide" value="<?php if (isset($_POST['email'])){ echo $_POST['email']; } ?>" /></div>
<?php if ($err_email){ ?>
<div id="validation">The Email Address you entered does not appear to be valid, please try again.</div>
<?php } ?>
<p class="formbold">Website:</p>
<div class="fieldbg"><input name="website" type="text" class="fieldhide" value="<?php if (isset($_POST['website'])){ echo $_POST['website']; } ?>" /></div>
<?php if ($err_site){ ?>
<div id="validation">The Website you entered does not appear to be valid, please try again.</div>
<?php } ?>
<p class="formbold">Message:</p>
<div class="textareabg"><textarea name="message" class="textareahide"><?php if (isset($_POST['message'])){ echo $_POST['message']; } else { ?>Insert message here<?php } ?></textarea></div>
<?php if ($err_msg){ ?>
<div id="validation">You did not type a message, please try again.</div>
<?php } ?>
<input type="submit" class="button" value="SEND" border="0">
</form>
</div>
<?php
} else {
?>
<h3 class="thankyou">
<?php
	echo $display_msg;
?>
</h3>
<?php
}
?>
</div>
<div id="middlecol">
<div id="social"><h3>SOCIAL</h3>
	<ul>
    <li><a href="http://www.linkedin.com/in/mattaguila" target="_blank">LINKED IN</a></li>
    <li><a href="http://www.flickr.com/photos/mattaguila/sets/" target="_blank">FLICKR</a></li>
    <li><a href="http://twitter.com/mattaguila" target="_blank">TWITTER</a></li>
    <li><a href="http://www.last.fm/user/iliquid00li" target="_blank">LAST.FM</a></li>
    </ul>
</div>
<div id="links"><h3>LINKS</h3>
	<ul>
    <li><a href="https://medium.com/" target="_blank">MEDIUM</a></li>
    <li><a href="http://www.smashingmagazine.com/" target="_blank">SMASHING MAGAZINE</a></li>
    <li><a href="http://alistapart.com/" target="_blank">A LIST APART</a></li>
    <li><a href="http://www.aiga.org/" target="_blank">AIGA</a></li>
    </ul>
</div>
<!--
<div id="twitter"><h3>TWITTER</h3>
	<div id="jstweets" class="twitter"></div>	
</div>
-->
</div>

<div id="rightcol">
<div id="work"><h3>WORK</h3>
  <ul>
    <li><a href="photography.html#2008sti"><img src="images/gallery/workthumbs/2008sti.jpg" width="80" height="80" title="2008 STI" /></a>
    </li>
    <li><a href="index.html#contoursession"><img src="images/gallery/workthumbs/contour.jpg" width="80" height="80" title="Contour Featured Sessions" /></a>
    </li>
    <li><a href="print.html#kermitz"><img src="images/gallery/workthumbs/kermitz.jpg" width="80" height="80" title="Kermitz" /></a>
    </li>
    <li><a href="photography.html#waterfall"><img src="images/gallery/workthumbs/waterfall.jpg" width="80" height="80" title="Hraunfossar" /></a>
    </li>
    <li><a href="index.html#lunaazul"><img src="images/gallery/workthumbs/lunaazul.jpg" width="80" height="80" title="Luna Azul Photography" /></a>
    </li>
    <li><a href="photography.html#glacier"><img src="images/gallery/workthumbs/glacier.jpg" width="80" height="80" title="Jokulsarlon" /></a>
    </li>
</div>
<div id="playlist" style="display:none;"><h3>LAST.FM</h3>
<div id="lastfm">[lastfmrecords|7day|12]</div>
</div>
<div id="flickr"><h3>FLICKR</h3>
<div id="images"></div>
</div>
</div>
<div id="footer">
<div id="fportfolio"><h2>PORTFOLIO</h2>
	<ul>
    <li><a href="index.html">WEB</a></li>
    <li><a href="print.html">PRINT</a></li>
    <li><a href="photography.html">PHOTOGRAPHY</a></li>
    </ul>
</div>
<div id="fportfolio"><h2>SOCIAL</h2>
	<ul>
    <li><a href="http://www.linkedin.com/in/mattaguila" target="_blank">LINKED IN</a></li>
    <li><a href="http://www.flickr.com/photos/mattaguila/sets/" target="_blank">FLICKR</a></li>
    <li><a href="http://instagram.com/mattaguila/" target="_blank">INSTAGRAM</a></li>
    <li><a href="http://twitter.com/mattaguila" target="_blank">TWITTER</a></li>
    <li><a href="http://www.last.fm/user/iliquid00li" target="_blank">LAST.FM</a></li>
    <li><a href="http://vimeo.com/aguilainteractive" target="_blank">VIMEO</a><li>
    <li><a href="http://www.coroflot.com/mattaguila" target="_blank">COROFLOT</a></li>
    </ul>
</div>
<div id="fportfolio"><h2>LINKS</h2>
	<ul>
    <li><a href="http://www.smashingmagazine.com/" target="_blank">SMASHING MAGAZINE</a></li>
    <li><a href="http://www.designobserver.com/" target="_blank">DESIGN OBSERVER</a></li>
    <li><a href="http://depthcore.com/" target="_blank">DEPTHCORE</a></li>
    <li><a href="http://www.designiskinky.net/" target="_blank">DESIGN IS KINKY</a></li>
    <li><a href="http://www.typographyserved.com/" target="_blank">TYPOGRAPHY SERVED</a>
    <li><a href="http://www.thefwa.com/" target="_blank">FWA</a></li>
    <li><a href="http://www.aiga.org/" target="_blank">AIGA</a></li></li>
    </ul>
</div>
<div id="fportfolio"><h2>©AGUILA INTERACTIVE</h2>
	<ul>
    <li><a href="about.php">CONTACT</a></li>
    <li><a href="http://www.dreamhost.com" target="_blank">DREAMHOST</a></li>
    </ul>
</div>
</div>
</div>
</div>

</body>
</html>
