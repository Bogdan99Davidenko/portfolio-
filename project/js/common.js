var thumbs = document.getElementById('thumb-images');
var thumbs__item = document.getElementsByClassName("thumbs-images__item");
var full = document.getElementById("full-image");

var currentImg = 1;
document.getElementById(currentImg).parentElement.classList.add("selected");

function changeThumb(event) {
	event = event || window.event;
	var target = event.target;

	document.getElementById(currentImg).parentElement.classList.remove("selected");
	

	target.parentElement.classList.remove("thumb-images__item");
	if(target.parentElement.classList.contains("selected") == false) {
	  target.parentElement.classList.add("selected");
	}
	document.getElementById("full-image").src = target.src;
	currentImg = target.id;
}

thumbs.addEventListener("click", changeThumb);

var id = location.href.split("#")[1];
var item;

for(let i = 0; i < catalog.length; i++) {
	if(catalog[i].id == id) {
		item = catalog[i];
	}
}

document.getElementById('full-image').src = item.thumbnail;
document.getElementById('1').src = item.preview[0];
document.getElementById('2').src = item.preview[1];
document.getElementById('3').src = item.preview[2];
document.getElementsByTagName('h2')[0].innerText = item.title;
document.getElementsByTagName('p')[0].innerText = item.description;

if(item.price) {
	document.getElementsByClassName('thumb-block2-price')[0].innerText = '\u00A3' + item.discountedPrice;
} else {
	document.getElementsByClassName('thumb-block2-price')[0].innerText = item.placeholder;
}

function setParams(id, selectedColor, selectedSize) {
	for(var i = 0; i < catalog.length; i++) {
        if (catalog[i].id == id) {
        	catalog[i].selectedColor = selectedColor;
        	catalog[i].selectedSize = selectedSize;
        }
    }
}

for(var i = 0; i < item.colors.length; i++) {
	var color = document.createElement('span');
	color.innerText = item.colors[i];

	if(item.colors[i] == item.selectedColor) {
		color.className = "border";
	}

	color.onclick = function (event) {
		event = event || window.event;
 		var target = event.target; 
 		document.querySelectorAll(".thumb-block2-color .border")[0].className = " ";
 		target.className = "border";
 		item.selectedColor = target.innerText;
	}

	document.getElementsByClassName('thumb-block2-color')[0].appendChild(color);
}

for(var i = 0; i < item.sizes.length; i++) {
	var size = document.createElement('span');
	size.innerText = item.sizes[i];

	if(item.sizes[i] == item.selectedSize) {
		size.className = "border";
	}

	size.onclick = function (event) {
		event = event || window.event;
 		var target = event.target; 
 		document.querySelectorAll(".thumb-block2-size .border")[0].className = " ";
 		target.className = "border";
 		let good = getItemById(id)
 		item.selectedSize = target.innerText;
	}

	document.getElementsByClassName('thumb-block2-size')[0].appendChild(size);
}

document.getElementById('add').onclick = function() {


	var cart = {}
	var temp = JSON.parse(localStorage.getItem(item.id));

	if(temp == null) {
  cart[item.id] = 1;
 } else {
  cart[item.id] = ++temp[item.id];
 }
	
	// if(temp == null) {
	// 	localStorage.setItem(item.id, JSON.stringify([]))
	// } 

	// for(let i = 0; i < temp.length; i++) {

	// 	if(temp[i].color == item.selectedColor) {
	// 		temp[item.id] = ++temp[item.id];
	// 	}


	// 	else {
	// 		cart[item.id] = 1;
	// 	}
	// }

 localStorage.setItem(item.id, JSON.stringify(cart));
	updatePrice();
}



