/* Documento JS */

/******************************

[Tabla de Contenidos]

1. Variables e Inicializaciones
2. Configurar Encabezado
3. Iniciar Slider Principal
4. Iniciar SVG
5. Iniciar Menú Hamburguesa
6. Iniciar Slider de Testimonios
7. Iniciar Parallax


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Variables e Inicializaciones

	*/

	var hamb = $('.hamburger');
	var header = $('.header');
	var hambActive = false;
	var menuActive = false;
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initHeroSlider();
	initSvg();
	initHamburger();
	initTestimonialsSlider();
	initParallax();

	/* 

	2. Configurar Encabezado

	*/

	function setHeader()
	{
		if(window.innerWidth < 992)
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		else
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		if(window.innerWidth > 991 && menuActive)
		{
			closeMenu();
		}
	}

	/* 

	3. Iniciar Slider Principal

	*/

	function initHeroSlider()
	{
		if($('.hero_slider').length)
		{
			var owl = $('.hero_slider');

			owl.owlCarousel(
			{
				items:1,
				loop:true,
				smartSpeed:800,
				autoplay:true,
				nav:false,
				dots:false
			});

			// Agrega clases de animate.css a los elementos para ser animados
			function setAnimation ( _elem, _InOut )
			{
				// Almacena todos los nombres de eventos 'animationend' en una cadena.
				// Ver documentación de animate.css
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function ()
				{
					var $elem = $(this);
					var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

					$elem.addClass($animationType).one(animationEndEvent, function ()
					{
						$elem.removeClass($animationType); // Elimina la clase de animate.css al final de las animaciones
					});
				});
			}

			// Se ejecuta antes de que cambie el slide actual
			owl.on('change.owl.carousel', function(event)
			{
				var $currentItem = $('.owl-item', owl).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-out]");
				setAnimation ($elemsToanim, 'out');
			});

			// Se ejecuta después de que el slide actual ha cambiado
			owl.on('changed.owl.carousel', function(event)
			{
				var $currentItem = $('.owl-item', owl).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation ($elemsToanim, 'in');
			})

			// Manejar Navegación Personalizada
			if($('.hero_slider_left').length)
			{
				var owlPrev = $('.hero_slider_left');
				owlPrev.on('click', function()
				{
					owl.trigger('prev.owl.carousel');
				});
			}

			if($('.hero_slider_right').length)
			{
				var owlNext = $('.hero_slider_right');
				owlNext.on('click', function()
				{
					owl.trigger('next.owl.carousel');
				});
			}
		}	
	}

	/* 

	4. Iniciar SVG

	*/

	function initSvg()
	{
		jQuery('img.svg').each(function()
		{
			var $img = jQuery(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			jQuery.get(imgURL, function(data)
			{
				// Obtiene la etiqueta SVG, ignora el resto
				var $svg = jQuery(data).find('svg');

				// Agrega el ID de la imagen reemplazada al nuevo SVG
				if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
				}
				// Agrega las clases de la imagen reemplazada al nuevo SVG
				if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Elimina cualquier etiqueta XML inválida según http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Reemplaza la imagen con el nuevo SVG
				$img.replaceWith($svg);
			}, 'xml');
		});
	}

	/* 

	5. Iniciar Menú Hamburguesa

	*/

	function initHamburger()
	{
		if($('.hamburger_container').length)
		{
			var hamb = $('.hamburger_container');

			hamb.on('click', function(event)
			{
				event.stopPropagation();

				if(!menuActive)
				{
					openMenu();
					
					$(document).one('click', function cls(e)
					{
						if($(e.target).hasClass('menu_mm'))
						{
							$(document).one('click', cls);
						}
						else
						{
							closeMenu();
						}
					});
				}
				else
				{
					$('.menu_container').removeClass('active');
					menuActive = false;
				}
			});
		}
	}

	function openMenu()
	{
		var fs = $('.menu_container');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu()
	{
		var fs = $('.menu_container');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	6. Iniciar Slider de Testimonios

	*/

	function initTestimonialsSlider()
	{
		if($('.testimonials_slider').length)
		{
			var owl1 = $('.testimonials_slider');

			owl1.owlCarousel(
			{
				items:1,
				loop:true,
				nav:false,
				autoplay:true,
				autoplayTimeout:5000,
				smartSpeed:1000
			});
		}
	}

	/* 

	7. Iniciar Parallax

	*/

	function initParallax()
	{
		// Agrega efecto parallax al slider principal
		if($('.slider_prlx').length)
		{
			var homeBcg = $('.slider_prlx');

			var homeBcgScene = new ScrollMagic.Scene({
		        triggerElement: homeBcg,
		        triggerHook: 1,
		        duration: "100%"
		    })
		    .setTween(TweenMax.to(homeBcg, 1, {y: '15%', ease:Power0.easeNone}))
		    .addTo(ctrl);
		}

		// Agrega efecto parallax a cada elemento con la clase prlx
		// Agrega la clase prlx_parent al padre del elemento
		if($('.prlx_parent').length && $('.prlx').length)
		{
			var elements = $('.prlx_parent');

			elements.each(function()
			{
				var ele = this;
				var bcg = $(ele).find('.prlx');

				var slideParallaxScene = new ScrollMagic.Scene({
			        triggerElement: ele,
			        triggerHook: 1,
			        duration: "200%"
			    })
			    .setTween(TweenMax.from(bcg, 1, {y: '-30%', ease:Power0.easeNone}))
			    .addTo(ctrl);
			});
		}
	}
});