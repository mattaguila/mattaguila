
$(document).ready(function() {
	
	$('#subcategoryoption').change(function () {
    $(".usagenextbtn").attr("disabled", $("#subcategoryoption").val() == "other");
	$('.subcategoryvalidation').addClass('subcategoryvalidationchange');
	$('.usage_inlineleft').addClass('usage_inlineleftshow');
});
$('.singleuseroption').click(function () {
	$('.singleuservalidation').addClass('singleuservalidationchange');
	$('.multiuservalidation').removeClass('multiuservalidationchange');
	$(".licensenextbtn").attr("disabled", $(".singleuseroption").val() == "other");
});
$('.multiuseroption').click(function () {
	$('.multiuservalidation').addClass('multiuservalidationchange');
	$('.singleuservalidation').removeClass('singleuservalidationchange');
	$(".licensenextbtn").attr("disabled", $(".singleuseroption").val() == "other");
});
$('#categoryoption').change(function () {
	$('.categoryvalidation').addClass('categoryvalidationchange');
});
$('#sizeoption').change(function () {
	$('.sizevalidation').addClass('sizevalidationchange');
});
$('#distributionoption').change(function () {
    $(".detailnextbtn").attr("disabled", $("#distributionoption").val() == "other");
	$('.distrovalidation').addClass('distrovalidationchange');
});
$('#terroption').change(function () {
	$('.terrvalidation').addClass('terrvalidationchange');
});
$('#inputDate').click(function () {
	$('.startvalidation').addClass('startvalidationchange');
});
$('#durationoption').change(function () {
	$('.durationvalidation').addClass('durationvalidationchange');
});
$('#industryoption').change(function () {
    $(".availnextbtn").attr("disabled", $("#industryoption").val() == "other");
	$('.industryvalidation').addClass('industryvalidationchange');
	$('.availpricehide').addClass('availpriceshow');
	$('.detailpricehide').removeClass('detailpriceshow');
});
	
		 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.addtocartbtn').click(function() {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.addedtocarthide').addClass('addedtocart');
			$('.addedtocarthidegrey').addClass('addedtocartgrey');
			$('.addtocart').addClass('addtocarthide');
			$('.summarygreyhide').addClass('summarygreyshow');
			$('.summary').addClass('summaryhide');
			
		  
	 });
	 
	 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.showgreybox').click(function() {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.summarygreyhide').addClass('summarygreyshow');
			$('.summary').addClass('summaryhide');
			
		  
	 });
	
	
	
		 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.licensenextbtn').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
		
		//CHANGES MADE FOR GETTY AVAILABILITY
	 	$('.licensecontent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($('.usagecontent').is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.licensehead').addClass('inactive');
			$('.licensehide').addClass('licenseshow');
			$('.usageinactive').addClass('usagehead');
			$('.licenseeditinactive').addClass('licenseeditactive');
			$('.license_summaryleft').addClass('license_summaryleftshow');
			$('.usagehead').removeClass('inactive');
			$('.usageeditinactive').removeClass('usageeditactive');
			$('.availpriceshow').removeClass('availpriceshow');
			$('.usage_summaryleftshow').removeClass('usage_summaryleftshow');
			
			  
			//OPEN THE SLIDE
			$('.usagecontent').slideDown('normal');
		 } 
		  
	 });
	 
	 		 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.usagenextbtn').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
		
		//CHANGES MADE FOR GETTY AVAILABILITY
	 	$('.usagecontent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($('.detailcontent').is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.usagehead').addClass('inactive');
			$('.usagehide').addClass('usageshow');
			$('.usagepricehide').addClass('usagepriceshow');
			$('.usageeditinactive').addClass('usageeditactive');
			$('.detailinactive').addClass('detailhead');
			$('.usage_summaryleft').addClass('usage_summaryleftshow');
			$('.detailhead').removeClass('inactive');
			$('.detaileditinactive').removeClass('detaileditactive');
			$('.availpriceshow').removeClass('availpriceshow');
			$('.detail_summaryleftshow').removeClass('detail_summaryleftshow');

			  
			//OPEN THE SLIDE
			$('.detailcontent').slideDown('normal');
		 } 
		  
	 });
	 
	  		 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.detailnextbtn').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
		
		//CHANGES MADE FOR GETTY AVAILABILITY
	 	$('.detailcontent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($('.availcontent').is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.detailhead').addClass('inactive');
			$('.detailhide').addClass('detailshow');
			$('.detailpricehide').addClass('detailpriceshow');
			$('.detaileditinactive').addClass('detaileditactive');
			$('.availinactive').addClass('availhead');
			$('.detail_summaryleft').addClass('detail_summaryleftshow');
			$('.availeditinactive').removeClass('availeditactive');
			$('.usagepricehide').removeClass('usagepriceshow');
			$('.availpriceshow').removeClass('availpriceshow');
			$('.avail_summaryleftshow').removeClass('avail_summaryleftshow');
			
			  
			//OPEN THE SLIDE
			$('.availcontent').slideDown('normal');
		 } 
		  
	 });
	 
	   		 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.availnextbtn').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
		
		//CHANGES MADE FOR GETTY AVAILABILITY
	 	$('.availcontent').slideUp('normal');
		
		//ADD THE ON CLASS TO THE BUTTON
			$('.availhead').addClass('inactive');
			$('.availhide').addClass('availshow');
			$('.availeditinactive').addClass('availeditactive');
			$('.avail_summaryleft').addClass('avail_summaryleftshow');
		  
	 });
	 
	 //THIS IS FOR EDITING SELECTION
	 
	 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.licenseeditinactive').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($('.licensecontent').is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.licensehead').removeClass('inactive');
			$('.usagehead').addClass('inactive');
			$('.detailhead').addClass('inactive');
			$('.availhead').addClass('inactive');
			$('.license_summaryleftshow').removeClass('license_summaryleftshow');
			
			
			//OPEN THE SLIDE
			$('.licensecontent').slideDown('normal');
		 } 
		  
	 });
	 
	  //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.usageeditinactive').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($('.usagecontent').is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.licensehead').addClass('inactive');
			$('.usagehead').removeClass('inactive');
			$('.detailhead').addClass('inactive');
			$('.availhead').addClass('inactive');
			$('.usageeditinactive').removeClass('usageeditactive');
			$('.usage_summaryleftshow').removeClass('usage_summaryleftshow');
			
			//OPEN THE SLIDE
			$('.usagecontent').slideDown('normal');
		 } 
		  
	 });
	 
	 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.detaileditinactive').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($('.detailcontent').is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.licensehead').addClass('inactive');
			$('.usagehead').addClass('inactive');
			$('.detailhead').removeClass('inactive');
			$('.availhead').addClass('inactive');
			$('.detaileditinactive').removeClass('detaileditactive');
			$('.detail_summaryleftshow').removeClass('detail_summaryleftshow');
			
			//OPEN THE SLIDE
			$('.detailcontent').slideDown('normal');
		 } 
		  
	 });
	 
	 //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.availeditinactive').click(function() {
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordioncontent').slideUp('normal');
		$('.licensecontent').slideUp('normal');
	 	$('.usagecontent').slideUp('normal');
	 	$('.detailcontent').slideUp('normal');
	 	$('.availcontent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($('.availcontent').is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$('.licensehead').addClass('inactive');
			$('.usagehead').addClass('inactive');
			$('.detailhead').addClass('inactive');
			$('.availhead').removeClass('inactive');
			$('.availeditinactive').removeClass('availeditactive');
			$('.avail_summaryleftshow').removeClass('avail_summaryleftshow');
			
			//OPEN THE SLIDE
			$('.availcontent').slideDown('normal');
		 } 
		  
	 });
	 
	 //END EDITING SECTION
	 
	 
	
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	$('.accordioncontent').hide();

	$('.usagecontent').hide();
	
	$('.detailcontent').hide();
	
	$('.availcontent').hide();

});

