var $j = jQuery.noConflict();
jQuery(function() {  

	html5placeholder();
	showHide('cartPanel', 'cartBtn');
	menuCurrentHighlight();
    // twitterGPlus();
    
    // if ($j('#Form').length) {
	// 	$j("#Form").validate();
	// };
	
});



function showHide(moreID, moreBTN) {	 	
	var morePanelID = $j('#'+moreID), //Id of expandable content div
    moreButtonID = $j('#'+moreBTN), //Id of button for this content div
	moreHeight = morePanelID.height();	

	morePanelID.height('0');
	moreButtonID.click(function(e) {	 	
	 	moreButtonID.unbind('mouseenter mouseleave'); 	
		if (moreButtonID.hasClass('triggered')) {
			$j(this).removeClass('triggered');
			morePanelID.stop().css({'overflow':'hidden'}).animate({ height: 0 }, 1000);
			return false;
		} else {
			$j(this).addClass('triggered');
			morePanelID.stop().animate({ height: moreHeight }, 1000);
			var showOverflow = function() {
				morePanelID.css({'overflow':'visible'});
			}
			setTimeout (showOverflow,1000)
			return false;
		};
	});
	
	morePanelID.find('.close').click(function() {
 		moreButtonID.removeClass('triggered');
 		morePanelID.stop().css({'overflow':'hidden'}).animate({ height: 0 }, 1000);
 	});
 	

};



/* HTML5 placeholder
----------------------------------------- */
function html5placeholder() {
      if (!Modernizr.input.placeholder) {
        $j('input[type="text"]', 'header').each(function () {
          if (!$j(this).val()) {
            this.value = $j(this).attr('placeholder');
          }
          $j(this).focus(function () {
            if (this.value == $j(this).attr('placeholder')) {
              this.value = '';
            }
          });
          $j(this).blur(function () {
            if (this.value == '') {
              this.value = $j(this).attr('placeholder');
            }
          });
        });
      }
}


/* Highlight currect page in CMS left nav menu
----------------------------------------- */
function menuCurrentHighlight(){

    var url = window.location.pathname, 
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
	/* create regexp to match current url pathname and remove trailing slash if present as it could
	   collide with the link in navigation in case trailing slash wasn't present there.
           now grab every link from the navigation: */
        if( $j('#craftNav a').length || $j('.col-left-narrow a').length) {
	    $j('#craftNav a, .col-left-narrow a').each(function(){
		// and test its normalized href against the url pathname regexp
		if(urlRegExp.test(this.href.replace(/\/$/,''))){
		    $j(this).parent().addClass('current');
            // $j(this).parent('li').parent('ul').addClass('currentParent');
		}
	    });	
	};
};

/* Javascript only print link
----------------------------------------- */
function unobtrusivePrint() {
    if($j('.printLink').length != 0){
        $j('.printLink').prepend('<a class="print" href="#print">Print Map</a>');
        $j('.print').click(function() {
            window.print();
            return false;
        });
    }
}

/* Make links with class external open in new window
----------------------------------------- */
function externalLinks() {
    $j('.external').attr('target','_blank');
}



/* Equal height script
----------------------------------------- */
/* equalHeight($(".selector")); */
function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		var thisHeight = $j(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}



/* Activate Twitter / GPlus
----------------------------------------- */
function twitterGPlus(){	
	if ($j('.twitter-share-button').length) {	
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	}
	
	if ($j('.g-plusone').length) {									
		window.___gcfg = {lang: 'en-GB'};
	
	    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	    po.src = 'https://apis.google.com/js/plusone.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	}
}	



/*-----------------------------------------
 More Info Open/Close
 ------------------------------------------*/
var currentPos = null;

function expandableInfo(moreId, moreButton){
    var moreDivID = $j('#'+moreId); //Id of expandable content div
    var moreButtonClass = $j('.'+moreButton); //Id of button for this content div
    var moreTextLink = $j(moreButtonClass).first().text(); //Link Text
    var moreHeight = moreDivID.height(); // Get the height of expandable content div
    //Set the expandable content height to 0 / Hidden!	
    moreDivID.css({ 'height' : '0' , 'overflow' : 'hidden' });	

	//More open and close functionality
	$j(moreButtonClass).click(
            function(){
                if(moreDivID.hasClass('open')) // If the content is already on display
                {
                    moreDivID.removeClass('open'); // and remove the class
                    moreDivID.stop().animate({ height: 0 }, 1000, function() { /* Animation complete */ });                
                    //$j(this).removeClass('triggered').find('span').text(moreTextLink); // and change the text back
                    $j('#home-slider').find(moreButtonClass).each(function() {
                    	$j(this).removeClass('triggered').find('span').text(moreTextLink); // change the text
                    });
                    scrollWinUp();
                    return false;
                }else{ // Otherwise
                    moreDivID.addClass('open'); //add the class
                    moreDivID.stop().animate({ height: moreHeight }, 1000); //Show the div 
                    //$j(this).html('<span>Close</span>').addClass('triggered'); // change the text
                    $j('#home-slider').find(moreButtonClass).each(function() {
                    	$j(this).html('<span>Close</span>').addClass('triggered'); // change the text
                    });
                    scrollWinDown();
                    return false;
                }
            }	
    );
    	
	//Scroll down past the header
	function scrollWinDown(){
            currentPos = $j('html,body').scrollTop(); //Store Current position before we scroll
            var divPos = $j(moreDivID).offset().top; // Position of div from top
            var buttonPos = $j(moreButtonClass).offset().top; //Position of button from top
            var amountToScroll = buttonPos - 50; // Distance to Scroll
            
            if ($j(window).height() > divPos + moreHeight && currentPos ===0){
                // console.log('no need to scroll you!');
            }else{
                if (currentPos === 0){ //If user hasnt scrolled yet
                    $j('html,body').animate({scrollTop: moreHeight}, 1000); //Move just the height of the div
                }else{
                    $j('html,body').animate({scrollTop: amountToScroll}, 1000); // Move to the top of button
                }
            }
	}
	
	//Scroll down upto the header
	function scrollWinUp(){
	    $j('html,body').animate({scrollTop: currentPos}, 1000); //Take user back to where they were
	}	
}


