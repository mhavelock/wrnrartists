/**
 * @category    front_end
 * @package     Magento Enterprise
 * @author	    Matthew Havelock <matthew.havelock@warnermusic.com>
 */
 
var $j = jQuery.noConflict();
jQuery(function() {  

	cartheaderScrollUp();
	dropDownCountries();
	
	tabbedContentFade();
	tabbedContent();
	showHide2('fx-converter', 'currencyConvertor');
	showHide2('ship-estimate', 'ship-estimate-open');
	
	//showHide2('search_mini_form', 'searchReveal');
	//searchOnSearchPage();
	
	removeDefaultOption();
	html5placeholder();
	$j('.sbox select').selectbox(); /* in plugins.js */
	
	//checkoutStepsHeight()
	
    showCookiePolicy();
    
    // menuCurrentHighlight();
    // twitterGPlus();
    
    /*
    equalHeight( $j('.prodDetailWrap') );
	equalHeight( $j('.two-row .product-name') );
	equalHeight( $j('.two-row .short_desc') );
	equalHeight( $j('.three-row .product-name') );
	equalHeight( $j('.three-row .short_desc') );
	*/
	
	/*
	if ($j('.more-views ul').length) {
    	$j('.more-views ul').jcarousel();
    };
    */

});





/* Mini-cart scroll to latest items
----------------------------------------- */
function cartheaderScrollUp() {	
	$j('#header_cart').click(function() {
		setTimeout(function() {
			$j('#mini-cart').animate({ scrollTop: $j('#mini-cart').prop("scrollHeight") }, 2000);
		}, 300);	
	});
}	


/* Store switcher - language & currency changer
----------------------------------------- */
function dropDownCountries() {
    var dd = $j('#storeSwitcherDD');
    
    if(dd.length) {

    	dd.find('span').each(function() {
    		$j(this).html($j(this).html().replace('€', '€ EUR').replace('£', '£ GBP').replace('de_DE', 'Deutsch').replace('en_GB', 'English').replace('es_ES', 'Español').replace('fr_FR', 'Français').replace('it_IT', 'Italiano'));
    	});
    	$j('#languageSelect').find('li a span').each(function() {
    		$j(this).html($j(this).html().replace('de_DE', '<em>€ EUR</em> <span>Deutsch</span>').replace('en_GB', '<em>£ GBP</em> <span>English</span>').replace('es_ES', '<span>Español</span>').replace('fr_FR', '<em>€ EUR</em> <span>Français</span>').replace('it_IT', '<em>€ EUR</em> <span>Italiano</span>'));
    	});
    	
		dd.css({'cursor':'pointer'});
		$j('#storeSwitcherOptions').css({'display':'none'});
		dd.click(function() {
			$j(this).toggleClass('active').parent().find('#storeSwitcherOptions').slideToggle();
		});
	
    };

};


/* JQuery UI Tabs with Crossfade
----------------------------------------- */
function tabbedContentFade() {
    if($j('#bannertabs').length) {

		$j('#bannertabs').find('div a img').each(function(i) {
			if($j('#bannertabs .banner').length < 1) {
				$j('#bannertabs .tabs').css('display','none');
				return;
			}
		
			var tabContent = $j(this).attr('title');
			$j(this).parents('#bannertabs').find('ul li a span').eq(i).text(tabContent);
		});


		$j('#bannertabs').tabs({
	
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
}


/* Simple show/hide Tabs
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


/* Show hide with height zero for SEO
----------------------------------------- */
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


/* Show hide with display none
----------------------------------------- */
function showHide2(moreID, moreBTN) {	 	
	var morePanelID = $j('#'+moreID), //Id of expandable content div
    moreButtonID = $j('#'+moreBTN); //Id of button for this content div	

	morePanelID.css('display','none');
	moreButtonID.click(function(e) {	 	
	 	morePanelID.stop().slideToggle();
	 	$j(this).toggleClass('triggered').text() == 'View the content' ? 'Hide the content' : 'View the content';
	});
};


/* Remove default option when select box activates
----------------------------------------- */
function removeDefaultOption() {
	if($j('.product-options .size').length) {
		$j('.product-options .size').delegate('.sbHolder','click',function(){
			if($j(this).find('.sbOptions li:visible:first-child')) $j(this).find('.sbOptions li:first-child').addClass("empty");
			else $j(this).find('.sbOptions li:first-child').removeClass("empty")
		});
	}
}


/* HTML5 placeholder
----------------------------------------- */
function html5placeholder() {
      if (!Modernizr.input.placeholder) {
        $j('input[type="text"]').each(function () {
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


function checkoutStepsHeight() {	
	 /* Active steps in accordion JS is not triggered for first login / register
		stage. This JS supplements the main height changes in the accordion.js 
		for those edge cases */
		
	if($j('#checkoutSteps').length) {
		$j('#checkoutSteps .button').click(function(){ 
				var opcStep = $j(this).parents('.section').next('.section').find('.step'),
				opcStepH = opcStep.css('height');
				
				setInterval(function() {
					if(opcStep.parent().hasClass('active')) {
						$j('#checkoutSteps').stop().animate({ height: opcStepH }, 500);
					}
				}, 300);
								
			});
			
		$j('.step-title').click(function(){  
			var opcStep = $j(this).next('.step'),
			opcStepH = parseFloat(opcStep.css('height')) + 70 + 'px';	
			setTimeout(function() {
				$j('#checkoutSteps').stop().animate({ height: opcStepH }, 500);
			}, 300);
		});
	}		
			
			
	/*
	$j('#checkoutSteps').delegate(".button", "click", function() {
		//alert($j(this).attr('class'));
		//alert($j(this).parents('.section').attr('id'));
		//alert($j(this).parents('.section').next('.section').attr('id'));
		//alert($j(this).parents('.section').next('.section').find('.step').css('height'));
		var opcStep = $j(this).parents('.section').next('.section').find('.step'),
		opcStepH = opcStep.css('height');
		
		setTimeout(function() {
			
			//$j('#checkoutSteps').find('.step:visible').css('border','1px solid red');
			
			// alert(opcStepH);
			//$j('#checkoutSteps').animate({ height: opcStepH }, 600);
			$j('#checkoutSteps').stop().animate({ height: opcStepH }, 500);

		}, 300);

	});
	
	
	$j('.step-title').click(function(){  
		//alert($j(this).next('.step').attr('id'));
		var opcStep = $j(this).next('.step'),
		opcStepH = parseFloat(opcStep.css('height')) + 70 + 'px';		
		
		setTimeout(function() {
			
			//$j('#checkoutSteps').find('.step:visible').css('border','1px solid red');
			
			// alert(opcStepH);
			//$j('#checkoutSteps').animate({ height: opcStepH }, 600);
			$j('#checkoutSteps').stop().animate({ height: opcStepH }, 500);

		}, 300);
	});
*/
}



/* Display cookie policy only once
----------------------------------------- */
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


/*
function searchOnSearchPage() {
	if( $j('.catalogsearch-result-index #search_mini_form').length ) {
		$j('.catalogsearch-result-index').find('#search_mini_form').css({'display':'block'}).parent().find('#searchReveal').addClass('triggered');
	}	
}
*/