/********************************************************************************************************************
	CHOSEN SELECT
	********************************************************************************************************************/

//<![CDATA[
    $(".chzn-select").chosen(); $(".chzn-select-deselect").chosen({allow_single_deselect:true}); 
    //]]>

/********************************************************************************************************************
	COLORBOX
	********************************************************************************************************************/

$(document).ready(function(){
			//Examples of how to assign the ColorBox event to element
			$(".inline").colorbox({inline:true, width:"640px"});
			
			//Example of preserving a JavaScript event for inline calls.
			$("#click").click(function(){ 
				$('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
				return false;
			});
		});
		
		/********************************************************************************************************************
	TOOLTIP
	********************************************************************************************************************/
		
		<!--

    $(function () {
        $('.bubbleInfo').each(function () {
            var distance = 10;
            var time = 250;
            var hideDelay = 500;

            var hideDelayTimer = null;

            var beingShown = false;
            var shown = false;
            var trigger = $('.chzn-select', this);
            var info = $('.popup', this).css('opacity', 0);


            $([trigger.get(0), info.get(0)]).mouseover(function () {
                if (hideDelayTimer) clearTimeout(hideDelayTimer);
                if (beingShown || shown) {
                    // don't trigger the animation again
                    return;
                } else {
                    // reset position of info box
                    beingShown = true;

                    info.css({
                        top: 0,
                        right: 225,
                        display: 'block'
                    }).animate({
                        top: '-=' + distance + 'px',
                        opacity: 1
                    }, time, 'swing', function() {
                        beingShown = false;
                        shown = true;
                    });
                }

                return false;
            }).mouseout(function () {
                if (hideDelayTimer) clearTimeout(hideDelayTimer);
                hideDelayTimer = setTimeout(function () {
                    hideDelayTimer = null;
                    info.animate({
                        top: '-=' + distance + 'px',
                        opacity: 0
                    }, time, 'swing', function () {
                        shown = false;
                        info.css('display', 'none');
                    });

                }, hideDelay);

                return false;
            });
        });
    });
    
    //-->