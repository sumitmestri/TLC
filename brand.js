( function( $ ) {

	"use strict";
	
	// Tablet Breakpoint
	var tabletBreakPoint = 1024;
	if ( typeof elementorFrontendConfig != "undefined" ) {
		if ( typeof elementorFrontendConfig.breakpoints != "undefined" ) {
			if ( typeof elementorFrontendConfig.breakpoints.lg != "undefined" ) {
				tabletBreakPoint = elementorFrontendConfig.breakpoints.lg - 1;
			}
		}
	}

	// define varibale
	var lastScroll     = 0,
		linkDropdown   = 0;

	// Check for browser OS
	var isMobile     = false,
		isiPhoneiPad = false;

	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
		isMobile = true;
	}
	if ( /iPhone|iPad|iPod/i.test(navigator.userAgent ) ) {
		isiPhoneiPad = true;
	}
	
	// Check safari browser
	var is_safari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent );

	// Check IE
	function isIE() {
		var ua = window.navigator.userAgent,
			msie = ua.indexOf( 'MSIE ' );
		if ( msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ) {
			return true;
		} else {
			return false;
		}
		return false;
	}

	// Get window width
	function getWindowWidth() {
		return $( window ).width();
	}

	// Get window height
	function getWindowHeight() {
		return $( window ).height();
	}

	function headerWrapper( scrollTop ) {

		var mini_header_height    = 0,
			main_header_height    = 0,
			mini_header_ts_height = 0,
			main_header_ts_height = 0,
			wpadminbarHeight      = 0,
			aboveHeaderHeight     = 0,
			ts_height             = 0;

		if ( $( '.admin-bar #wpadminbar' ).length > 0 ) {

			wpadminbarHeight = $( '.admin-bar #wpadminbar' ).outerHeight();
			wpadminbarHeight = Math.round( wpadminbarHeight );
		}

		if ( $( '.mini-header-main-wrapper' ).length > 0 ) {

			var mini_header_object = $( '.mini-header-main-wrapper' );
				mini_header_height = mini_header_object.outerHeight();
				ts_height          = ts_height + mini_header_height;
		}

		if ( $( '.header-common-wrapper.standard' ).length > 0 ) {

			var main_header_object = $( '.header-common-wrapper.standard' );
				main_header_height = main_header_object.outerHeight();
				main_header_object.css( 'margin-top', ts_height );
				ts_height = ts_height + main_header_height;
		}

		var headerAppearFlag = false;
		if ( scrollTop > ts_height ) { // Scroll position is greater than header height
			headerAppearFlag = true;
		}

		if ( $( '.mini-header-main-wrapper' ).length > 0 ) {

			var mini_header_object = $( '.mini-header-main-wrapper' );
				mini_header_object.css( 'margin-top', '0px' );

			if ( mini_header_object.hasClass( 'appear-up-scroll' ) ) {

				if ( scrollTop > lastScroll ) {

					scrollTop = scrollTop - 1;

					if ( headerAppearFlag ) {

						mini_header_object.css( 'top', '-' + ( ts_height ) + 'px' );
					}
					mini_header_object.removeClass( 'header-appear' );

				} else {

					if ( headerAppearFlag ) {

						aboveHeaderHeight = aboveHeaderHeight + mini_header_height;
					}
					mini_header_object.addClass( 'header-appear' );
					mini_header_object.css( 'top', wpadminbarHeight + 'px' );
				}
				
			} else if ( mini_header_object.hasClass( 'appear-down-scroll' ) ) {

				if ( headerAppearFlag && ! $( '.header-common-wrapper.standard' ).hasClass( 'no-sticky' ) ) {

					aboveHeaderHeight = aboveHeaderHeight + mini_header_height;

				} else if ( scrollTop > aboveHeaderHeight && $( '.header-common-wrapper.standard' ).hasClass( 'no-sticky' ) ) {
					mini_header_object.css( 'margin-top',  aboveHeaderHeight + 'px' );
				} 
			}
		}

		if ( $( '.header-common-wrapper.standard' ).length > 0 ) {

			var main_header_object = $( '.header-common-wrapper' );
				main_header_height = main_header_object.outerHeight();

			if ( ! main_header_object.hasClass( 'no-sticky' ) ) {
				if ( headerAppearFlag && scrollTop > 0 ) {
					main_header_object.css( 'margin-top', aboveHeaderHeight + 'px' );

				} else if ( scrollTop > aboveHeaderHeight && $( '.mini-header-main-wrapper' ).hasClass( 'no-sticky' ) ) {

					main_header_object.css( 'margin-top', aboveHeaderHeight + 'px' );
				}
			}

			if ( main_header_object.hasClass( 'appear-up-scroll' ) ) {
				
				if ( scrollTop > lastScroll ) {

					scrollTop = scrollTop - 1;

					if ( headerAppearFlag ) {

						main_header_object.css( 'top', '-' + ( ts_height ) + 'px' );
					}
					main_header_object.removeClass( 'header-appear' );

				} else {

					main_header_object.addClass( 'header-appear' );
					main_header_object.css( 'top', wpadminbarHeight + 'px' );
				}
				
			} else if ( main_header_object.hasClass( 'appear-down-scroll' ) ) {

				if ( headerAppearFlag && ! $( '.mini-header-main-wrapper' ).hasClass( 'no-sticky' ) ) {

					aboveHeaderHeight = aboveHeaderHeight + main_header_height;

				} else if ( scrollTop > aboveHeaderHeight && $( '.mini-header-main-wrapper' ).hasClass( 'no-sticky' ) ) {
					main_header_object.css( 'margin-top', aboveHeaderHeight + 'px' );
				}
			}
		}

		if ( scrollTop > ts_height ) {

			$( 'header.site-header' ).addClass( 'sticky' );

		} else {
			
			$( 'header.site-header' ).removeClass( 'sticky' );
			$( '.mini-header-main-wrapper, .header-common-wrapper' ).removeClass( 'header-appear' );
		}

		lastScroll = scrollTop;

		// Scroll to top
		if ( scrollTop > 150 ) {
			$( '.scroll-top-arrow' ).fadeIn( 'slow' );
			$( '.theme-demos' ).css( 'display', 'block' );
		} else {
			$( '.scroll-top-arrow' ).fadeOut( 'slow' );
		}
	}

	$( window ).on( 'load', function () {
		// No retina image code
		$( 'img:not([data-at2x])' ).each( function() {
			$( this ).attr( 'data-no-retina', '' );
		});
	});

	// document ready event
	$( document ).ready( function () {

		var scrollTop = $( this ).scrollTop();
		headerWrapper( scrollTop );

		// one page scroll
		if ( $( '.inner-link' ).length > 0 && $.inArray( 'smooth-scroll', LithoMain.disable_scripts ) < 0 ) {
			$( '.inner-link' ).smoothScroll( {
				speed: 900,
				offset: 1,
				beforeScroll: function() { $( '.navbar-collapse.collapse' ).collapse( 'hide' ); }
			});
		}

		if ( scrollTop == 10 ) {
			var firstmenuLinks = $( '.navbar-nav li:first-child a' );
			if ( firstmenuLinks.attr( 'href' ) && firstmenuLinks.attr( 'href' ).indexOf( '#' ) > -1 ) {
				firstmenuLinks.addClass( 'active' );
			}
		}

		// swiper slider for single post page
		if ( $( '.litho-post-single-slider' ).length > 0 && $.inArray( 'swiper', LithoMain.disable_scripts ) < 0 ) {
			var swiperFull = new Swiper( '.litho-post-single-slider', {
				loop: true,
				autoplay: {
					delay: 5000,
				},
				keyboard: {
					enabled: true,
					onlyInViewport: true,
				},
				slidesPerView: 1,
				keyboardControl: true,
				preventClicks: false,
				watchOverflow: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				on: {
					resize: function () {
						this.update();
					}
				}
			});
		}

		// fit videos
		if ( $( '.fit-videos' ).length > 0 && $.inArray( 'fitvids', LithoMain.disable_scripts ) < 0 ) {

			$( '.fit-videos' ).fitVids();
		}

		// mini cart 
		if ( $( '.site-header .litho-mini-cart-lists-wrap' ).length > 0 ) {

			lithoCustomVerticalScroll( '.site-header .litho-mini-cart-lists-wrap' );
		}

		/* Successfully loaded cart */
		$( document.body ).on( 'wc_fragments_loaded', function( event, fragments, cart_hash, $button ) {

			lithoCustomVerticalScroll( '.site-header .litho-mini-cart-lists-wrap' );
		});

		/* Update Custom scroll bar after hover mini cart */
		$( document ).on( 'mouseenter', '.widget_shopping_cart_content', function() {

			lithoCustomVerticalScroll( '.site-header .litho-mini-cart-lists-wrap' );
		});

		/* Custom Vertical Scroll Bar Function */
		function lithoCustomVerticalScroll( key ) {

			if ( typeof key === "undefined" || key === null || key === '' ) { 
				key = '.site-header .litho-mini-cart-lists-wrap';
			}
			if ( $.inArray( 'mCustomScrollbar', LithoMain.disable_scripts ) < 0 ) {
				/* Vertical Custom Scrollbar - mini cart */
				$( key ).mCustomScrollbar({

					theme: "dark",
					scrollInertia: 100,
					scrollButtons: {
						enable: false
					},
					keyboard: {
						enable: true
					},
					mouseWheel: {
						enable: true,
						scrollAmount: 200
					},
					advanced: {
						updateOnContentResize: true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/
						autoExpandHorizontalScroll: true, /*auto-expand width for horizontal scrolling: boolean*/
					}
				});
			}
		}

		// Tooltip for all tooltips
		if ( $( '.litho-tooltip' ).length > 0 ) {
			$( '.litho-tooltip' ).tooltip( { boundary: 'window' } );
		}

		// tiltbox
		if ( $( '.tilt-box' ).length > 0 && ! isMobile && $.inArray( 'tilt', LithoMain.disable_scripts ) < 0 ) {
			$( '.tilt-box' ).each( function () {
				var _self	= $( this );
				_self.tilt( {
					maxTilt: 20,
					perspective: 1000,
					easing: 'cubic-bezier(.03,.98,.52,.99)',
					scale: 1,
					speed: 500,
					transition: true,
					reset: true,
					glare: false,
					disableAxis: null,
					maxGlare: 1
				});
			});
		}

		// GDPR
		var gdpr_cookie_name = 'litho_gdpr_cookie_notice_accepted' + LithoMain.site_id,
			div_wrap         = $( '.litho-cookie-policy-wrapper' );

		if ( typeof getLithoCookie( gdpr_cookie_name ) != 'undefined' && getLithoCookie( gdpr_cookie_name ) ) {
			div_wrap.addClass( 'banner-visited' );
			div_wrap.remove();
		}else{
			div_wrap.removeClass( 'banner-visited' );
		}
		
		$( '.litho-cookie-policy-button' ).on( 'click', function() {
			div_wrap.remove();
			setLithoCookie( gdpr_cookie_name, 'visited', '7' );
		});

		/* Set litho Cookie Function */
		function setLithoCookie( cname, cvalue, exdays ) {
			var d = new Date();
			d.setTime( d.getTime() + ( exdays*24*60*60*1000 ) );
			var expires = ( exdays != 0 && exdays != '' ) ? d.toUTCString() : 0;
			document.cookie = cname + "=" + cvalue + ";expires=" + expires + ";path=/";
		}

		/* Remove litho Cookie Function */
		function getLithoCookie( cname ) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent( document.cookie );
			var ca = decodedCookie.split( ';' );
			for ( var i = 0; i < ca.length; i++ ) {
				var c = ca[i];
				while ( c.charAt(0) == ' ' ) {
					c = c.substring(1);
				}
				if ( c.indexOf(name) == 0 ) {
					return c.substring( name.length, c.length );
				}
			}
			return "";
		}

		// Comment form validation
		$( '#commentform .submit' ).on( 'click', function () {
			
			var fields;
				fields = "";
			var _grandParent = $( this ).parent().parent();
			
			if ( _grandParent.find( '#author' ).length == 1 ) {
				if ( $( '#author' ).val().length == 0 || $( '#author' ).val().value == '' ) {
					fields ='1';
					$( '#author' ).addClass( 'inputerror' );
				}
			}
			if ( _grandParent.find( '#comment' ).length == 1 ) {
				if ( $( '#comment' ).val().length == 0 || $( '#comment' ).val().value == '' ) {
					fields ='1';
					$( '#comment' ).addClass( 'inputerror' );
				}
			}
			if ( _grandParent.find( '#email' ).length == 1 ) {
				if ( $( '#email' ).val().length == 0 || $( '#email' ).val().length == '' ) {
					fields ='1';
					$( '#email' ).addClass( 'inputerror' );

				} else {
					var re = new RegExp();
					re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
					var sinput ;
					sinput= "" ;
					sinput = $( '#email' ).val();
					if ( ! re.test( sinput ) ) {
						fields ='1';
						$( '#email' ).addClass( 'inputerror' );
					}
				}
			}
			if ( fields != "" ) {
				return false;
			} else {
				return true;
			}
		});

		$( '.comment-field, #author, #email, #comment' ).on( 'keyup focus', function( e ) {
			$( this ).removeClass( 'inputerror' );
		});

		/* Side Icon */
		$( '.theme-demos' ).find( '.portfolio-grid' ).removeClass( 'portfolio-grid' );
		$( document ).on( 'click', '.all-demo', function() {

			if ( $( 'body' ).hasClass( 'overflow-hidden' ) ) {
				$( 'body' ).removeClass( 'overflow-hidden' );
			} else {
				$( 'body' ).addClass( 'overflow-hidden' );
			}
			
			var themeDemosObj = $( this ).parents( '.theme-demos' );
			themeDemosObj.find( '.grid-loading' ).removeClass( 'grid-loading' );
			
			if ( ! themeDemosObj.hasClass( 'show' ) ) {
				themeDemosObj.addClass( 'show' );
				var themeDemosScrollObj = themeDemosObj.find( '.demos-wrapper' );
				var scrollOptions       = themeDemosScrollObj.attr( 'data-scroll-options' ) || '{ "theme": "dark" }';
				if ( typeof ( scrollOptions ) !== 'undefined' && scrollOptions !== null && $.inArray( 'mCustomScrollbar', LithoMain.disable_scripts ) < 0 ) {
					scrollOptions = $.parseJSON( scrollOptions );
					themeDemosScrollObj.mCustomScrollbar( scrollOptions );
				}
			} else {
				themeDemosObj.removeClass( 'show' );
			}
		});
		/* END Side Icon */
		
		/* Other Video magnific popup */
		if ( $.inArray( 'magnific-popup', LithoMain.disable_scripts ) < 0 && ( $( '.popup-youtube' ).length > 0 || $( '.popup-vimeo' ).length > 0 || $( '.popup-googlemap' ).length > 0 ) ) {

			$( '.popup-youtube, .popup-vimeo, .popup-googlemap' ).magnificPopup( {
				preloader: false,
				type: 'iframe',
				mainClass: 'mfp-fade litho-video-popup',
				removalDelay: 160,
				fixedContentPos: true,
				closeBtnInside: false,
			} );
		}

		// magnific popup dismiss
		$( document ).on( 'click', '.popup-modal-dismiss', function ( e ) {
			e.preventDefault();
			if ( $.inArray( 'magnific-popup', LithoMain.disable_scripts ) < 0 ) {
				$.magnificPopup.close();
			}
		});

		/* Group light box gallery image */
		if ( $.inArray( 'magnific-popup', LithoMain.disable_scripts ) < 0 ) {
			var lightboxgallerygroups = {};
			$( '.lightbox-group-gallery-item' ).each(function () {
				var id = $( this ).attr( 'data-group' );
				if ( ! lightboxgallerygroups[id] ) {
					lightboxgallerygroups[id] = [];
				}
				lightboxgallerygroups[id].push( this );
			});
			
			$.each( lightboxgallerygroups, function () {
				$( this ).magnificPopup({
					type: 'image',
					closeOnContentClick: true,
					closeBtnInside: false,
					fixedContentPos: true,
					gallery: {enabled: true},
					image: {
						titleSrc: function (item) {
							var title = '';
							var lightbox_caption = '';
							if ( item.el.attr( 'title' ) ) {
								title = item.el.attr( 'title' );
							}
							if ( item.el.attr( 'data-lightbox-caption' ) ) {
								lightbox_caption += '<span class="litho-lightbox-caption">';
								lightbox_caption += item.el.attr( 'data-lightbox-caption' );
								lightbox_caption += '</span>';
							}
							return title + lightbox_caption;
						}
					}
				});
			});
		}

		// blog post masonry
		if ( $( '.blog-post-gallery-type' ).length > 0 && $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 && $.inArray( 'isotope', LithoMain.disable_scripts ) < 0 ) {
			$( '.blog-post-gallery-type' ).imagesLoaded( function () {
				$( '.blog-post-gallery-type' ).isotope({
					layoutMode: 'masonry',
					itemSelector: '.grid-item',
					percentPosition: true,
					masonry: {
						columnWidth: '.grid-sizer'
					}
				});
				$( '.blog-post-gallery-type' ).isotope();
			});
		}

		if ( $( '.blog-grid' ).length > 0 && $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 && $.inArray( 'isotope', LithoMain.disable_scripts ) < 0 ) {
			$( '.blog-grid' ).imagesLoaded( function () {
				$( '.blog-grid' ).isotope({
					layoutMode: 'masonry',
					itemSelector: '.grid-item',
					percentPosition: true,
					masonry: {
						columnWidth: '.grid-sizer'
					}
				});
				$( '.blog-grid' ).isotope();
			});
		}

		if ( $( '.default-portfolio-grid' ).length > 0 && $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 && $.inArray( 'isotope', LithoMain.disable_scripts ) < 0 ) {
			$( '.default-portfolio-grid' ).imagesLoaded( function () {
				$( '.default-portfolio-grid' ).isotope({
					layoutMode: 'masonry',
					itemSelector: '.grid-item',
					percentPosition: true,
					masonry: {
						columnWidth: '.grid-sizer'
					}
				});
				$( '.default-portfolio-grid' ).isotope();
			});
		}

		// dropdown menu when elementor disabled
		if ( ! $( 'body' ).hasClass( 'elementor-default' ) ) {

			// Open menu on hover
			$( document ).on( 'mouseenter touchstart', '.dropdown', function ( e ) {

				var _this = $( this );
				_this.addClass( 'open' );
				
				if ( _this.hasClass( 'open' ) && getWindowWidth() > tabletBreakPoint  ) {
					_this.find( '.dropdown-menu' ).removeClass( 'show' );
				}
				_this.siblings( '.dropdown' ).removeClass( 'open' );
				if ( getWindowWidth() >= tabletBreakPoint ) {
					if ( $( e.target ).siblings( '.dropdown-menu' ).length ) {
						e.preventDefault();
					}
				}
				
			}).on( 'mouseleave', '.dropdown', function() {
				
				var _this = $( this );
				_this.removeClass( 'open' );
			});
		}

		// Parent menu active in mega menu
		$( '.header-common-wrapper ul.navbar-nav .megamenu' ).each( function () {
			var activeMenuLength = $( this ).find( '.megamenu-content .current-menu-item' ).length;
			if ( activeMenuLength ) {
				if ( ! $( this ).hasClass( 'current-menu-ancestor' ) ) {
					$( this ).addClass( 'current-menu-ancestor' );
				}
			}
		});

		// close side menu on outside area
		$( document ).on( 'touchstart click', '.show-menu', function ( e ) {
			if ( ! ( $( e.target ).hasClass( 'push-button' ) || $( e.target ).closest( '.push-button' ).length || $( e.target ).closest( '.push-menu' ).length || $( e.target ).closest( '.hamburger-menu' ).length || $( e.target ).parents( '.left-menu-modern' ).length || $( e.target ).closest( 'div.elementor-no-template-message' ).length ) ) {
			  $( '.close-menu' ).trigger( 'click' );
			}
		});

		// hambarger menu open
		$( document ).on( 'click', '.header-push-button .push-button', function ( event ) {
			event.preventDefault();

			if ( $( 'body' ).hasClass( 'show-menu' ) ) {
				$( 'body' ).removeClass( 'show-menu' );
				$( '.sub-menu-item' ).collapse( 'hide' );
				$( '.menu-list-item.open' ).removeClass( 'show' );
			} else {
				$( 'body' ).addClass( 'show-menu' );
			}
		} );

		// side menu submenu toggle
		$( document ).on( 'click', '.litho-left-menu > li.menu-item-has-children > .menu-toggle', function () {

			$( '.sub-menu-item' ).each( function () {
				$( this ).collapse( 'hide' );
			});
			$( '.left-sidebar-wrapper .left-sidebar-nav' ).parents( 'body' ).addClass( 'left-classic-mobile-menu' );
			setTimeout( function () {
				if ( $.inArray( 'sticky-kit', LithoMain.disable_scripts ) < 0 ) {
					$( '.left-sidebar-wrapper' ).trigger( 'sticky_kit:recalc' );
				}

			}, 500 );
		});

		// side menu submenu toggle
		$( document ).on( 'click', '.sub-menu-item > li.menu-item-has-children > .menu-toggle', function (e) {
			e.preventDefault();
			
			var _parent = $( this ).parent().find( '.sub-menu-item' );
			var _parentAttr = $( this ).attr( 'data-bs-target' );
			$( this ).parent().parent( '.sub-menu-item' ).find( '.sub-menu-item' ).each( function () {
				var _this   = $( this ),
					attr    = _this.parent().find( '.menu-toggle' ).attr( 'data-bs-target' );

				if ( attr != _parentAttr ) {
					_this.parent().find( '.menu-toggle:not(.collapsed)' ).addClass( 'collapsed' );
					_this.collapse( 'hide' );
				}
			});
			$( '.left-sidebar-wrapper .left-sidebar-nav' ).parents( 'body' ).addClass( 'left-classic-mobile-menu' );
			setTimeout( function () {
				if ( $.inArray( 'sticky-kit', LithoMain.disable_scripts ) < 0 ) {
					$( '.left-sidebar-wrapper' ).trigger( 'sticky_kit:recalc' );
				}
			}, 500);
		});

		// hamburger / side menu close
		var flag = false;
		$( document ).on( 'click', '.close-menu', function () {
			if ( ! flag ) {
				flag = true;
				setTimeout(function () {
					flag = false;
				}, 500 );

				$( 'body' ).removeClass( 'show-menu left-classic-mobile-menu' );
				$( '.sub-menu-item' ).collapse( 'hide' );
				$( '.menu-item.open' ).removeClass( 'show' );
			}
		} );

		//Close on escape key
		$( document ).on( 'keydown', function (e) {
			if ( e.keyCode === 27 ) {
				
				// Close side menu
				$( '.close-menu' ).trigger( 'click' );

				$( window ).trigger( 'closemenu' );
			}
		});

		// Return header top space
		function getTopSpaceHeaderHeight() {

			var mini_header_height = 0,
				main_header_height = 0,
				wpadminbarHeight   = 0,
				ts_height          = 0;

			if ( $( '.admin-bar #wpadminbar' ).length > 0 ) {

				wpadminbarHeight = $( '.admin-bar #wpadminbar' ).outerHeight();
				wpadminbarHeight = Math.round( wpadminbarHeight );
				ts_height        = ts_height + wpadminbarHeight;
			}

			if ( $( '.mini-header-main-wrapper' ).length > 0 ) {

				var mini_header_object = $( '.mini-header-main-wrapper' );
					mini_header_height = mini_header_object.outerHeight();
					ts_height          = ts_height + mini_header_height;
			}

			if ( $( '.header-common-wrapper.standard' ).length > 0 ) {

				var main_header_object = $( '.header-common-wrapper.standard' );
					main_header_height = main_header_object.outerHeight();
					ts_height          = ts_height + main_header_height;
			}

			return ts_height;
		}

		// header top space + title space + first section of content
		setHeaderTopSpace();
		function setHeaderTopSpace() {
			
			var mini_header_height    = 0,
				main_header_height    = 0,
				mini_header_ts_height = 0,
				main_header_ts_height = 0,
				wpadminbarHeight      = 0,
				ts_height             = 0,
				ts_full_title_height  = 0;

			if ( $( '.mini-header-main-wrapper' ).length > 0 ) {

				var mini_header_object = $( '.mini-header-main-wrapper' );
				if ( ! $( 'header' ).hasClass( 'sticky' ) ) {
					mini_header_height = mini_header_object.outerHeight();
					ts_height          = ts_height + mini_header_height;
				}
			}

			if ( $( '.header-common-wrapper.standard' ).length > 0 ) {

				var main_header_object = $( '.header-common-wrapper.standard' );
					main_header_height = main_header_object.outerHeight();
					main_header_object.css( 'margin-top', ts_height );
					ts_height = ts_height + main_header_height;
			}

			// for  Left Menu Classic mobile menu
			if ( $( '.header-common-wrapper.left-menu-classic' ).length > 0 ) {

				var main_header_object = $( '.header-common-wrapper.left-menu-classic' ).find( '.elementor section' ).first();
					main_header_height = main_header_object.outerHeight();
					ts_height = ts_height + main_header_height;
			}

			// for page content first section ( elementor )
			var pageContent  = $( '.litho-main-content-wrap' ).find( '.entry-content-inner' ),
				sectionFirst = pageContent.find( '.elementor section' ).first();

			// for page title first section
			var pageTitle        = $( '.litho-main-title-wrappper' ),
				pageTitlesection = pageTitle.find( '.elementor section' ).first();

			if ( $( '.litho-main-title-wrappper' ).length > 0 && pageTitlesection.hasClass( 'top-space' ) || $( '.default-main-title-wrappper' ).length > 0 ) {

				var padding_top = $( '.litho-main-title-wrappper' ).attr( 'data-padding-top' );
				
				if ( padding_top == '' || padding_top == undefined ) {

					padding_top = $( '.litho-main-title-wrappper' ).css( 'padding-top' );

					$( '.litho-main-title-wrappper' ).attr( 'data-padding-top', padding_top );
				}
				
				ts_height =  parseInt( ts_height ) + parseInt( padding_top );

				$( '.litho-main-title-wrappper .top-space' ).css( 'padding-top', ts_height + 'px' );

			} else if ( $( '.litho-main-inner-content-wrap' ).hasClass( 'top-space' ) && $( '.litho-main-title-wrappper' ).length === 0 ) {

				// single post
				$( '.litho-main-inner-content-wrap.top-space' ).parents( '.litho-main-content-wrap' ).css( 'margin-top', ts_height + 'px' );

			} else if ( ( sectionFirst.hasClass( 'top-space' ) || $( '.error-404' ).hasClass( 'top-space' ) ) && $( '.litho-main-title-wrappper' ).length === 0 ) {
				// First section of page content header top space
				$( '.litho-main-content-wrap .top-space, .error-404.top-space' ).parents( '.litho-main-content-wrap' ).css( 'margin-top', ts_height + 'px' );

			} else {
				
				// For Mobile Menu Top Space
				if ( getWindowWidth() <= tabletBreakPoint ) {

					$( 'header nav' ).addClass( 'mobile-top-space' );
					
					if ( $( 'header nav' ).hasClass( 'mobile-top-space' ) ) {
						$( 'body' ).css( 'padding-top', ts_height + 'px' );
					}
					
				} else {

					$( 'header nav' ).removeClass( 'mobile-top-space' );
					$( 'body' ).css( 'padding-top', '' );
					if ( ( ! $( 'header nav' ).hasClass( 'no-sticky' ) && $( 'header nav' ).hasClass( 'mobile-top-space' ) ) || $( '.left-menu-classic' ).hasClass( 'mobile-top-space' ) ) {
						$( 'body' ).css( 'padding-top', ts_height + 'px' );
					} else {
						$( 'body' ).css( 'padding-top', '' );
					}
				}
			}
			
			// FULLSCREEN min-height
			if ( $( '.full-screen' ).length > 0 && $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 ) {

				if ( $( '.admin-bar #wpadminbar' ).length > 0 ) {

					wpadminbarHeight = $( '.admin-bar #wpadminbar' ).outerHeight();
					wpadminbarHeight = Math.round( wpadminbarHeight );
				}

				$( '.full-screen' ).each( function() {
					var _self = $( this );
					
					_self.parents( '.elementor-top-section' ).imagesLoaded( function () {
						
						var minheight = getWindowHeight();
						if ( _self.parents( '.elementor-top-section' ).hasClass( 'top-space' ) ) {
							
							minheight = minheight - ts_height;
							_self.css( 'min-height', ( minheight - wpadminbarHeight ) );
							
						} else {

							if ( getWindowWidth() <= tabletBreakPoint ) {

								var fulltotalHeight =  wpadminbarHeight + ts_height;

								_self.css( 'min-height', minheight - fulltotalHeight );

							} else {

								_self.css( 'min-height', ( minheight - wpadminbarHeight ) );
							}
						}

					});
				});
			}

			// FULLSCREEN Height
			if ( $( '.full-screen-height' ).length > 0 ) {
				
				if ( $( '.admin-bar #wpadminbar' ).length > 0 ) {

					wpadminbarHeight = $( '.admin-bar #wpadminbar' ).outerHeight();
					wpadminbarHeight = Math.round( wpadminbarHeight );
				}
				
				$( '.full-screen-height' ).each( function() {
					var _self = $( this );
					var _height = getWindowHeight();

					setTimeout( function () {
						if ( getWindowWidth() <= tabletBreakPoint ) {
							var fulltotalHeight =  wpadminbarHeight + ts_height;
							_self.css( 'height', ( _height - fulltotalHeight ) );
						} else {
							_self.css( 'height', ( _height - wpadminbarHeight ) );
						}
					}, 500 );
				});
			}
		}
		
		// sticky left menu
		stickyElement();
		function stickyElement() {
			if ( getWindowWidth() >= tabletBreakPoint ) { 
				if ( $( '.left-sidebar-wrapper .header-left-wrapper' ).length > 0 && $.inArray( 'sticky-kit', LithoMain.disable_scripts ) < 0 ) {
					$( '.left-sidebar-wrapper .header-left-wrapper' ).stick_in_parent( {
						recalc: 1
					} );
				}
			}
		}

		// Sticky footer
		stickyFooter();
		function stickyFooter() {
			if ( $( '.footer-sticky' ).length > 0 ) {
				if ( $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 ) {
					$( '.footer-sticky' ).imagesLoaded( function () {
						stickyFootercallback();
					});
				} else {
					stickyFootercallback();
				}
			}
			if ( $( '.box-layout' ).length > 0 && $( '.footer-sticky' ).length > 0 ) {
				var boxLayoutObj    = $( '.box-layout' ),
					boxLayoutwidth  = boxLayoutObj.width();
				boxLayoutObj.find( '.footer-sticky' ).css({'margin': '0 auto', 'width': boxLayoutwidth, 'max-width': boxLayoutwidth });
			}
		}

		function stickyFootercallback() {
			var footerHeight = $( '.footer-sticky' ).outerHeight();
			$( '.litho-main-content-wrap' ).css({ 'margin-bottom': footerHeight });
		}

		// For mobile left menu classic
		if ( $( '.header-common-wrapper' ).hasClass( 'left-menu-classic' ) ) {
			var $leftMenu = $( '.left-menu-classic' ).find( '.elementor-widget-litho-left-menu' );
			if ( $leftMenu.length > 0 ) {
				$leftMenu.parents( '.elementor-top-section' ).addClass( 'left-menu-classic-section' );
			}
		}

		var $navbarWidgetNavbar = $( '.header-common-wrapper.standard .elementor-widget-litho-mega-menu .navbar-collapse' );
		var $navbarWidgetNavbarToggle = $( '.header-common-wrapper.standard .elementor-widget-litho-mega-menu .navbar-toggler' );
		var mobileNavStyle = $( 'body' ).attr( 'data-mobile-nav-style' );

		// mobile navigation modern/full-screen style
		mobileModernFullscreenNavigation();
		function mobileModernFullscreenNavigation() {
			
			var layout_class = '';
			if ( $( '.box-layout' ).length > 0 ) {
				layout_class = '.box-layout';
			} else {
				layout_class = '.page-layout';
			}

			if ( getWindowWidth() <= tabletBreakPoint ) {

				if ( ( mobileNavStyle == 'modern' || mobileNavStyle == 'full-screen-menu' ) && $navbarWidgetNavbar.length > 1 && ! $( '.navbar-nav-clone' ).length ) {

					$navbarWidgetNavbar.first().find( '.navbar-nav' ).clone( false ).addClass( 'navbar-nav-clone' ).insertBefore( $navbarWidgetNavbar.last().find( '.navbar-nav' ) );
					$navbarWidgetNavbar.last().addClass( 'navbar-collapse-final' );
					$navbarWidgetNavbarToggle.last().addClass( 'navbar-toggler-final' );
				}

			} else {

				if ( ( mobileNavStyle == 'modern' || mobileNavStyle == 'full-screen-menu' ) && $navbarWidgetNavbar.length > 1 && $( '.navbar-nav-clone' ).length > 0 ) {
					$navbarWidgetNavbar.last().removeClass( 'navbar-collapse-final' );
					$navbarWidgetNavbarToggle.last().removeClass( 'navbar-toggler-final' );
					$navbarWidgetNavbar.last().find( '.navbar-nav-clone' ).remove();
				}
			}

			if ( getWindowWidth() <= tabletBreakPoint ) {

				if ( ( mobileNavStyle == 'modern' || mobileNavStyle == 'full-screen-menu' ) && ! $( '.navbar-' + mobileNavStyle + '-inner' ).length ) {

					if ( $navbarWidgetNavbar.length > 1 ) {
						
						var targetButtonClone   = $( '.header-common-wrapper.standard .navbar-toggler-final' ).clone( false ).addClass( 'navbar-toggler-clone' ).insertAfter( layout_class ),
							targetNavClone      = $( '.header-common-wrapper.standard .navbar-collapse-final' ).clone( false ).addClass( 'navbar-collapse-clone' ).attr( 'id', 'navbarNav-clone' ).insertAfter( layout_class );
						
						var mobileNavInnerHTML	= '';
							mobileNavInnerHTML += '<div class="navbar-';
							mobileNavInnerHTML += mobileNavStyle;
							mobileNavInnerHTML += '-inner"></div>';
						$( '.navbar-toggler-clone, .navbar-collapse-clone' ).wrapAll( mobileNavInnerHTML );
						$( '.navbar-toggler' ).attr( 'data-bs-target', '#navbarNav-clone' ).attr( 'aria-controls', '#navbarNav-clone' );
						
					} else {

						var targetButtonClone   = $( '.header-common-wrapper.standard .navbar-toggler' ).clone( false ).addClass( 'navbar-toggler-clone' ).insertAfter( layout_class ),
							targetNavClone      = $( '.header-common-wrapper.standard .navbar-collapse' ).clone( false ).addClass( 'navbar-collapse-clone' ).attr( 'id', 'navbarNav-clone' ).insertAfter( layout_class );
						
						var mobileNavInnerHTML	= '';
							mobileNavInnerHTML += '<div class="navbar-';
							mobileNavInnerHTML += mobileNavStyle;
							mobileNavInnerHTML += '-inner"></div>';
						$( '.navbar-toggler-clone, .navbar-collapse-clone' ).wrapAll( mobileNavInnerHTML );
						$( '.navbar-toggler' ).attr( 'data-bs-target', '#navbarNav-clone' ).attr( 'aria-controls', '#navbarNav-clone' );
					}
					
					$( '.navbar-' + mobileNavStyle + '-inner' ).find( '.dropdown-toggle' ).addClass( 'dropdown-toggle-clone' );

					if ( $( '.navbar-collapse-clone' ).length > 0 && $.inArray( 'mCustomScrollbar', LithoMain.disable_scripts ) < 0 ) {
						$( '.navbar-collapse-clone' ).mCustomScrollbar();
					}

					if ( mobileNavStyle == 'modern' && ! $( '.navbar-show-modern-bg' ).length ) {
						$( '<div class="navbar-show-modern-bg"></div>' ).insertAfter( layout_class );
					}
				}
			}			
		}

		// hide collaps on outside click
		$( document ).on( 'touchstart click', 'body', function ( e ) {

			if ( ! $( e.target ).parents( 'nav' ).hasClass( 'standard' ) && getWindowWidth() >= tabletBreakPoint ) {
				if ( $( '.dropdown' ).length > 0 ) {
					$( '.dropdown' ).each( function () {
						if ( $( this ).hasClass( 'open' ) ) {
							$( this ).removeClass( 'open show' );
						}
					});
				}
			}

			if ( ! $( '.navbar-collapse' ).has( e.target ).is( '.navbar-collapse' ) &&
				$( '.navbar-collapse' ).hasClass( 'show' ) &&
				! $( e.target ).hasClass( 'navbar-toggle' ) &&
				! $( e.target ).hasClass( 'navbar-collapse-clone' ) ) {
				
				$( '.navbar-collapse' ).collapse( 'hide' );
			}

			if ( ! $( e.target ).closest( '.theme-demos' ).length && $( '.theme-demos' ).hasClass( 'show' ) ) {
				$( '.theme-demos' ).removeClass( 'show' );

				if ( $( 'body' ).hasClass('overflow-hidden') ) {
					$( 'body' ).removeClass('overflow-hidden');
				}
			}
		});

		// navbar toggle
		var flag = false;
		$( document ).on( 'click', '.navbar-toggle', function ( e ) {
			if ( getWindowWidth() >= tabletBreakPoint ) {
				if ( ! flag ) {
					flag = true;
					setTimeout(function () {
						flag = false;
					}, 500);
					$( 'body' ).addClass( 'show-menu' );
				} else {
					if ( ! $( '.navbar-collapse' ).has( e.target ).is( '.navbar-collapse' ) && $( '.navbar-collapse ul' ).hasClass( 'show' ) ) {
						$( '.navbar-collapse' ).find( 'a.dropdown-toggle' ).addClass( 'collapsed' );
						$( '.navbar-collapse' ).find( 'ul.dropdown-menu' ).removeClass( 'show' );
						$( '.navbar-collapse a.dropdown-toggle' ).removeClass( 'active' );
					}
				}
			}
		});

		// Bootstrap dropdown toggle
		navbarDropdown();
		function navbarDropdown() {
			if ( $( '.navbar-modern-inner' ).length > 0 ) {
				
				if ( $( '.dropdown-toggle-clone' ).length > 0 && $.isFunction( window.dropdown ) ) {
					$( '.dropdown-toggle-clone' ).dropdown();
				}

			} else {
				if ( $( '.dropdown-toggle' ).length > 0 && $.isFunction( window.dropdown ) ) {
					$( '.dropdown-toggle' ).dropdown();
				}
			}
		}

		// Navbar collapse modern & full screen menu event
		navbarCollapseToggle();
		function navbarCollapseToggle() {
			$( '.navbar-collapse-clone.collapse' ).on( 'show.bs.collapse', function () {
				
				if ( ! $( 'body' ).hasClass( 'navbar-collapse-show' ) ) {
					$( 'body' ).addClass( 'navbar-collapse-show' );
					if ( $( 'body' ).attr( 'data-mobile-nav-bg-color' ) && $( '.navbar-modern-inner' ).length > 0 ) {
						var bgColor = $( 'body' ).attr( 'data-mobile-nav-bg-color' );
						$( '.navbar-show-modern-bg' ).css( 'background', bgColor );
					}
					if ( $( 'body' ).attr( 'data-mobile-nav-bg-color' ) && $( '.navbar-full-screen-menu-inner' ).length > 0 ) {
						var bgColor = $( 'body' ).attr( 'data-mobile-nav-bg-color' );
						$( '.navbar-full-screen-menu-inner' ).css( 'background', bgColor );
					}
				}

				var windowHeight = getWindowHeight();
				if ( $( '.navbar-modern-inner' ).length > 0 || $( '.navbar-full-screen-menu-inner' ).length > 0 ) {
					$( this ).css( 'max-height', windowHeight );
				} else {
					$( this ).css( 'max-height', ( windowHeight - getTopSpaceHeaderHeight() ) );
				}
				
			}).on( 'hide.bs.collapse', function () {
				if ( $( 'body' ).hasClass( 'navbar-collapse-show' ) ) {
					$( 'body' ).removeClass( 'navbar-collapse-show' );
				}
			});
		}

		// START window scroll event
		var pageScroll = 0;
		$( window ).on( 'scroll', function() {
			var scrollTop = $( this ).scrollTop();
			if ( pageScroll > 0 || scrollTop > pageScroll ) {
				headerWrapper( scrollTop );
			}
			pageScroll++;

			/****** One page navigation ******/
			var menuLinks = $( '.navbar-nav li a' ),
			scrollPos = scrollTop + 60;
			if ( menuLinks.length > 0 ) {
				menuLinks.each( function () {
					var _this = $( this );
					if( _this.attr( 'href' ) != '' && _this.attr( 'href' ) != undefined ) {
						var hasPos  = _this.attr( 'href' ).indexOf( '#' );
						if ( hasPos > -1 ) {
							var res = _this.attr( 'href' ).substring( hasPos );
							var hashID = res.replace( '#', '' );
							var elementExists = document.getElementById( hashID );
							if ( res != '' && res != '#' && elementExists != '' && elementExists != null ) {
								var refElement = $( res );
								if ( refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos ) {
									menuLinks.removeClass( 'active' );
									_this.addClass( 'active' );
								}

								if ( scrollTop < 1 ) {
									_this.removeClass( 'active' );
								}
							}
						}
					}
				});
			}
		} );
		// END window scroll event
		
		// START window resize event
		$( window ).on( 'resize', function() {
			
			//megaMenuOnResize();
			stickyElement();
			stickyFooter();

			//mobileClassicNavigation();
			mobileModernFullscreenNavigation();
			navbarCollapseToggle();
			// Bootstrap dropdown toggle
			navbarDropdown();

			setTimeout( function () {
				setHeaderTopSpace();
			}, 400 );

			if ( ! $( 'body' ).hasClass( 'elementor-editor-active' ) ) {
				
				setTimeout(function () {
					
					if ( $( '.blog-grid' ).length > 0 && $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 && $.inArray( 'isotope', LithoMain.disable_scripts ) < 0 ) {

						$( '.blog-grid' ).imagesLoaded( function() {
							$( '.blog-grid' ).isotope();
						});
					}
					if ( $( '.blog-post-gallery-type' ).length > 0 && $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 && $.inArray( 'isotope', LithoMain.disable_scripts ) < 0 ) {
						
						$( '.blog-post-gallery-type' ).imagesLoaded( function() {
							$( '.blog-post-gallery-type' ).isotope( 'layout' );
						});
					}
					if ( $( '.default-portfolio-grid' ).length > 0 && $.inArray( 'imagesloaded', LithoMain.disable_scripts ) < 0 && $.inArray( 'isotope', LithoMain.disable_scripts ) < 0 ) {

						$( '.default-portfolio-grid' ).imagesLoaded( function() {
							$( '.default-portfolio-grid' ).isotope( 'layout' );
						});
					}

				}, 500 );
			}
		});
		// END window resize event

		// Window orientationchange
		$( window ).on( 'orientationchange', function( e ) {

			// Close side menu
			$( '.close-menu' ).trigger( 'click' );

			$( window ).trigger( 'closemenu' );
		});

		$( window ).on( 'closemenu', function( e ) {
			// Close all dropdown
			$( '.dropdown' ).each( function () {
				var _this = $( this );
				_this.trigger( 'mouseleave' );
				_this.removeClass( 'show' );
				_this.children( '.dropdown-menu' ).removeClass( 'show' );
			});

			// Close all menu
			if ( $( '.navbar-collapse' ).hasClass( 'show' ) ) {
				$( '.navbar-collapse' ).collapse( 'hide' );
				$( '.navbar-collapse' ).removeClass( 'show' );
			}
			if ( $( 'body' ).hasClass( 'navbar-collapse-show' ) ) {
				$( 'body' ).removeClass( 'navbar-collapse-show' );
			}
			setTimeout( function () {
				if ( $( 'body' ).hasClass( 'navbar-collapse-show-after' ) ) {
					$( 'body' ).removeClass( 'navbar-collapse-show-after' );
				}
			}, 500 );

			setTimeout( function () {
				$( '.navbar-collapse' ).css( 'left', '' );
			}, 400 );
		});

		$( document ).on( 'click', '.scroll-top-arrow', function () {
			$( 'html, body' ).animate({ scrollTop: 0 }, 800 );
			return false;
		});

	} ); // End document ready

})( jQuery );

