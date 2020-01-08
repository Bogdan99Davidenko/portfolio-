var slide = 1;
showSlide(1);

var slideInterval = setInterval(plusSlide,10000);

function plusSlide() {
	showSlide(slide += 1);
}

function currentSlide(n) {
	showSlide(slide = n);	
	clearInterval(slideInterval);
	setInterval(slideInterval,10000);
}

function showSlide(n) {
	var slides = document.getElementsByClassName('sliders');
	var dots = document.getElementsByClassName('dots__item');

	if(n > slides.length) {
		slide = 1;
	}

	if(n < 1) {
		slide = slides.length;
	}

	for(let i = 0; i< slides.length; i++ ) {
		slides[i].style.display = 'none';
	}

	for(let i = 0; i < dots.length; i++ ) {
		dots[i].classList.remove("active");   
	}

	slides[slide-1].style.display = 'block';
	dots[slide-1].classList.add("active");
}

var loupe = document.getElementById("loupe");
var search = document.getElementsByClassName("search")

loupe.onclick = function () {
	
	if(document.documentElement.clientWidth <= 768) {
		var input = document.getElementsByTagName("input");
		input[0].style.display = 'inline-block';
		search[0].style.borderBottom  = '1.5px solid #e5e5e5'
	}
}

