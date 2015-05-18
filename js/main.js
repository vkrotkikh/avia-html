jQuery(function($) {
$(document).ready(function(){
	var img_height = $('.slider_images').find('img').height();
	var img_width = $('.slider_images').find('img:first-children').width();
	if (img_height < $('.slider_images').height() || img_width > $('body').width()) {
		$('.slider_images').addClass('height');
	}else{
		$('.slider_images').removeClass('height');
	}
	var slider_offset = $('.device_place').offset().top;
	var currentScroll = 0;
	var scrollTemp = 0;
	var menu_offset = $('.site_header').offset().top;
	var menu_height = $('.site_header').outerHeight();
	var slides_offset = $('.device_place').find('.device_slide');
	for (var i =0; i< slides_offset.length; i++){
		if (i === 0) {
			slides_offset[i] = $(slides_offset[i]).offset().top;
		}else if (i === slides_offset.length -1) {
			slides_offset[i] = $(slides_offset[i]).offset().top  - (0.5*($('.device_slide').outerHeight()));
		}else{
			slides_offset[i] = $(slides_offset[i]).offset().top - (0.5*($('.device_slide').outerHeight()));
		}
	}
	$('.slider_images').css('height',$('body').height());
	function slider_scroller(){
		if (($('body').width()) < 768) {
			$('.device_slider').removeClass('finished').removeClass('started').find('.image_holder').removeClass('active');
			return false;
		}
		var need_show = 0;
		if(currentScroll >= slider_offset){
			$('.device_slider').removeClass('finished').addClass('started');
			for( var i = 0; i < slides_offset.length; i++){
				if (currentScroll >= slides_offset[i]) {
					need_show = i;
					
					var current_slide = $('.device_slider').find('.device_slide:eq(' + i + ')').attr('data-slide');
					current_slide = current_slide.split('slide')[1];
					if(i === (slides_offset.length-1)){
						if (currentScroll >= (slides_offset[i] + (0.5*($('.device_slide').outerHeight())))) {
							$('.device_slider').removeClass('started').addClass('finished');
						}
					}
				}
			}
		$('.slider_images').find('.image_holder:not(:eq('+ need_show + '))').removeClass('active');
		if ($('.slider_images').find('.image_holder:eq('+ need_show+ ')').hasClass('active')) {
			return false;
		}else{
			$('.slider_images').find('.image_holder:eq('+ need_show+ ')').addClass('active');
		}
		}else{
			$('.device_slider').removeClass('started');
		}
		if(currentScroll >= (slider_offset + $('.device_slider').outerHeight())){
			$('.device_slider').removeClass('started');
		}
	}
	//check window width()
	if ($('body').width() < 768) {
		$('.device_slider').children('.device_slide').css('min-height', 'auto');
		$('.device_slider').children('.device_slide').not(':eq(0)').hide();
		// $('.slider_images').slick({
		// 	slidesToShow: 1,
		// 	arrows: false,
		// 	asNavFor: '.slides_holder',
		// 	autoplay: true,
  // 			autoplaySpeed: 3000,
		// });
		// $('.slides_holder').slick({
		// 	slidesToShow: 1,
		// 	arrows: false,
		// 	asNavFor: '.slider_images',
		// 	respondTo: 'slider'
		// });
		$('.slider_images').cycle({
	    	fx: 'scrollHorz',
	    	slides: '.image_holder',
	    	pauseOnHover: true,
	    });
		$('.slides_holder').cycle({
			fx: 'scrollHorz',
			slides: '.device_slide',
			paused: true
		});
		$('.app_points_list').cycle({
			fx: 'fade',
			slides: '> li',
			paused: true,
			next:'.track_btn',
			prev: '.track_btn_prev',
			autoHeight: false
		});
	}else{
		$('.device_slider').children('.device_slide').css('min-height', $('body').outerHeight());
			$('.wristle').children('.icon:not(:first-child)').hide();
			$('.devices_holder .phone1').children('.icon:not(:first-child)').hide();
			$('.devices_holder .phone2').children('.icon:not(:first-child)').hide();
			$('.devices_holder .tracker').children('.icon:not(:first-child)').hide();
		var msnry = new Masonry( '.specs_list', {
			itemSelector: '.specs_list > li',
		});
	}
	//scroll listener
		$(window).on('scroll', function(){

		currentScroll = $(window).scrollTop();
		slider_offset = $('.device_place').offset().top;
		slider_scroller();
		$('.page_nav li a').each(function() {
			var elem = $(this).attr('href');
			var offsetElem = $(elem).offset().top;
			var hieghtElem = $(elem).outerHeight();
			if (currentScroll >= (offsetElem - menu_height) && currentScroll < ((offsetElem - menu_height) + hieghtElem)) {
				$(this).addClass('active');
			}
			else {
				$(this).removeClass('active');
			}
		});
		$('.small_menu ul li a').each(function() {
			var elem = $(this).attr('href');
			var offsetElem = $(elem).offset().top;
			var hieghtElem = $(elem).outerHeight();
			if (currentScroll >= (offsetElem - menu_height) && currentScroll < ((offsetElem - menu_height) + hieghtElem)) {
				$('.small_menu .current').text($(this).text());
			}
		});
		slides_offset = $('.device_place').find('.device_slide');
		for (var i =0; i< slides_offset.length; i++){
			if (i === 0) {
				slides_offset[i] = $(slides_offset[i]).offset().top;
			}else if (i === slides_offset.length -1) {
				slides_offset[i] = $(slides_offset[i]).offset().top - (0.5*($('.device_slide').outerHeight()));
			}else{
				slides_offset[i] = $(slides_offset[i]).offset().top - (0.5*($('.device_slide').outerHeight()));
			}
		}
		if ($(window).scrollTop() >=100) {
			$('.site_header').addClass('fixed');
		}else{
			$('.site_header').removeClass('fixed');
		}
	});
	$('.benefits_list li').hover(function(){
		$('.benefits_list li').removeClass('active');
		$('.wristle').attr('data-img','');
		$('.wristle').children('.icon').hide();
		$(this).addClass('active');
		var icon_class = $(this).attr('data-img');
		$('.wristle').attr('data-img',icon_class);
		var icon_index = $('.wristle').attr('data-img').split('icon')[1];
		$('.wristle').children('.icon:eq(' + icon_index +')').show();
	});
	$('.app_points_list li').hover(function(){
		if ($(this).hasClass('cycle-slide')) {
			return false;
		}
		$('.app_points_list li').removeClass('active');
		$('.devices_holder .pnone1').attr('data-img','');
		$('.devices_holder .pnone2').attr('data-img','');
		$('.devices_holder .tracker').attr('data-img','');
		$('.devices_holder .phone1').children('.icon').hide();
		$('.devices_holder .phone2').children('.icon').hide();
		$('.devices_holder .tracker').children('.icon').hide();
		$(this).addClass('active');
		var icon_class = $(this).attr('data-img');
		$('.devices_holder').children('div').attr('data-img', icon_class);
		var icon_index = icon_class.split('icon')[1];
		var children = $('.devices_holder').children('div');
		for( var i = 0; i < children.length; i++){
			$(children[i]).children('.icon:eq(' + icon_index +')').show();
		}
	});
	
	$('.page_nav li a').on('click', function () {
     	var elementClick = $(this).attr('href');
     	var destination = $(elementClick).offset().top;
     	menu_height = $('.site_header').outerHeight();
     	$('html, body').animate({scrollTop: destination - menu_height}, 1000);
     	return false;
    });
	$('.list').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '#no-template-pager',
		autoplay: true,
  		autoplaySpeed: 3000,
	});
	$('#no-template-pager').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.list',
		focusOnSelect: true,
		prevArrow: '.btn_prev',
		nextArrow :'.btn_next',
		autoplay: true,
  		autoplaySpeed: 3000,
	});
    $('#no-template-pager .slick-active').eq(0).addClass('slick-center');
	$('#no-template-pager').on('afterChange', function (slickSlide,i) {
        $('#no-template-pager .slick-active').removeClass('slick-center');
        $('#no-template-pager .slick-active').eq(0).addClass('slick-center');
   	});
    $('.good_items').cycle({
    	fx: 'carousel',
    	slides: '.item',
    	autoHeight: false,
    	pauseOnHover: true,
    });
	// $('#slider').carousel({
	// 		itemWidth: $('#slider').width()/5 + 25,
	// 		itemHeight: 351,
	// 		distance: 70,
	// 		selectedItemDistance: 27,
	// 		selectedItemZoomFactor: 1,
	// 		unselectedItemZoomFactor: 0.5,
	// 		unselectedItemAlpha: 0.35,
	// 		motionStartDistance: 40,
	// 		topMargin: 0,
	// 		selectByClick: true
	// 	});
	// $('.sky-carousel-container').slick({
	// 	slidesToShow: 5,
	// 	centerMode: true,
	// 	arrows: false,
	// 	variableWidth: true,
	// 	responsive: [
	// 		{
	// 			 breakpoint: 768,
	// 			 settings : {
	// 			 	slidesToShow: 3
	// 			 }
	// 		}
	// 	]
 //    });
	$('.slidee').on('click', '.slide', function(){
		if ($(this).hasClass('selected')) {
			return false;
		}
		if ($(this).hasClass('central')) {
			return false;
		}
		$(this).parent().children('.slide').removeClass('selected');
		$(this).addClass('selected');
		var img_url = $(this).find('img').attr('src');
		$(this).parent().find('.central').find('img').animate({
			opacity:0
		},500,function(){
			$(this).attr('src',img_url);
			$(this).animate({
				opacity: 1
			},500);
		}).dequeue();
	});

	$('.nav-color li').on('click', function() {
		if($(this).hasClass('active')){
			return false;
		}
		if($('.slidee').find('.selected').length === 0){
			return false;
		}
		var color = $(this).children('a').attr('data-color');
		var color_url = $('.selected').find('.'+color).attr('src');
		$('.nav-color li').removeClass('active');
		$(this).addClass('active');
		$('.central').find('img').animate({
			opacity:0
		},500,function(){
			$(this).attr('src',color_url);
			$(this).animate({
				opacity: 1
			},500);
		}).dequeue();
	});

    $('.sky-carousel-container').on('click', '.slick-slide', function(event){
    	var clickedSlide = parseInt($(this).attr('data-slick-index'));
    	$('.sky-carousel-container').slick('slickGoTo', clickedSlide , 'true' );
    });

});
//parallax
    $('div[data-type="background"]').each(function(){
        var $bgobj = $(this); // создаем объект
        $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
            // Присваиваем значение background-position
            var coords = 'center '+ yPos + 'px';
            // Создаем эффект Parallax Scrolling
            $bgobj.css({ backgroundPosition: coords });
        });
    });
	//resize
	$(window).resize(function(){
		img_height = $('.slider_images').find('img').height();
		img_width = $('.slider_images').find('img').width();
		var width = $(window).width();
		$('.device_slider').children('.device_slide').css('min-height', $('body').outerHeight());
		$('.slider_images').css('height',$('body').height());
		slider_offset = $('.device_place').offset().top;
		slides_offset = $('.device_place').find('.device_slide');
		for (var i =0; i< slides_offset.length; i++){
			if (i === 0) {
				slides_offset[i] = $(slides_offset[i]).offset().top;
			}else if (i === slides_offset.length -1) {
				slides_offset[i] = $(slides_offset[i]).offset().top  - (0.5*($('.device_slide').outerHeight()));
			}else{
				slides_offset[i] = $(slides_offset[i]).offset().top - (0.5*($('.device_slide').outerHeight()));
			}
		}
		if (width < 750) {
			$('.device_slider').find('.device_slide').css('min-height','auto');
			$('.slider_images').cycle({
				fx: 'scrollHorz',
				slides: '.image_holder',
				pauseOnHover: true,
			});
			$('.slides_holder').cycle({
				fx: 'scrollHorz',
				slides: '.device_slide',
				paused: true
			});
			$('.app_points_list').cycle({
				fx: 'fade',
				slides: '> li',
				paused: true,
				next:'.track_btn',
				prev: '.track_btn_prev',
				autoHeight: false
			});
			$('.specs_list').masonry('destroy');
			}else{
				var msnry = new Masonry( '.specs_list', {
					itemSelector: '.specs_list > li',
				});
				$('.device_slider').find('.device_slide').show();
				if ($('.device_slide').hasClass('cycle-slide')) {
					$('.slider_images').cycle('destroy');
					$('.slides_holder').cycle('destroy');
					$('.app_points_list').cycle('destroy');
				}
				if (img_height < $('.slider_images').height() || img_width > $('body').width()) {
					$('.slider_images').addClass('height');
				}else{
					$('.slider_images').removeClass('height');
				}
			}
	});
	$('.button_next').click(function(){
		$('.slider_images').cycle('next');
	});
	$('.button_prev').click(function(){
		$('.slider_images').cycle('prev');
	});
	//small_menu
		$('.small_menu').on('click',function(){
			$(this).toggleClass('opened').children('ul').toggleClass('active');
		});
		$('.small_menu').on('click', 'a', function(){
	     	$('.small_menu').toggleClass('opened').children('ul').toggleClass('active');
	     	var text = $(this).text();
	     	$('.small_menu .current').text(text);
			var elementClick = $(this).attr('href');
	     	var destination = $(elementClick).offset().top;
	     	menu_height = $('.site_header').outerHeight();
	     	$('html, body').animate({scrollTop: destination - menu_height}, 1000);
	     	return false;
		});
		$('.slider_images').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
			if (forwardFlag) {
		    	$('.slides_holder').cycle('next');
			}else{
		    	$('.slides_holder').cycle('prev');
			}
		});
		$('.app_points_list').on('cycle-post-initialize', function(event, optionHash){
			$('.app_points_list li:first-child').addClass('active');
			$('.devices_holder .phone1').children('.icon').hide();
			$('.devices_holder .phone2').children('.icon').hide();
			$('.devices_holder .tracker').children('.icon').hide();
			$(this).addClass('active');
			$('.devices_holder').children('div').each(function(){
				$(this).children('.icon').first().show();
			})
		});
		$('.app_points_list').on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag){
			$('.app_points_list').find('.cycle-slide').removeClass('active');
			$('.devices_holder .pnone1').attr('data-img','');
			$('.devices_holder .pnone2').attr('data-img','');
			$('.devices_holder .tracker').attr('data-img','');
			$('.devices_holder .phone1').children('.icon').hide();
			$('.devices_holder .phone2').children('.icon').hide();
			$('.devices_holder .tracker').children('.icon').hide();
			$('.app_points_list .cycle-slide-active').addClass('active');
			var icon_class = $('.app_points_list .cycle-slide-active').attr('data-img');
			$('.devices_holder').children('div').attr('data-img', icon_class);
			var icon_index = icon_class.split('icon')[1];
			var children = $('.devices_holder').children('div');
			for( var i = 0; i < children.length; i++){
				$(children[i]).children('.icon:eq(' + icon_index +')').show();
			}
		});
	//CLOSE\OPEN POPUP
	$('#buy_btn').click(function(){
		$('.popup').fadeIn('fast');
		$('body').css('overflow','hidden');
	});
	$('.close_btn').click(function(){
		$('.popup').fadeOut('fast');
		$('body').css('overflow','');
	});
	//CHECK null at values
	//at start all inputs at 0
	$('.count_input').val('0');
	$('.shopping_cell').addClass('nulled');
	$('.count_input').on('keyup',function(){
		if (($(this).val() === '') || ($(this).val() === '0')) {
			$(this).parent().parent().addClass('nulled');
		}
		else{
			$(this).parent().parent().removeClass('nulled');
		}
	});
});