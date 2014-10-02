$(document) .ready (function ()
	{
	$('#email-link').wrap('<a href="mailto:david@davidputney.com?Subject=Website%20feedback" target="_top">');  
	$('#twitter-link').wrap('<a href="https://twitter.com/putneydm">');  
	$('#facebook-link').wrap('<a href="	https://www.facebook.com/david.putney">'); 







function set_background(image)
	{

var window_width = $(window) .width ();	

if (0 < window_width && window_width < 500)
	{
	var image_url = 'siteart/' + image + '_small.jpg';	
	}

if (500 < window_width && window_width < 700)
	{
	var image_url = 'siteart/' + image + '_med.jpg';	
	}
	
if (700 < window_width && window_width < 5000)
	{
	var image_url = 'siteart/' + image + '_large.jpg';	
	}

var target = '#' + image;
	console.log(target);
    var img = new Image();
    img.onload = function(){
      // image  has been loaded
      $(target).css("background-image","url('"+image_url+"')");
    };
    img.src = image_url;
 
 	}
 	
 	
$(".backgound-set").each( function()
{
	var image = $(this) .attr ('id');
		console.log(image);
	
	set_background(image)
});










$( "a" ).each( function(){
  var href = $( this ).attr( "href" );
  if( href.indexOf( "#" ) !== 0 ){
                $( this ).bind( "tap", function(){
                    window.location.href = this.href;
                });
            }
        });
            
function page_scroller()
	{
	$('html, body').animate({ scrollTop: 0 }, 150);	
	}

	$("#scroll-to-top").click(function() {
		page_scroller();
		return false;
	});	
		            

$('#menu-button' ).bind( "tap", function( e ){ 
 
 	console.log('works');
 
  	var id = '#' + $('#menu-button').closest("nav").attr("id");
 	var menu_height = $(id) .height ();
 	
 if (menu_height < 45)
	 {
	 $(id) .addClass ('menu-active');
	  	console.log(menu_height);
	 $('.button_hidden') .show ();
	 $('.button_visible') .hide ();
	}
	
 else
	 {
	 $(id) .removeClass ('menu-active');
	 $('.button_hidden') .hide ();
	 $('.button_visible') .show ();
	}	

}); 



function slideshow(target)
	{
	
$(target + " > div:gt(0)").hide();	
	
setInterval(function() { 
  $(target + ' > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo(target);
},  3000);

}

function find_slides()
	{
	$( ".slide-container" ).each(function() {
	var container = '#' + $( this ).attr('id');
	slideshow(container);
	});
	}

find_slides();

}); 



$(window) .resize (function ()
	{		
	$('#secondary-header, #inside-header') .removeClass ('menu-active');
	$('.button_hidden') .hide ();
	$('.button_visible') .show ();

	}); 




$(window) .scroll (function ()
	{
	var window_width = $(window) .width ();	
	scroll_position = $(document) .scrollTop ();
    main_position = $('#main') .offset ();
    
  function sticky_menu (main_position, scroll_position)
		{			
		if (main_position < scroll_position)
		{
		$('#secondary-header') .addClass ('social-menu-show');	
		}
		
		if (main_position > scroll_position)
		{
		$('#secondary-header') .removeClass ('social-menu-show') .removeClass ('menu-active');
		$('.button_hidden') .hide ();
		$('.button_visible') .show ();
		}		
		}		  

	function scroll_up (document_top)
		{	
		if (document_top > 300 && window_width < 900)
		{
		$('#scroll-to-top') .fadeIn (200);		
		}
		
		if (document_top < 300)
		{
		$('#scroll-to-top') .fadeOut (200);		
		}						
	}    

   $.data(this, 'scrollTimer', setTimeout(function() {    
		sticky_menu(main_position.top, scroll_position);
		var document_top = $(document) .scrollTop ();
		scroll_up(document_top);	
 }, 50));

	}); 
