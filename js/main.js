var $j = jQuery.noConflict();
jQuery(function() {  

	html5placeholder();
	showHide('cartPanel', 'cartBtn');
	showHide2('search_mini_form', 'searchReveal');
	showHide2('fx-converter', 'currencyConvertor');
	menuCurrentHighlight();
	removeDefaultOption();
	dropDownCountries();
	tabbedContentFade();
	tabbedContent();
	showCookiePolicy();
	
	$j('.sbox select').selectbox(); /* in plugins.js */
	equalHeight( $j('.prodDetailWrap') );
	equalHeight( $j('.two-row .product-name') );
	equalHeight( $j('.two-row .short_desc') );
	equalHeight( $j('.three-row .product-name') );
	equalHeight( $j('.three-row .short_desc') );
    // twitterGPlus();
    
    // if ($j('#Form').length) {
	// 	$j("#Form").validate();
	// };
	
	$j("#mini-cart").animate({ scrollTop: $j("#mini-cart").prop("scrollHeight") }, 3000);
	
	if ($j('.more-views ul').length) {
    	$j('.more-views ul').jcarousel();
    };
});


function showCookiePolicy() {
	if(!jQuery.cookie('new_customer') ) {			
		jQuery('#cookiePolicy').fadeIn();		
	}	
	
	jQuery('#cookiePolicy .close').click(function(){
		if(!jQuery.cookie('new_customer') ) {
			jQuery.cookie('new_customer', 'true', { expires: 365, path: '/'} );						
		}	
		jQuery('#cookiePolicy').fadeOut();
	});
};


function dropDownCountries() {
    var dd = $j('#storeSwitcherDD');
    
    if(dd.length) {

    	/*
    	dd.find('span').each(function() {
    		$j(this).html($j(this).html().replace('€', '€ EUR').replace('£', '£ GBP').replace('de_DE', 'Deutsch').replace('en_GB', 'English').replace('es_ES', 'Español').replace('fr_FR', 'Français').replace('it_IT', 'Italiano'));
    	});
    	$j('#languageSelect').find('li a span').each(function() {
    		$j(this).html($j(this).html().replace('de_DE', 'Deutsch').replace('en_GB', 'English').replace('es_ES', 'Español').replace('fr_FR', 'Français').replace('it_IT', 'Italiano'));
    	});
    	*/
    	
		dd.css({'cursor':'pointer'});
		$j('#storeSwitcherOptions').css({'display':'none','position':'absolute'});
		dd.click(function() {
			$j(this).toggleClass('active').parent().find('#storeSwitcherOptions').slideToggle();
		});
	
    };

};


function tabbedContentFade() {
    $j("#bannertabs").tabs({

        show: function(event, ui) {

            var lastOpenedPanel = $j(this).data("lastOpenedPanel");

            if (!$j(this).data("topPositionTab")) {
                $j(this).data("topPositionTab", $j(ui.panel).position().top)
            }         

            //Dont use the builtin fx effects. This will fade in/out both tabs, we dont want that
            //Fadein the new tab yourself            
            $j(ui.panel).hide().fadeIn(500);

            if (lastOpenedPanel) {

                // 1. Show the previous opened tab by removing the jQuery UI class
                // 2. Make the tab temporary position:absolute so the two tabs will overlap
                // 3. Set topposition so they will overlap if you go from tab 1 to tab 0
                // 4. Remove position:absolute after animation
                lastOpenedPanel
                    .toggleClass("ui-tabs-hide")
                    .css("position", "absolute")
                    .css("top", $j(this).data("topPositionTab") + "px")
                    .fadeOut(500, function() {
                        $j(this)
                        .css("position", "");
                    });

            }

            //Saving the last tab has been opened
            $j(this).data("lastOpenedPanel", $j(ui.panel));

        }

    });
}


/* Hide Show tabs
----------------------------------------- */
function tabbedContent(){
    if($j('.tabs').length != 0){
	    $j('.tabs div.tab').css('height','0px'); //Hide all content
	    $j('.tabs div.tab:first').css('height','auto'); //Show first tab content
	
	    $j('.tablist li').click(function(){
		$j('.tabs div.tab').css('height','0px'); //Hide all tab content
		var activeTab = $j(this).find('a').attr('href');
		$j(activeTab).css('height','auto');
		if($j(this).not('.current')) {
			$j('.tablist li').removeClass('current');
			$j(this).addClass('current');
		}
		return false;
	    });
	 }
}


function removeDefaultOption() {
	if($j('.product-options .size').length) {
		$j('.product-options .size').delegate('.sbHolder','click',function(){
			if($j(this).find('.sbOptions li:visible:first-child')) $j(this).find('.sbOptions li:first-child').addClass("empty");
			else $j(this).find('.sbOptions li:first-child').removeClass("empty")
		});
	}
}


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

function showHide2(moreID, moreBTN) {	 	
	var morePanelID = $j('#'+moreID), //Id of expandable content div
    moreButtonID = $j('#'+moreBTN); //Id of button for this content div	

	morePanelID.css('display','none');
	moreButtonID.click(function(e) {	 	
	 	morePanelID.stop().slideToggle();
	 	$j(this).toggleClass('triggered').text() == 'View the content' ? 'Hide the content' : 'View the content';
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


