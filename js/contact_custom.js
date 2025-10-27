/* Documento JS */

/******************************

[Tabla de Contenidos]

1. Variables e Inicializaciones
2. Configurar Encabezado
3. Iniciar Menú Hamburguesa
4. Iniciar Parallax
5. Iniciar Mapa (Leaflet)


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
	var map;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initHamburger();
	initParallax();
	initMap();

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

	3. Iniciar Menú Hamburguesa

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

	4. Iniciar Parallax

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

	/* 

	5. Iniciar Mapa (Leaflet)

	*/

	function initMap()
	{
		// Se usa un setTimeout para asegurar que el contenedor del mapa tenga dimensiones antes de inicializarlo.
		setTimeout(function()
		{
			if($('#map').length)
			{
				// Coordenadas para Santiago, Chile
				var lat = -33.44887;
				var lng = -70.66927;

				// Crear el mapa y centrarlo en Santiago
				// Usar la variable 'map' declarada en el scope superior (evita shadowing)
				map = L.map('map').setView([lat, lng], 13);

				// Añadir una capa de mapa (tile layer) de OpenStreetMap
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);

				// Añadir un marcador en la ubicación
				L.marker([lat, lng]).addTo(map)
					.bindPopup('<b>Nuestra Ubicación</b><br>Av. Providencia 123, Santiago.')
					.openPopup();

				// Forzar recalculo de tamaños en caso de que el mapa se haya inicializado
				// mientras el contenedor estaba oculto o su tamaño no estaba aún calculado.
				setTimeout(function() {
					if (map && typeof map.invalidateSize === 'function') map.invalidateSize();
				}, 200);
			}
		}, 100);
	}
});