;/*! elementor - v3.6.5 - 27-04-2022 */
(()=>{"use strict";var e,r,_,t,i,a={},n={};function __webpack_require__(e){var r=n[e];if(void 0!==r)return r.exports;var _=n[e]={exports:{}};return a[e](_,_.exports,__webpack_require__),_.exports}__webpack_require__.m=a,e=[],__webpack_require__.O=(r,_,t,i)=>{if(!_){var a=1/0;for(u=0;u<e.length;u++){for(var[_,t,i]=e[u],n=!0,c=0;c<_.length;c++)(!1&i||a>=i)&&Object.keys(__webpack_require__.O).every((e=>__webpack_require__.O[e](_[c])))?_.splice(c--,1):(n=!1,i<a&&(a=i));if(n){e.splice(u--,1);var o=t();void 0!==o&&(r=o)}}return r}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[_,t,i]},_=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,__webpack_require__.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var i=Object.create(null);__webpack_require__.r(i);var a={};r=r||[null,_({}),_([]),_(_)];for(var n=2&t&&e;"object"==typeof n&&!~r.indexOf(n);n=_(n))Object.getOwnPropertyNames(n).forEach((r=>a[r]=()=>e[r]));return a.default=()=>e,__webpack_require__.d(i,a),i},__webpack_require__.d=(e,r)=>{for(var _ in r)__webpack_require__.o(r,_)&&!__webpack_require__.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:r[_]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((r,_)=>(__webpack_require__.f[_](e,r),r)),[])),__webpack_require__.u=e=>723===e?"lightbox.2b2c155d6ec60974d8c4.bundle.min.js":48===e?"text-path.9f18ebdea5ac00d653e5.bundle.min.js":209===e?"accordion.1840403ce81de408c749.bundle.min.js":745===e?"alert.cbc2a0fee74ee3ed0419.bundle.min.js":120===e?"counter.02cef29c589e742d4c8c.bundle.min.js":192===e?"progress.ca55d33bb06cee4e6f02.bundle.min.js":520===e?"tabs.37d5b4877cdb51ea91e9.bundle.min.js":181===e?"toggle.56f8ace4b1e830c02fc5.bundle.min.js":791===e?"video.d86bfd0676264945e968.bundle.min.js":268===e?"image-carousel.db284b09c0f8a8f1c44d.bundle.min.js":357===e?"text-editor.289ae80d76f0c5abea44.bundle.min.js":52===e?"wp-audio.75f0ced143febb8cd31a.bundle.min.js":413===e?"container.e026b16a99db8a3987c9.bundle.min.js":void 0,__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t={},i="elementor:",__webpack_require__.l=(e,r,_,a)=>{if(t[e])t[e].push(r);else{var n,c;if(void 0!==_)for(var o=document.getElementsByTagName("script"),u=0;u<o.length;u++){var b=o[u];if(b.getAttribute("src")==e||b.getAttribute("data-webpack")==i+_){n=b;break}}n||(c=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,__webpack_require__.nc&&n.setAttribute("nonce",__webpack_require__.nc),n.setAttribute("data-webpack",i+_),n.src=e),t[e]=[r];var onScriptComplete=(r,_)=>{n.onerror=n.onload=null,clearTimeout(p);var i=t[e];if(delete t[e],n.parentNode&&n.parentNode.removeChild(n),i&&i.forEach((e=>e(_))),r)return r(_)},p=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=onScriptComplete.bind(null,n.onerror),n.onload=onScriptComplete.bind(null,n.onload),c&&document.head.appendChild(n)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var r=__webpack_require__.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var _=r.getElementsByTagName("script");_.length&&(e=_[_.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{var e={162:0};__webpack_require__.f.j=(r,_)=>{var t=__webpack_require__.o(e,r)?e[r]:void 0;if(0!==t)if(t)_.push(t[2]);else if(162!=r){var i=new Promise(((_,i)=>t=e[r]=[_,i]));_.push(t[2]=i);var a=__webpack_require__.p+__webpack_require__.u(r),n=new Error;__webpack_require__.l(a,(_=>{if(__webpack_require__.o(e,r)&&(0!==(t=e[r])&&(e[r]=void 0),t)){var i=_&&("load"===_.type?"missing":_.type),a=_&&_.target&&_.target.src;n.message="Loading chunk "+r+" failed.\n("+i+": "+a+")",n.name="ChunkLoadError",n.type=i,n.request=a,t[1](n)}}),"chunk-"+r,r)}else e[r]=0},__webpack_require__.O.j=r=>0===e[r];var webpackJsonpCallback=(r,_)=>{var t,i,[a,n,c]=_,o=0;if(a.some((r=>0!==e[r]))){for(t in n)__webpack_require__.o(n,t)&&(__webpack_require__.m[t]=n[t]);if(c)var u=c(__webpack_require__)}for(r&&r(_);o<a.length;o++)i=a[o],__webpack_require__.o(e,i)&&e[i]&&e[i][0](),e[a[o]]=0;return __webpack_require__.O(u)},r=self.webpackChunkelementor=self.webpackChunkelementor||[];r.forEach(webpackJsonpCallback.bind(null,0)),r.push=webpackJsonpCallback.bind(null,r.push.bind(r))})()})();
;/*! elementor - v3.6.5 - 27-04-2022 */
(self.webpackChunkelementor=self.webpackChunkelementor||[]).push([[354],{7914:e=>{e.exports=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}},e.exports.default=e.exports,e.exports.__esModule=!0},381:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=(e,t)=>{t=Array.isArray(t)?t:[t];for(const n of t)if(e.constructor.name===n.prototype[Symbol.toStringTag])return!0;return!1}},8135:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class _default extends elementorModules.ViewModule{getDefaultSettings(){return{selectors:{elements:".elementor-element",nestedDocumentElements:".elementor .elementor-element"},classes:{editMode:"elementor-edit-mode"}}}getDefaultElements(){const e=this.getSettings("selectors");return{$elements:this.$element.find(e.elements).not(this.$element.find(e.nestedDocumentElements))}}getDocumentSettings(e){let t;if(this.isEdit){t={};const e=elementor.settings.page.model;jQuery.each(e.getActiveControls(),(n=>{t[n]=e.attributes[n]}))}else t=this.$element.data("elementor-settings")||{};return this.getItems(t,e)}runElementsHandlers(){this.elements.$elements.each(((e,t)=>elementorFrontend.elementsHandler.runReadyTrigger(t)))}onInit(){this.$element=this.getSettings("$element"),super.onInit(),this.isEdit=this.$element.hasClass(this.getSettings("classes.editMode")),this.isEdit?elementor.on("document:loaded",(()=>{elementor.settings.page.model.on("change",this.onSettingsChange.bind(this))})):this.runElementsHandlers()}onSettingsChange(){}}t.default=_default},2821:(e,t,n)=>{"use strict";var s=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(3090));class SwiperHandlerBase extends i.default{getInitialSlide(){const e=this.getEditSettings();return e.activeItemIndex?e.activeItemIndex-1:0}getSlidesCount(){return this.elements.$slides.length}togglePauseOnHover(e){e?this.elements.$swiperContainer.on({mouseenter:()=>{this.swiper.autoplay.stop()},mouseleave:()=>{this.swiper.autoplay.start()}}):this.elements.$swiperContainer.off("mouseenter mouseleave")}handleKenBurns(){const e=this.getSettings();this.$activeImageBg&&this.$activeImageBg.removeClass(e.classes.kenBurnsActive),this.activeItemIndex=this.swiper?this.swiper.activeIndex:this.getInitialSlide(),this.swiper?this.$activeImageBg=jQuery(this.swiper.slides[this.activeItemIndex]).children("."+e.classes.slideBackground):this.$activeImageBg=jQuery(this.elements.$slides[0]).children("."+e.classes.slideBackground),this.$activeImageBg.addClass(e.classes.kenBurnsActive)}}t.default=SwiperHandlerBase},3090:e=>{"use strict";e.exports=elementorModules.ViewModule.extend({$element:null,editorListeners:null,onElementChange:null,onEditSettingsChange:null,onPageSettingsChange:null,isEdit:null,__construct:function(e){this.isActive(e)&&(this.$element=e.$element,this.isEdit=this.$element.hasClass("elementor-element-edit-mode"),this.isEdit&&this.addEditorListeners())},isActive:function(){return!0},findElement:function(e){var t=this.$element;return t.find(e).filter((function(){return jQuery(this).closest(".elementor-element").is(t)}))},getUniqueHandlerID:function(e,t){return e||(e=this.getModelCID()),t||(t=this.$element),e+t.attr("data-element_type")+this.getConstructorID()},initEditorListeners:function(){var e=this;if(e.editorListeners=[{event:"element:destroy",to:elementor.channels.data,callback:function(t){t.cid===e.getModelCID()&&e.onDestroy()}}],e.onElementChange){const t=e.getWidgetType()||e.getElementType();let n="change";"global"!==t&&(n+=":"+t),e.editorListeners.push({event:n,to:elementor.channels.editor,callback:function(t,n){e.getUniqueHandlerID(n.model.cid,n.$el)===e.getUniqueHandlerID()&&e.onElementChange(t.model.get("name"),t,n)}})}e.onEditSettingsChange&&e.editorListeners.push({event:"change:editSettings",to:elementor.channels.editor,callback:function(t,n){n.model.cid===e.getModelCID()&&e.onEditSettingsChange(Object.keys(t.changed)[0])}}),["page"].forEach((function(t){var n="on"+t[0].toUpperCase()+t.slice(1)+"SettingsChange";e[n]&&e.editorListeners.push({event:"change",to:elementor.settings[t].model,callback:function(t){e[n](t.changed)}})}))},getEditorListeners:function(){return this.editorListeners||this.initEditorListeners(),this.editorListeners},addEditorListeners:function(){var e=this.getUniqueHandlerID();this.getEditorListeners().forEach((function(t){elementorFrontend.addListenerOnce(e,t.event,t.callback,t.to)}))},removeEditorListeners:function(){var e=this.getUniqueHandlerID();this.getEditorListeners().forEach((function(t){elementorFrontend.removeListeners(e,t.event,null,t.to)}))},getElementType:function(){return this.$element.data("element_type")},getWidgetType:function(){const e=this.$element.data("widget_type");if(e)return e.split(".")[0]},getID:function(){return this.$element.data("id")},getModelCID:function(){return this.$element.data("model-cid")},getElementSettings:function(e){let t={};const n=this.getModelCID();if(this.isEdit&&n){const e=elementorFrontend.config.elements.data[n],s=e.attributes;let i=s.widgetType||s.elType;s.isInner&&(i="inner-"+i);let r=elementorFrontend.config.elements.keys[i];r||(r=elementorFrontend.config.elements.keys[i]=[],jQuery.each(e.controls,((e,t)=>{t.frontend_available&&r.push(e)}))),jQuery.each(e.getActiveControls(),(function(e){if(-1!==r.indexOf(e)){let n=s[e];n.toJSON&&(n=n.toJSON()),t[e]=n}}))}else t=this.$element.data("settings")||{};return this.getItems(t,e)},getEditSettings:function(e){var t={};return this.isEdit&&(t=elementorFrontend.config.elements.editSettings[this.getModelCID()].attributes),this.getItems(t,e)},getCurrentDeviceSetting:function(e){return elementorFrontend.getCurrentDeviceSetting(this.getElementSettings(),e)},onInit:function(){this.isActive(this.getSettings())&&elementorModules.ViewModule.prototype.onInit.apply(this,arguments)},onDestroy:function(){this.isEdit&&this.removeEditorListeners(),this.unbindEvents&&this.unbindEvents()}})},6412:(e,t,n)=>{"use strict";var s=n(7914),i=s(n(5955)),r=s(n(8135)),o=s(n(5658)),l=s(n(3090)),c=s(n(2821));i.default.frontend={Document:r.default,tools:{StretchElement:o.default},handlers:{Base:l.default,SwiperBase:c.default}}},5658:e=>{"use strict";e.exports=elementorModules.ViewModule.extend({getDefaultSettings:function(){return{element:null,direction:elementorFrontend.config.is_rtl?"right":"left",selectors:{container:window}}},getDefaultElements:function(){return{$element:jQuery(this.getSettings("element"))}},stretch:function(){var e,t=this.getSettings("selectors.container");try{e=jQuery(t)}catch(e){}e&&e.length||(e=jQuery(this.getDefaultSettings().selectors.container)),this.reset();var n=this.elements.$element,s=e.innerWidth(),i=n.offset().left,r="fixed"===n.css("position"),o=r?0:i;if(window!==e[0]){var l=e.offset().left;r&&(o=l),i>l&&(o=i-l)}r||(elementorFrontend.config.is_rtl&&(o=s-(n.outerWidth()+o)),o=-o);var c={};c.width=s+"px",c[this.getSettings("direction")]=o+"px",n.css(c)},reset:function(){var e={width:""};e[this.getSettings("direction")]="",this.elements.$element.css(e)}})},2618:(e,t,n)=>{"use strict";var s=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(7597)),r=s(n(381));class ArgsObject extends i.default{static getInstanceType(){return"ArgsObject"}constructor(e){super(),this.args=e}requireArgument(e,t=this.args){if(!t.hasOwnProperty(e))throw Error(`${e} is required.`)}requireArgumentType(e,t,n=this.args){if(this.requireArgument(e,n),typeof n[e]!==t)throw Error(`${e} invalid type: ${t}.`)}requireArgumentInstance(e,t,n=this.args){if(this.requireArgument(e,n),!(n[e]instanceof t||(0,r.default)(n[e],t)))throw Error(`${e} invalid instance.`)}requireArgumentConstructor(e,t,n=this.args){if(this.requireArgument(e,n),n[e].constructor.toString()!==t.prototype.constructor.toString())throw Error(`${e} invalid constructor type.`)}}t.default=ArgsObject},869:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.ForceMethodImplementation=void 0;class ForceMethodImplementation extends Error{constructor(e={}){super(`${e.isStatic?"static ":""}${e.fullName}() should be implemented, please provide '${e.functionName||e.fullName}' functionality.`),Error.captureStackTrace(this,ForceMethodImplementation)}}t.ForceMethodImplementation=ForceMethodImplementation;t.default=()=>{const e=Error().stack.split("\n")[2].trim(),t=e.startsWith("at new")?"constructor":e.split(" ")[1],n={};if(n.functionName=t,n.fullName=t,n.functionName.includes(".")){const e=n.functionName.split(".");n.className=e[0],n.functionName=e[1]}else n.isStatic=!0;throw new ForceMethodImplementation(n)}},7597:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class InstanceType{static[Symbol.hasInstance](e){let t=super[Symbol.hasInstance](e);if(e&&!e.constructor.getInstanceType)return t;if(e&&(e.instanceTypes||(e.instanceTypes=[]),t||this.getInstanceType()===e.constructor.getInstanceType()&&(t=!0),t)){const t=this.getInstanceType===InstanceType.getInstanceType?"BaseInstanceType":this.getInstanceType();-1===e.instanceTypes.indexOf(t)&&e.instanceTypes.push(t)}return!t&&e&&(t=e.instanceTypes&&Array.isArray(e.instanceTypes)&&-1!==e.instanceTypes.indexOf(this.getInstanceType())),t}constructor(){let e=new.target;const t=[];for(;e.__proto__&&e.__proto__.name;)t.push(e.__proto__),e=e.__proto__;t.reverse().forEach((e=>this instanceof e))}static getInstanceType(){elementorModules.ForceMethodImplementation()}}t.default=InstanceType},1192:e=>{"use strict";const Module=function(){const e=jQuery,t=arguments,n=this,s={};let i;const ensureClosureMethods=function(){e.each(n,(function(e){const t=n[e];"function"==typeof t&&(n[e]=function(){return t.apply(n,arguments)})}))},initSettings=function(){i=n.getDefaultSettings();const s=t[0];s&&e.extend(!0,i,s)},init=function(){n.__construct.apply(n,t),ensureClosureMethods(),initSettings(),n.trigger("init")};this.getItems=function(e,t){if(t){const n=t.split("."),s=n.splice(0,1);if(!n.length)return e[s];if(!e[s])return;return this.getItems(e[s],n.join("."))}return e},this.getSettings=function(e){return this.getItems(i,e)},this.setSettings=function(t,s,r){if(r||(r=i),"object"==typeof t)return e.extend(r,t),n;const o=t.split("."),l=o.splice(0,1);return o.length?(r[l]||(r[l]={}),n.setSettings(o.join("."),s,r[l])):(r[l]=s,n)},this.getErrorMessage=function(e,t){let n;if("forceMethodImplementation"===e)n=`The method '${t}' must to be implemented in the inheritor child.`;else n="An error occurs";return n},this.forceMethodImplementation=function(e){throw new Error(this.getErrorMessage("forceMethodImplementation",e))},this.on=function(t,i){if("object"==typeof t)return e.each(t,(function(e){n.on(e,this)})),n;return t.split(" ").forEach((function(e){s[e]||(s[e]=[]),s[e].push(i)})),n},this.off=function(e,t){if(!s[e])return n;if(!t)return delete s[e],n;const i=s[e].indexOf(t);return-1!==i&&(delete s[e][i],s[e]=s[e].filter((e=>e))),n},this.trigger=function(t){const i="on"+t[0].toUpperCase()+t.slice(1),r=Array.prototype.slice.call(arguments,1);n[i]&&n[i].apply(n,r);const o=s[t];return o?(e.each(o,(function(e,t){t.apply(n,r)})),n):n},init()};Module.prototype.__construct=function(){},Module.prototype.getDefaultSettings=function(){return{}},Module.prototype.getConstructorID=function(){return this.constructor.name},Module.extend=function(e){const t=jQuery,n=this,child=function(){return n.apply(this,arguments)};return t.extend(child,n),(child.prototype=Object.create(t.extend({},n.prototype,e))).constructor=child,child.__super__=n.prototype,child},e.exports=Module},6516:(e,t,n)=>{"use strict";var s=n(7914)(n(2640));e.exports=s.default.extend({getDefaultSettings:function(){return{container:null,items:null,columnsCount:3,verticalSpaceBetween:30}},getDefaultElements:function(){return{$container:jQuery(this.getSettings("container")),$items:jQuery(this.getSettings("items"))}},run:function(){var e=[],t=this.elements.$container.position().top,n=this.getSettings(),s=n.columnsCount;t+=parseInt(this.elements.$container.css("margin-top"),10),this.elements.$items.each((function(i){var r=Math.floor(i/s),o=jQuery(this),l=o[0].getBoundingClientRect().height+n.verticalSpaceBetween;if(r){var c=o.position(),a=i%s,u=c.top-t-e[a];u-=parseInt(o.css("margin-top"),10),u*=-1,o.css("margin-top",u+"px"),e[a]+=l}else e.push(l)}))}})},400:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class Scroll{static scrollObserver(e){let t=0;const n={root:e.root||null,rootMargin:e.offset||"0px",threshold:((e=0)=>{const t=[];if(e>0&&e<=100){const n=100/e;for(let e=0;e<=100;e+=n)t.push(e/100)}else t.push(0);return t})(e.sensitivity)};return new IntersectionObserver((function handleIntersect(n){const s=n[0].boundingClientRect.y,i=n[0].isIntersecting,r=s<t?"down":"up",o=Math.abs(parseFloat((100*n[0].intersectionRatio).toFixed(2)));e.callback({sensitivity:e.sensitivity,isInViewport:i,scrollPercentage:o,intersectionScrollDirection:r}),t=s}),n)}static getElementViewportPercentage(e,t={}){const n=e[0].getBoundingClientRect(),s=t.start||0,i=t.end||0,r=window.innerHeight*s/100,o=window.innerHeight*i/100,l=n.top-window.innerHeight,c=0-l+r,a=n.top+r+e.height()-l+o,u=Math.max(0,Math.min(c/a,1));return parseFloat((100*u).toFixed(2))}static getPageScrollPercentage(e={},t){const n=e.start||0,s=e.end||0,i=t||document.documentElement.scrollHeight-document.documentElement.clientHeight,r=i*n/100,o=i+r+i*s/100;return(document.documentElement.scrollTop+document.body.scrollTop+r)/o*100}}},2640:(e,t,n)=>{"use strict";var s=n(7914)(n(1192));e.exports=s.default.extend({elements:null,getDefaultElements:function(){return{}},bindEvents:function(){},onInit:function(){this.initElements(),this.bindEvents()},initElements:function(){this.elements=this.getDefaultElements()}})},5955:(e,t,n)=>{"use strict";var s=n(7914);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n(1192)),r=s(n(2640)),o=s(n(2618)),l=s(n(6516)),c=s(n(400)),a=s(n(869)),u=window.elementorModules={Module:i.default,ViewModule:r.default,ArgsObject:o.default,ForceMethodImplementation:a.default,utils:{Masonry:l.default,Scroll:c.default}};t.default=u}},e=>{var t;t=6412,e(e.s=t)}]);
;!function(){"use strict";function Waypoint(options){if(!options)throw new Error("No options passed to Waypoint constructor");if(!options.element)throw new Error("No element option passed to Waypoint constructor");if(!options.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+keyCounter,this.options=Waypoint.Adapter.extend({},Waypoint.defaults,options),this.element=this.options.element,this.adapter=new Waypoint.Adapter(this.element),this.callback=options.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=Waypoint.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=Waypoint.Context.findOrCreateByElement(this.options.context),Waypoint.offsetAliases[this.options.offset]&&(this.options.offset=Waypoint.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),allWaypoints[this.key]=this,keyCounter+=1}var keyCounter=0,allWaypoints={};Waypoint.prototype.queueTrigger=function(direction){this.group.queueTrigger(this,direction)},Waypoint.prototype.trigger=function(args){this.enabled&&this.callback&&this.callback.apply(this,args)},Waypoint.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete allWaypoints[this.key]},Waypoint.prototype.disable=function(){return this.enabled=!1,this},Waypoint.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},Waypoint.prototype.next=function(){return this.group.next(this)},Waypoint.prototype.previous=function(){return this.group.previous(this)},Waypoint.invokeAll=function(method){var allWaypointsArray=[];for(var waypointKey in allWaypoints)allWaypointsArray.push(allWaypoints[waypointKey]);for(var i=0,end=allWaypointsArray.length;i<end;i++)allWaypointsArray[i][method]()},Waypoint.destroyAll=function(){Waypoint.invokeAll("destroy")},Waypoint.disableAll=function(){Waypoint.invokeAll("disable")},Waypoint.enableAll=function(){Waypoint.Context.refreshAll();for(var waypointKey in allWaypoints)allWaypoints[waypointKey].enabled=!0;return this},Waypoint.refreshAll=function(){Waypoint.Context.refreshAll()},Waypoint.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},Waypoint.viewportWidth=function(){return document.documentElement.clientWidth},Waypoint.adapters=[],Waypoint.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},Waypoint.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=Waypoint}(),function(){"use strict";function requestAnimationFrameShim(callback){window.setTimeout(callback,1e3/60)}function Context(element){this.element=element,this.Adapter=Waypoint.Adapter,this.adapter=new this.Adapter(element),this.key="waypoint-context-"+keyCounter,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},element.waypointContextKey=this.key,contexts[element.waypointContextKey]=this,keyCounter+=1,Waypoint.windowContext||(Waypoint.windowContext=!0,Waypoint.windowContext=new Context(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var keyCounter=0,contexts={},Waypoint=window.Waypoint,oldWindowLoad=window.onload;Context.prototype.add=function(waypoint){var axis=waypoint.options.horizontal?"horizontal":"vertical";this.waypoints[axis][waypoint.key]=waypoint,this.refresh()},Context.prototype.checkEmpty=function(){var horizontalEmpty=this.Adapter.isEmptyObject(this.waypoints.horizontal),verticalEmpty=this.Adapter.isEmptyObject(this.waypoints.vertical),isWindow=this.element==this.element.window;horizontalEmpty&&verticalEmpty&&!isWindow&&(this.adapter.off(".waypoints"),delete contexts[this.key])},Context.prototype.createThrottledResizeHandler=function(){function resizeHandler(){self.handleResize(),self.didResize=!1}var self=this;this.adapter.on("resize.waypoints",function(){self.didResize||(self.didResize=!0,Waypoint.requestAnimationFrame(resizeHandler))})},Context.prototype.createThrottledScrollHandler=function(){function scrollHandler(){self.handleScroll(),self.didScroll=!1}var self=this;this.adapter.on("scroll.waypoints",function(){self.didScroll&&!Waypoint.isTouch||(self.didScroll=!0,Waypoint.requestAnimationFrame(scrollHandler))})},Context.prototype.handleResize=function(){Waypoint.Context.refreshAll()},Context.prototype.handleScroll=function(){var triggeredGroups={},axes={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var axisKey in axes){var axis=axes[axisKey],isForward=axis.newScroll>axis.oldScroll,direction=isForward?axis.forward:axis.backward;for(var waypointKey in this.waypoints[axisKey]){var waypoint=this.waypoints[axisKey][waypointKey];if(null!==waypoint.triggerPoint){var wasBeforeTriggerPoint=axis.oldScroll<waypoint.triggerPoint,nowAfterTriggerPoint=axis.newScroll>=waypoint.triggerPoint,crossedForward=wasBeforeTriggerPoint&&nowAfterTriggerPoint,crossedBackward=!wasBeforeTriggerPoint&&!nowAfterTriggerPoint;(crossedForward||crossedBackward)&&(waypoint.queueTrigger(direction),triggeredGroups[waypoint.group.id]=waypoint.group)}}}for(var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers();this.oldScroll={x:axes.horizontal.newScroll,y:axes.vertical.newScroll}},Context.prototype.innerHeight=function(){return this.element==this.element.window?Waypoint.viewportHeight():this.adapter.innerHeight()},Context.prototype.remove=function(waypoint){delete this.waypoints[waypoint.axis][waypoint.key],this.checkEmpty()},Context.prototype.innerWidth=function(){return this.element==this.element.window?Waypoint.viewportWidth():this.adapter.innerWidth()},Context.prototype.destroy=function(){var allWaypoints=[];for(var axis in this.waypoints)for(var waypointKey in this.waypoints[axis])allWaypoints.push(this.waypoints[axis][waypointKey]);for(var i=0,end=allWaypoints.length;i<end;i++)allWaypoints[i].destroy()},Context.prototype.refresh=function(){var axes,isWindow=this.element==this.element.window,contextOffset=isWindow?void 0:this.adapter.offset(),triggeredGroups={};this.handleScroll(),axes={horizontal:{contextOffset:isWindow?0:contextOffset.left,contextScroll:isWindow?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:isWindow?0:contextOffset.top,contextScroll:isWindow?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var axisKey in axes){var axis=axes[axisKey];for(var waypointKey in this.waypoints[axisKey]){var contextModifier,wasBeforeScroll,nowAfterScroll,triggeredBackward,triggeredForward,waypoint=this.waypoints[axisKey][waypointKey],adjustment=waypoint.options.offset,oldTriggerPoint=waypoint.triggerPoint,elementOffset=0,freshWaypoint=null==oldTriggerPoint;waypoint.element!==waypoint.element.window&&(elementOffset=waypoint.adapter.offset()[axis.offsetProp]),"function"==typeof adjustment?adjustment=adjustment.apply(waypoint):"string"==typeof adjustment&&(adjustment=parseFloat(adjustment),waypoint.options.offset.indexOf("%")>-1&&(adjustment=Math.ceil(axis.contextDimension*adjustment/100))),contextModifier=axis.contextScroll-axis.contextOffset,waypoint.triggerPoint=Math.floor(elementOffset+contextModifier-adjustment),wasBeforeScroll=oldTriggerPoint<axis.oldScroll,nowAfterScroll=waypoint.triggerPoint>=axis.oldScroll,triggeredBackward=wasBeforeScroll&&nowAfterScroll,triggeredForward=!wasBeforeScroll&&!nowAfterScroll,!freshWaypoint&&triggeredBackward?(waypoint.queueTrigger(axis.backward),triggeredGroups[waypoint.group.id]=waypoint.group):!freshWaypoint&&triggeredForward?(waypoint.queueTrigger(axis.forward),triggeredGroups[waypoint.group.id]=waypoint.group):freshWaypoint&&axis.oldScroll>=waypoint.triggerPoint&&(waypoint.queueTrigger(axis.forward),triggeredGroups[waypoint.group.id]=waypoint.group)}}return Waypoint.requestAnimationFrame(function(){for(var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers()}),this},Context.findOrCreateByElement=function(element){return Context.findByElement(element)||new Context(element)},Context.refreshAll=function(){for(var contextId in contexts)contexts[contextId].refresh()},Context.findByElement=function(element){return contexts[element.waypointContextKey]},window.onload=function(){oldWindowLoad&&oldWindowLoad(),Context.refreshAll()},Waypoint.requestAnimationFrame=function(callback){var requestFn=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||requestAnimationFrameShim;requestFn.call(window,callback)},Waypoint.Context=Context}(),function(){"use strict";function byTriggerPoint(a,b){return a.triggerPoint-b.triggerPoint}function byReverseTriggerPoint(a,b){return b.triggerPoint-a.triggerPoint}function Group(options){this.name=options.name,this.axis=options.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),groups[this.axis][this.name]=this}var groups={vertical:{},horizontal:{}},Waypoint=window.Waypoint;Group.prototype.add=function(waypoint){this.waypoints.push(waypoint)},Group.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},Group.prototype.flushTriggers=function(){for(var direction in this.triggerQueues){var waypoints=this.triggerQueues[direction],reverse="up"===direction||"left"===direction;waypoints.sort(reverse?byReverseTriggerPoint:byTriggerPoint);for(var i=0,end=waypoints.length;i<end;i+=1){var waypoint=waypoints[i];(waypoint.options.continuous||i===waypoints.length-1)&&waypoint.trigger([direction])}}this.clearTriggerQueues()},Group.prototype.next=function(waypoint){this.waypoints.sort(byTriggerPoint);var index=Waypoint.Adapter.inArray(waypoint,this.waypoints),isLast=index===this.waypoints.length-1;return isLast?null:this.waypoints[index+1]},Group.prototype.previous=function(waypoint){this.waypoints.sort(byTriggerPoint);var index=Waypoint.Adapter.inArray(waypoint,this.waypoints);return index?this.waypoints[index-1]:null},Group.prototype.queueTrigger=function(waypoint,direction){this.triggerQueues[direction].push(waypoint)},Group.prototype.remove=function(waypoint){var index=Waypoint.Adapter.inArray(waypoint,this.waypoints);index>-1&&this.waypoints.splice(index,1)},Group.prototype.first=function(){return this.waypoints[0]},Group.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},Group.findOrCreate=function(options){return groups[options.axis][options.name]||new Group(options)},Waypoint.Group=Group}(),function(){"use strict";function JQueryAdapter(element){this.$element=$(element)}var $=window.jQuery,Waypoint=window.Waypoint;$.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(i,method){JQueryAdapter.prototype[method]=function(){var args=Array.prototype.slice.call(arguments);return this.$element[method].apply(this.$element,args)}}),$.each(["extend","inArray","isEmptyObject"],function(i,method){JQueryAdapter[method]=$[method]}),Waypoint.adapters.push({name:"jquery",Adapter:JQueryAdapter}),Waypoint.Adapter=JQueryAdapter}(),function(){"use strict";function createExtension(framework){return function(){var waypoints=[],overrides=arguments[0];return framework.isFunction(arguments[0])&&(overrides=framework.extend({},arguments[1]),overrides.handler=arguments[0]),this.each(function(){var options=framework.extend({},overrides,{element:this});"string"==typeof options.context&&(options.context=framework(this).closest(options.context)[0]),waypoints.push(new Waypoint(options))}),waypoints}}var Waypoint=window.Waypoint;window.jQuery&&(window.jQuery.fn.elementorWaypoint=createExtension(window.jQuery)),window.Zepto&&(window.Zepto.fn.elementorWaypoint=createExtension(window.Zepto))}();
;/*! jQuery UI - v1.13.1 - 2022-01-20
* http://jqueryui.com
* Includes: data.js, disable-selection.js, escape-selector.js, focusable.js, form-reset-mixin.js, form.js, ie.js, jquery-1-7.js, keycode.js, labels.js, plugin.js, position.js, safe-active-element.js, safe-blur.js, scroll-parent.js, tabbable.js, unique-id.js, version.js, widget.js
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(x){"use strict";var t,e,i,n,W,C,o,s,r,l,a,h,u;function E(t,e,i){return[parseFloat(t[0])*(a.test(t[0])?e/100:1),parseFloat(t[1])*(a.test(t[1])?i/100:1)]}function L(t,e){return parseInt(x.css(t,e),10)||0}function N(t){return null!=t&&t===t.window}x.ui=x.ui||{},x.ui.version="1.13.1",
/*!
 * jQuery UI :data 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.extend(x.expr.pseudos,{data:x.expr.createPseudo?x.expr.createPseudo(function(e){return function(t){return!!x.data(t,e)}}):function(t,e,i){return!!x.data(t,i[3])}}),
/*!
 * jQuery UI Disable Selection 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.fn.extend({disableSelection:(t="onselectstart"in document.createElement("div")?"selectstart":"mousedown",function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}),enableSelection:function(){return this.off(".ui-disableSelection")}}),
/*!
 * jQuery UI Focusable 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.ui.focusable=function(t,e){var i,n,o,s=t.nodeName.toLowerCase();return"area"===s?(o=(i=t.parentNode).name,!(!t.href||!o||"map"!==i.nodeName.toLowerCase())&&(0<(i=x("img[usemap='#"+o+"']")).length&&i.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(s)?(n=!t.disabled)&&(o=x(t).closest("fieldset")[0])&&(n=!o.disabled):n="a"===s&&t.href||e,n&&x(t).is(":visible")&&function(t){var e=t.css("visibility");for(;"inherit"===e;)t=t.parent(),e=t.css("visibility");return"visible"===e}(x(t)))},x.extend(x.expr.pseudos,{focusable:function(t){return x.ui.focusable(t,null!=x.attr(t,"tabindex"))}}),x.fn._form=function(){return"string"==typeof this[0].form?this.closest("form"):x(this[0].form)},
/*!
 * jQuery UI Form Reset Mixin 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.ui.formResetMixin={_formResetHandler:function(){var e=x(this);setTimeout(function(){var t=e.data("ui-form-reset-instances");x.each(t,function(){this.refresh()})})},_bindFormResetHandler:function(){var t;this.form=this.element._form(),this.form.length&&((t=this.form.data("ui-form-reset-instances")||[]).length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t))},_unbindFormResetHandler:function(){var t;this.form.length&&((t=this.form.data("ui-form-reset-instances")).splice(x.inArray(this,t),1),t.length?this.form.data("ui-form-reset-instances",t):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"))}},x.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
/*!
 * jQuery UI Support for jQuery core 1.8.x and newer 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 */
x.expr.pseudos||(x.expr.pseudos=x.expr[":"]),x.uniqueSort||(x.uniqueSort=x.unique),x.escapeSelector||(e=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,i=function(t,e){return e?"\0"===t?"ï¿½":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t},x.escapeSelector=function(t){return(t+"").replace(e,i)}),x.fn.even&&x.fn.odd||x.fn.extend({even:function(){return this.filter(function(t){return t%2==0})},odd:function(){return this.filter(function(t){return t%2==1})}}),
/*!
 * jQuery UI Keycode 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},
/*!
 * jQuery UI Labels 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.fn.labels=function(){var t,e,i;return this.length?this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(e=this.eq(0).parents("label"),(t=this.attr("id"))&&(i=(i=this.eq(0).parents().last()).add((i.length?i:this).siblings()),t="label[for='"+x.escapeSelector(t)+"']",e=e.add(i.find(t).addBack(t))),this.pushStack(e)):this.pushStack([])},x.ui.plugin={add:function(t,e,i){var n,o=x.ui[t].prototype;for(n in i)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([e,i[n]])},call:function(t,e,i,n){var o,s=t.plugins[e];if(s&&(n||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(o=0;o<s.length;o++)t.options[s[o][0]]&&s[o][1].apply(t.element,i)}},
/*!
 * jQuery UI Position 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
W=Math.max,C=Math.abs,o=/left|center|right/,s=/top|center|bottom/,r=/[\+\-]\d+(\.[\d]+)?%?/,l=/^\w+/,a=/%$/,h=x.fn.position,x.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,e=x("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>"),i=e.children()[0];return x("body").append(e),t=i.offsetWidth,e.css("overflow","scroll"),t===(i=i.offsetWidth)&&(i=e[0].clientWidth),e.remove(),n=t-i},getScrollInfo:function(t){var e=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),i=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),e="scroll"===e||"auto"===e&&t.width<t.element[0].scrollWidth;return{width:"scroll"===i||"auto"===i&&t.height<t.element[0].scrollHeight?x.position.scrollbarWidth():0,height:e?x.position.scrollbarWidth():0}},getWithinInfo:function(t){var e=x(t||window),i=N(e[0]),n=!!e[0]&&9===e[0].nodeType;return{element:e,isWindow:i,isDocument:n,offset:!i&&!n?x(t).offset():{left:0,top:0},scrollLeft:e.scrollLeft(),scrollTop:e.scrollTop(),width:e.outerWidth(),height:e.outerHeight()}}},x.fn.position=function(f){if(!f||!f.of)return h.apply(this,arguments);var c,d,p,g,m,t,v="string"==typeof(f=x.extend({},f)).of?x(document).find(f.of):x(f.of),y=x.position.getWithinInfo(f.within),w=x.position.getScrollInfo(y),b=(f.collision||"flip").split(" "),_={},e=9===(e=(t=v)[0]).nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:N(e)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:e.preventDefault?{width:0,height:0,offset:{top:e.pageY,left:e.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()};return v[0].preventDefault&&(f.at="left top"),d=e.width,p=e.height,m=x.extend({},g=e.offset),x.each(["my","at"],function(){var t,e,i=(f[this]||"").split(" ");(i=1===i.length?o.test(i[0])?i.concat(["center"]):s.test(i[0])?["center"].concat(i):["center","center"]:i)[0]=o.test(i[0])?i[0]:"center",i[1]=s.test(i[1])?i[1]:"center",t=r.exec(i[0]),e=r.exec(i[1]),_[this]=[t?t[0]:0,e?e[0]:0],f[this]=[l.exec(i[0])[0],l.exec(i[1])[0]]}),1===b.length&&(b[1]=b[0]),"right"===f.at[0]?m.left+=d:"center"===f.at[0]&&(m.left+=d/2),"bottom"===f.at[1]?m.top+=p:"center"===f.at[1]&&(m.top+=p/2),c=E(_.at,d,p),m.left+=c[0],m.top+=c[1],this.each(function(){var i,t,r=x(this),l=r.outerWidth(),a=r.outerHeight(),e=L(this,"marginLeft"),n=L(this,"marginTop"),o=l+e+L(this,"marginRight")+w.width,s=a+n+L(this,"marginBottom")+w.height,h=x.extend({},m),u=E(_.my,r.outerWidth(),r.outerHeight());"right"===f.my[0]?h.left-=l:"center"===f.my[0]&&(h.left-=l/2),"bottom"===f.my[1]?h.top-=a:"center"===f.my[1]&&(h.top-=a/2),h.left+=u[0],h.top+=u[1],i={marginLeft:e,marginTop:n},x.each(["left","top"],function(t,e){x.ui.position[b[t]]&&x.ui.position[b[t]][e](h,{targetWidth:d,targetHeight:p,elemWidth:l,elemHeight:a,collisionPosition:i,collisionWidth:o,collisionHeight:s,offset:[c[0]+u[0],c[1]+u[1]],my:f.my,at:f.at,within:y,elem:r})}),f.using&&(t=function(t){var e=g.left-h.left,i=e+d-l,n=g.top-h.top,o=n+p-a,s={target:{element:v,left:g.left,top:g.top,width:d,height:p},element:{element:r,left:h.left,top:h.top,width:l,height:a},horizontal:i<0?"left":0<e?"right":"center",vertical:o<0?"top":0<n?"bottom":"middle"};d<l&&C(e+i)<d&&(s.horizontal="center"),p<a&&C(n+o)<p&&(s.vertical="middle"),W(C(e),C(i))>W(C(n),C(o))?s.important="horizontal":s.important="vertical",f.using.call(this,t,s)}),r.offset(x.extend(h,{using:t}))})},x.ui.position={fit:{left:function(t,e){var i,n=e.within,o=n.isWindow?n.scrollLeft:n.offset.left,n=n.width,s=t.left-e.collisionPosition.marginLeft,r=o-s,l=s+e.collisionWidth-n-o;e.collisionWidth>n?0<r&&l<=0?(i=t.left+r+e.collisionWidth-n-o,t.left+=r-i):t.left=!(0<l&&r<=0)&&l<r?o+n-e.collisionWidth:o:0<r?t.left+=r:0<l?t.left-=l:t.left=W(t.left-s,t.left)},top:function(t,e){var i,n=e.within,n=n.isWindow?n.scrollTop:n.offset.top,o=e.within.height,s=t.top-e.collisionPosition.marginTop,r=n-s,l=s+e.collisionHeight-o-n;e.collisionHeight>o?0<r&&l<=0?(i=t.top+r+e.collisionHeight-o-n,t.top+=r-i):t.top=!(0<l&&r<=0)&&l<r?n+o-e.collisionHeight:n:0<r?t.top+=r:0<l?t.top-=l:t.top=W(t.top-s,t.top)}},flip:{left:function(t,e){var i=e.within,n=i.offset.left+i.scrollLeft,o=i.width,i=i.isWindow?i.scrollLeft:i.offset.left,s=t.left-e.collisionPosition.marginLeft,r=s-i,s=s+e.collisionWidth-o-i,l="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,a="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,h=-2*e.offset[0];r<0?((o=t.left+l+a+h+e.collisionWidth-o-n)<0||o<C(r))&&(t.left+=l+a+h):0<s&&(0<(n=t.left-e.collisionPosition.marginLeft+l+a+h-i)||C(n)<s)&&(t.left+=l+a+h)},top:function(t,e){var i=e.within,n=i.offset.top+i.scrollTop,o=i.height,i=i.isWindow?i.scrollTop:i.offset.top,s=t.top-e.collisionPosition.marginTop,r=s-i,s=s+e.collisionHeight-o-i,l="top"===e.my[1]?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,a="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,h=-2*e.offset[1];r<0?((o=t.top+l+a+h+e.collisionHeight-o-n)<0||o<C(r))&&(t.top+=l+a+h):0<s&&(0<(n=t.top-e.collisionPosition.marginTop+l+a+h-i)||C(n)<s)&&(t.top+=l+a+h)}},flipfit:{left:function(){x.ui.position.flip.left.apply(this,arguments),x.ui.position.fit.left.apply(this,arguments)},top:function(){x.ui.position.flip.top.apply(this,arguments),x.ui.position.fit.top.apply(this,arguments)}}},x.ui.safeActiveElement=function(e){var i;try{i=e.activeElement}catch(t){i=e.body}return i=(i=i||e.body).nodeName?i:e.body},x.ui.safeBlur=function(t){t&&"body"!==t.nodeName.toLowerCase()&&x(t).trigger("blur")},
/*!
 * jQuery UI Scroll Parent 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.fn.scrollParent=function(t){var e=this.css("position"),i="absolute"===e,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,t=this.parents().filter(function(){var t=x(this);return(!i||"static"!==t.css("position"))&&n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==e&&t.length?t:x(this[0].ownerDocument||document)},
/*!
 * jQuery UI Tabbable 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.extend(x.expr.pseudos,{tabbable:function(t){var e=x.attr(t,"tabindex"),i=null!=e;return(!i||0<=e)&&x.ui.focusable(t,i)}}),
/*!
 * jQuery UI Unique ID 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
x.fn.extend({uniqueId:(u=0,function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++u)})}),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&x(this).removeAttr("id")})}});
/*!
 * jQuery UI Widget 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
var f,c=0,d=Array.prototype.hasOwnProperty,p=Array.prototype.slice;x.cleanData=(f=x.cleanData,function(t){for(var e,i,n=0;null!=(i=t[n]);n++)(e=x._data(i,"events"))&&e.remove&&x(i).triggerHandler("remove");f(t)}),x.widget=function(t,i,e){var n,o,s,r={},l=t.split(".")[0],a=l+"-"+(t=t.split(".")[1]);return e||(e=i,i=x.Widget),Array.isArray(e)&&(e=x.extend.apply(null,[{}].concat(e))),x.expr.pseudos[a.toLowerCase()]=function(t){return!!x.data(t,a)},x[l]=x[l]||{},n=x[l][t],o=x[l][t]=function(t,e){if(!this||!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},x.extend(o,n,{version:e.version,_proto:x.extend({},e),_childConstructors:[]}),(s=new i).options=x.widget.extend({},s.options),x.each(e,function(e,n){function o(){return i.prototype[e].apply(this,arguments)}function s(t){return i.prototype[e].apply(this,t)}r[e]="function"!=typeof n?n:function(){var t,e=this._super,i=this._superApply;return this._super=o,this._superApply=s,t=n.apply(this,arguments),this._super=e,this._superApply=i,t}}),o.prototype=x.widget.extend(s,{widgetEventPrefix:n&&s.widgetEventPrefix||t},r,{constructor:o,namespace:l,widgetName:t,widgetFullName:a}),n?(x.each(n._childConstructors,function(t,e){var i=e.prototype;x.widget(i.namespace+"."+i.widgetName,o,e._proto)}),delete n._childConstructors):i._childConstructors.push(o),x.widget.bridge(t,o),o},x.widget.extend=function(t){for(var e,i,n=p.call(arguments,1),o=0,s=n.length;o<s;o++)for(e in n[o])i=n[o][e],d.call(n[o],e)&&void 0!==i&&(x.isPlainObject(i)?t[e]=x.isPlainObject(t[e])?x.widget.extend({},t[e],i):x.widget.extend({},i):t[e]=i);return t},x.widget.bridge=function(s,e){var r=e.prototype.widgetFullName||s;x.fn[s]=function(i){var t="string"==typeof i,n=p.call(arguments,1),o=this;return t?this.length||"instance"!==i?this.each(function(){var t,e=x.data(this,r);return"instance"===i?(o=e,!1):e?"function"!=typeof e[i]||"_"===i.charAt(0)?x.error("no such method '"+i+"' for "+s+" widget instance"):(t=e[i].apply(e,n))!==e&&void 0!==t?(o=t&&t.jquery?o.pushStack(t.get()):t,!1):void 0:x.error("cannot call methods on "+s+" prior to initialization; attempted to call method '"+i+"'")}):o=void 0:(n.length&&(i=x.widget.extend.apply(null,[i].concat(n))),this.each(function(){var t=x.data(this,r);t?(t.option(i||{}),t._init&&t._init()):x.data(this,r,new e(i,this))})),o}},x.Widget=function(){},x.Widget._childConstructors=[],x.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(t,e){e=x(e||this.defaultElement||this)[0],this.element=x(e),this.uuid=c++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=x(),this.hoverable=x(),this.focusable=x(),this.classesElementLookup={},e!==this&&(x.data(e,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===e&&this.destroy()}}),this.document=x(e.style?e.ownerDocument:e.document||e),this.window=x(this.document[0].defaultView||this.document[0].parentWindow)),this.options=x.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:x.noop,_create:x.noop,_init:x.noop,destroy:function(){var i=this;this._destroy(),x.each(this.classesElementLookup,function(t,e){i._removeClass(e,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:x.noop,widget:function(){return this.element},option:function(t,e){var i,n,o,s=t;if(0===arguments.length)return x.widget.extend({},this.options);if("string"==typeof t)if(s={},t=(i=t.split(".")).shift(),i.length){for(n=s[t]=x.widget.extend({},this.options[t]),o=0;o<i.length-1;o++)n[i[o]]=n[i[o]]||{},n=n[i[o]];if(t=i.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=e}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];s[t]=e}return this._setOptions(s),this},_setOptions:function(t){for(var e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(t){var e,i,n;for(e in t)n=this.classesElementLookup[e],t[e]!==this.options.classes[e]&&n&&n.length&&(i=x(n.get()),this._removeClass(n,e),i.addClass(this._classes({element:i,keys:e,classes:t,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(o){var s=[],r=this;function t(t,e){for(var i,n=0;n<t.length;n++)i=r.classesElementLookup[t[n]]||x(),i=o.add?(function(){var i=[];o.element.each(function(t,e){x.map(r.classesElementLookup,function(t){return t}).some(function(t){return t.is(e)})||i.push(e)}),r._on(x(i),{remove:"_untrackClassesElement"})}(),x(x.uniqueSort(i.get().concat(o.element.get())))):x(i.not(o.element).get()),r.classesElementLookup[t[n]]=i,s.push(t[n]),e&&o.classes[t[n]]&&s.push(o.classes[t[n]])}return(o=x.extend({element:this.element,classes:this.options.classes||{}},o)).keys&&t(o.keys.match(/\S+/g)||[],!0),o.extra&&t(o.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(i){var n=this;x.each(n.classesElementLookup,function(t,e){-1!==x.inArray(i.target,e)&&(n.classesElementLookup[t]=x(e.not(i.target).get()))}),this._off(x(i.target))},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,n){var o="string"==typeof t||null===t,e={extra:o?e:i,keys:o?t:e,element:o?this.element:t,add:n="boolean"==typeof n?n:i};return e.element.toggleClass(this._classes(e),n),this},_on:function(o,s,t){var r,l=this;"boolean"!=typeof o&&(t=s,s=o,o=!1),t?(s=r=x(s),this.bindings=this.bindings.add(s)):(t=s,s=this.element,r=this.widget()),x.each(t,function(t,e){function i(){if(o||!0!==l.options.disabled&&!x(this).hasClass("ui-state-disabled"))return("string"==typeof e?l[e]:e).apply(l,arguments)}"string"!=typeof e&&(i.guid=e.guid=e.guid||i.guid||x.guid++);var t=t.match(/^([\w:-]*)\s*(.*)$/),n=t[1]+l.eventNamespace,t=t[2];t?r.on(n,t,i):s.on(n,i)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(e),this.bindings=x(this.bindings.not(t).get()),this.focusable=x(this.focusable.not(t).get()),this.hoverable=x(this.hoverable.not(t).get())},_delay:function(t,e){var i=this;return setTimeout(function(){return("string"==typeof t?i[t]:t).apply(i,arguments)},e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass(x(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass(x(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass(x(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass(x(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,e,i){var n,o,s=this.options[t];if(i=i||{},(e=x.Event(e)).type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],o=e.originalEvent)for(n in o)n in e||(e[n]=o[n]);return this.element.trigger(e,i),!("function"==typeof s&&!1===s.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},x.each({show:"fadeIn",hide:"fadeOut"},function(s,r){x.Widget.prototype["_"+s]=function(e,t,i){var n,o=(t="string"==typeof t?{effect:t}:t)?!0!==t&&"number"!=typeof t&&t.effect||r:s;"number"==typeof(t=t||{})?t={duration:t}:!0===t&&(t={}),n=!x.isEmptyObject(t),t.complete=i,t.delay&&e.delay(t.delay),n&&x.effects&&x.effects.effect[o]?e[s](t):o!==s&&e[o]?e[o](t.duration,t.easing,i):e.queue(function(t){x(this)[s](),i&&i.call(e[0]),t()})}})});
;(function(a){window.ShareLink=function(b,c){var d,e={},f=function(a){var b=a.substr(0,e.classPrefixLength);return b===e.classPrefix?a.substr(e.classPrefixLength):null},g=function(a){d.on("click",function(){h(a)})},h=function(a){var b="";if(e.width&&e.height){var c=screen.width/2-e.width/2,d=screen.height/2-e.height/2;b="toolbar=0,status=0,width="+e.width+",height="+e.height+",top="+d+",left="+c}var f=ShareLink.getNetworkLink(a,e),g=/^https?:\/\//.test(f),h=g?"":"_self";open(f,h,b)},i=function(){a.each(b.classList,function(){var a=f(this);if(a)return g(a),!1})},j=function(){a.extend(e,ShareLink.defaultSettings,c),["title","text"].forEach(function(a){e[a]=e[a].replace("#","")}),e.classPrefixLength=e.classPrefix.length},k=function(){d=a(b)};(function(){j(),k(),i()})()},ShareLink.networkTemplates={twitter:"https://twitter.com/intent/tweet?text={text}\x20{url}",pinterest:"https://www.pinterest.com/pin/create/button/?url={url}&media={image}",facebook:"https://www.facebook.com/sharer.php?u={url}",vk:"https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}",linkedin:"https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",odnoklassniki:"https://connect.ok.ru/offer?url={url}&title={title}&imageUrl={image}",tumblr:"https://tumblr.com/share/link?url={url}",google:"https://plus.google.com/share?url={url}",digg:"https://digg.com/submit?url={url}",reddit:"https://reddit.com/submit?url={url}&title={title}",stumbleupon:"https://www.stumbleupon.com/submit?url={url}",pocket:"https://getpocket.com/edit?url={url}",whatsapp:"https://api.whatsapp.com/send?text=*{title}*\n{text}\n{url}",xing:"https://www.xing.com/app/user?op=share&url={url}",print:"javascript:print()",email:"mailto:?subject={title}&body={text}\n{url}",telegram:"https://telegram.me/share/url?url={url}&text={text}",skype:"https://web.skype.com/share?url={url}"},ShareLink.defaultSettings={title:"",text:"",image:"",url:location.href,classPrefix:"s_",width:640,height:480},ShareLink.getNetworkLink=function(a,b){var c=ShareLink.networkTemplates[a].replace(/{([^}]+)}/g,function(a,c){return b[c]||""});if("email"===a){if(-1<b.title.indexOf("&")||-1<b.text.indexOf("&")){var d={text:b.text.replace(/&/g,"%26"),title:b.title.replace(/&/g,"%26"),url:b.url};c=ShareLink.networkTemplates[a].replace(/{([^}]+)}/g,function(a,b){return d[b]})}return c.indexOf("?subject=&body")&&(c=c.replace("subject=&","")),c}return c},a.fn.shareLink=function(b){return this.each(function(){a(this).data("shareLink",new ShareLink(this,b))})}})(jQuery);

;/*! dialogs-manager v4.9.0 | (c) Kobi Zaltzberg | https://github.com/kobizz/dialogs-manager/blob/master/LICENSE.txt
 2021-08-15 18:13 */
!function(p,t){"use strict";var y={widgetsTypes:{},createWidgetType:function(t,e,n){n=n||this.Widget;function i(){n.apply(this,arguments)}var o=i.prototype=new n(t);return o.types=o.types.concat([t]),p.extend(o,e),(o.constructor=i).extend=function(t,e){return y.createWidgetType(t,e,i)},i},addWidgetType:function(t,e,n){return e&&e.prototype instanceof this.Widget?this.widgetsTypes[t]=e:this.widgetsTypes[t]=this.createWidgetType(t,e,n)},getWidgetType:function(t){return this.widgetsTypes[t]}};y.Instance=function(){var n=this,e={},i={};this.createWidget=function(t,e){t=new(y.getWidgetType(t))(t);return t.init(n,e=e||{}),t},this.getSettings=function(t){return t?i[t]:Object.create(i)},this.init=function(t){return p.extend(i,{classPrefix:"dialog",effects:{show:"fadeIn",hide:"fadeOut"}},t),e.body=p("body"),n},n.init()},y.Widget=function(n){function e(t,e){var n=u.effects[t],t=d.widget;if(p.isFunction(n))n.apply(t,e);else{if(!t[n])throw"Reference Error: The effect "+n+" not found";t[n].apply(t,e)}}function i(t){if(!f(t)){if(u.hide.onClick){if(p(t.target).closest(u.selectors.preventClose).length)return}else if(t.target!==this)return;c.hide()}}function o(t){f(t)||p(t.target).closest(d.widget).length||g(t)||c.hide()}function s(t,e){t=p.extend(!0,{},t.getSettings()),u={headerMessage:"",message:"",effects:t.effects,classes:{globalPrefix:t.classPrefix,prefix:t.classPrefix+"-"+n,preventScroll:t.classPrefix+"-prevent-scroll"},selectors:{preventClose:"."+t.classPrefix+"-prevent-close"},container:"body",preventScroll:!1,iframe:null,closeButton:!1,closeButtonOptions:{iconClass:t.classPrefix+"-close-button-icon",attributes:{},iconElement:"<i>"},position:{element:"widget",my:"center",at:"center",enable:!0,autoRefresh:!1},hide:{auto:!1,autoDelay:5e3,onClick:!1,onOutsideClick:!0,onOutsideContextMenu:!1,onBackgroundClick:!0,onEscKeyPress:!0,ignore:""}},p.extend(!0,u,c.getDefaultSettings(),e),p.each(u,function(t){t=t.match(/^on([A-Z].*)/);t&&(t=t[1].charAt(0).toLowerCase()+t[1].slice(1),c.on(t,this))})}function r(t){27===t.which&&c.hide()}function t(){var t=[d.window];d.iframe&&t.push(jQuery(d.iframe[0].contentWindow)),t.forEach(function(t){u.hide.onEscKeyPress&&t.off("keyup",r),u.hide.onOutsideClick&&t[0].removeEventListener("click",o,!0),u.hide.onOutsideContextMenu&&t[0].removeEventListener("contextmenu",o,!0),u.position.autoRefresh&&t.off("resize",c.refreshPosition)}),(u.hide.onClick||u.hide.onBackgroundClick)&&d.widget.off("click",i)}var c=this,u={},a={},d={},l=0,h=["refreshPosition"],g=function(t){return!!u.hide.ignore&&!!p(t.target).closest(u.hide.ignore).length},f=function(t){return"click"===t.type&&2===t.button};this.addElement=function(t,e,n){e=d[t]=p(e||"<div>"),t=t.replace(/([a-z])([A-Z])/g,function(){return arguments[1]+"-"+arguments[2].toLowerCase()});return n=n?n+" ":"",n+=u.classes.globalPrefix+"-"+t,n+=" "+u.classes.prefix+"-"+t,e.addClass(n),e},this.destroy=function(){return t(),d.widget.remove(),c.trigger("destroy"),c},this.getElements=function(t){return t?d[t]:d},this.getSettings=function(t){var e=Object.create(u);return t?e[t]:e},this.hide=function(){if(c.isVisible())return clearTimeout(l),e("hide",arguments),t(),u.preventScroll&&c.getElements("body").removeClass(u.classes.preventScroll),c.trigger("hide"),c},this.init=function(t,e){if(!(t instanceof y.Instance))throw"The "+c.widgetName+" must to be initialized from an instance of DialogsManager.Instance";var n;return n=h.concat(c.getClosureMethods()),p.each(n,function(){var t=c[this];c[this]=function(){t.apply(c,arguments)}}),c.trigger("init",e),s(t,e),function(){if(c.addElement("widget"),c.addElement("header"),c.addElement("message"),c.addElement("window",window),c.addElement("body",document.body),c.addElement("container",u.container),u.iframe&&c.addElement("iframe",u.iframe),u.closeButton){u.closeButtonClass&&(u.closeButtonOptions.iconClass=u.closeButtonClass);const n=p("<div>",u.closeButtonOptions.attributes),i=p(u.closeButtonOptions.iconElement).addClass(u.closeButtonOptions.iconClass);n.append(i),c.addElement("closeButton",n)}var t=c.getSettings("id");t&&c.setID(t);var e=[];p.each(c.types,function(){e.push(u.classes.globalPrefix+"-type-"+this)}),e.push(c.getSettings("className")),d.widget.addClass(e.join(" "))}(),c.buildWidget(),c.attachEvents(),c.trigger("ready"),c},this.isVisible=function(){return d.widget.is(":visible")},this.on=function(t,e){return"object"==typeof t?p.each(t,function(t){c.on(t,this)}):t.split(" ").forEach(function(t){a[t]||(a[t]=[]),a[t].push(e)}),c},this.off=function(t,e){if(!a[t])return c;if(!e)return delete a[t],c;e=a[t].indexOf(e);return-1!==e&&a[t].splice(e,1),c},this.refreshPosition=function(){var t,e,n,i,o,s,r;u.position.enable&&(t=p.extend({},u.position),d[t.of]&&(t.of=d[t.of]),t.of||(t.of=window),u.iframe&&(e=t).my&&(n=/([+-]\d+)?$/,i=d.iframe.offset(),o=d.iframe[0].contentWindow,s=e.my.split(" "),r=[],1===s.length&&(/left|right/.test(s[0])?s.push("center"):s.unshift("center")),s.forEach(function(t,e){t=t.replace(n,function(t){return t=+t||0,t=0<=(t+=e?i.top-o.scrollY:i.left-o.scrollX)?"+"+t:t});r.push(t)}),e.my=r.join(" ")),d[t.element].position(t))},this.setID=function(t){return d.widget.attr("id",t),c},this.setHeaderMessage=function(t){return c.getElements("header").html(t),c},this.setMessage=function(t){return d.message.html(t),c},this.setSettings=function(t,e){return jQuery.isPlainObject(e)?p.extend(!0,u[t],e):u[t]=e,c},this.show=function(){var t;return clearTimeout(l),d.widget.appendTo(d.container).hide(),e("show",arguments),c.refreshPosition(),u.hide.auto&&(l=setTimeout(c.hide,u.hide.autoDelay)),t=[d.window],d.iframe&&t.push(jQuery(d.iframe[0].contentWindow)),t.forEach(function(t){u.hide.onEscKeyPress&&t.on("keyup",r),u.hide.onOutsideClick&&t[0].addEventListener("click",o,!0),u.hide.onOutsideContextMenu&&t[0].addEventListener("contextmenu",o,!0),u.position.autoRefresh&&t.on("resize",c.refreshPosition)}),(u.hide.onClick||u.hide.onBackgroundClick)&&d.widget.on("click",i),u.preventScroll&&c.getElements("body").addClass(u.classes.preventScroll),c.trigger("show"),c},this.trigger=function(t,n){var e="on"+t[0].toUpperCase()+t.slice(1);c[e]&&c[e](n);t=a[t];if(t)return p.each(t,function(t,e){e.call(c,n)}),c}},y.Widget.prototype.types=[],y.Widget.prototype.buildWidget=function(){var t=this.getElements(),e=this.getSettings();t.widget.append(t.header,t.message),this.setHeaderMessage(e.headerMessage),this.setMessage(e.message),this.getSettings("closeButton")&&t.widget.prepend(t.closeButton)},y.Widget.prototype.attachEvents=function(){var t=this;t.getSettings("closeButton")&&t.getElements("closeButton").on("click",function(){t.hide()})},y.Widget.prototype.getDefaultSettings=function(){return{}},y.Widget.prototype.getClosureMethods=function(){return[]},y.Widget.prototype.onHide=function(){},y.Widget.prototype.onShow=function(){},y.Widget.prototype.onInit=function(){},y.Widget.prototype.onReady=function(){},y.widgetsTypes.simple=y.Widget,y.addWidgetType("buttons",{activeKeyUp:function(t){9===t.which&&t.preventDefault(),this.hotKeys[t.which]&&this.hotKeys[t.which](this)},activeKeyDown:function(t){var e,n;!this.focusedButton||9===t.which&&(t.preventDefault(),e=this.focusedButton.index(),t.shiftKey?(n=e-1)<0&&(n=this.buttons.length-1):(n=e+1)>=this.buttons.length&&(n=0),this.focusedButton=this.buttons[n].focus())},addButton:function(t){var e=this,n=e.getSettings(),i=jQuery.extend(n.button,t),o=t.classes?t.classes+" ":"";o+=n.classes.globalPrefix+"-button";i=e.addElement(t.name,p("<"+i.tag+">").html(t.text),o);e.buttons.push(i);o=function(){n.hide.onButtonClick&&e.hide(),p.isFunction(t.callback)&&t.callback.call(this,e)};return i.on("click",o),t.hotKey&&(this.hotKeys[t.hotKey]=o),this.getElements("buttonsWrapper").append(i),t.focus&&(this.focusedButton=i),e},bindHotKeys:function(){this.getElements("window").on({keyup:this.activeKeyUp,keydown:this.activeKeyDown})},buildWidget:function(){y.Widget.prototype.buildWidget.apply(this,arguments);var t=this.addElement("buttonsWrapper");this.getElements("widget").append(t)},getClosureMethods:function(){return["activeKeyUp","activeKeyDown"]},getDefaultSettings:function(){return{hide:{onButtonClick:!0},button:{tag:"button"}}},onHide:function(){this.unbindHotKeys()},onInit:function(){this.buttons=[],this.hotKeys={},this.focusedButton=null},onShow:function(){this.bindHotKeys(),this.focusedButton||(this.focusedButton=this.buttons[0]),this.focusedButton&&this.focusedButton.focus()},unbindHotKeys:function(){this.getElements("window").off({keyup:this.activeKeyUp,keydown:this.activeKeyDown})}}),y.addWidgetType("lightbox",y.getWidgetType("buttons").extend("lightbox",{getDefaultSettings:function(){var t=y.getWidgetType("buttons").prototype.getDefaultSettings.apply(this,arguments);return p.extend(!0,t,{contentWidth:"auto",contentHeight:"auto",position:{element:"widgetContent",of:"widget",autoRefresh:!0}})},buildWidget:function(){y.getWidgetType("buttons").prototype.buildWidget.apply(this,arguments);var t=this.addElement("widgetContent"),e=this.getElements();t.append(e.header,e.message,e.buttonsWrapper),e.widget.html(t),e.closeButton&&t.prepend(e.closeButton)},onReady:function(){var t=this.getElements(),e=this.getSettings();"auto"!==e.contentWidth&&t.message.width(e.contentWidth),"auto"!==e.contentHeight&&t.message.height(e.contentHeight)}})),y.addWidgetType("confirm",y.getWidgetType("lightbox").extend("confirm",{onReady:function(){y.getWidgetType("lightbox").prototype.onReady.apply(this,arguments);var t=this.getSettings("strings"),e="cancel"===this.getSettings("defaultOption");this.addButton({name:"cancel",text:t.cancel,callback:function(t){t.trigger("cancel")},focus:e}),this.addButton({name:"ok",text:t.confirm,callback:function(t){t.trigger("confirm")},focus:!e})},getDefaultSettings:function(){var t=y.getWidgetType("lightbox").prototype.getDefaultSettings.apply(this,arguments);return t.strings={confirm:"OK",cancel:"Cancel"},t.defaultOption="cancel",t}})),y.addWidgetType("alert",y.getWidgetType("lightbox").extend("alert",{onReady:function(){y.getWidgetType("lightbox").prototype.onReady.apply(this,arguments);var t=this.getSettings("strings");this.addButton({name:"ok",text:t.confirm,callback:function(t){t.trigger("confirm")}})},getDefaultSettings:function(){var t=y.getWidgetType("lightbox").prototype.getDefaultSettings.apply(this,arguments);return t.strings={confirm:"OK"},t}})),t.DialogsManager=y}("undefined"!=typeof jQuery?jQuery:"function"==typeof require&&require("jquery"),"undefined"!=typeof module&&void 0!==module.exports?module.exports:window);
