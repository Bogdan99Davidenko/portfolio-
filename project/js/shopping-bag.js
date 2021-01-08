for(var i = 0; i < localStorage.length; i++) {

	let id = localStorage.key(i);	
	let cart = JSON.parse(localStorage.getItem(id));
	let item = getItemById(id);

  	createChoiceGood(item);
  	setParams(item.id, item.selectedColor, item.selectedSize)
  	console.log(cart.color)
}

function setParams(id, selectedColor, selectedSize) {
	for(var i = 0; i < catalog.length; i++) {
        if (catalog[i].id == id) {
        	catalog[i].selectedColor = selectedColor;
        	catalog[i].selectedSize = selectedSize;
        }
    }
}

function createChoiceGood(arr) {
	var div = document.createElement("div");
	div.className = "cart-block__item";
	document.getElementsByClassName("cart-block")[0].appendChild(div);

	var divImg = document.createElement("div");
	divImg.className = "cart-block-img";
	div.appendChild(divImg);

	if(arr.hasNew == true) {
		var newCatalog = document.createElement("div");
        newCatalog.className = "rectangle";
        newCatalog.innerText = "New";
        divImg.appendChild(newCatalog);
	}

	var img = document.createElement("img");
	img.className = "cart-img";
	img.src = arr.thumbnail;
	divImg.appendChild(img);

	var desc = document.createElement("div");
	desc.className = "cart-block-description";
	div.appendChild(desc);

	var title = document.createElement('div');
	title.className = "cart-block-title";
	desc.appendChild(title);

	var p = document.createElement("p");
	p.innerText = arr.title;
	desc.appendChild(p);

	var p2 = document.createElement("p");
	p2.innerText = '\u00A3' + arr.discountedPrice;
	p2.style.fontSize = '16.667px';
	p2.style.fontWeight = "bold";
	desc.appendChild(p2);

	var params = document.createElement("div");
	params.className = "cart-param";
	desc.appendChild(params);

	var color  = document.createElement("p");
	color.innerText = "Color: " + arr.selectedColor;
	params.appendChild(color);

	var size  = document.createElement("p");
	size.innerText = "Size: " + arr.selectedSize;
	params.appendChild(size);

	var overlay = document.createElement("div");
    overlay.className = "overlay";

    var view = document.createElement("p");
    view.innerText = "View item";
    overlay.appendChild(view);

    var quantity = document.createElement("div");
    quantity.className = "quantity";
    quantity.innerText = "Quantity: "
    desc.appendChild(quantity);

    var plus_btn = document.createElement("button");
    plus_btn.className = "plus";
    plus_btn.innerText = "+";
    plus_btn.onclick = function (event) {
    	event = event || window.event;
		let target = event.target;
    	++cart[arr.id]	
    	localStorage.setItem(arr.id, JSON.stringify(cart));
		target.nextSibling.innerText = cart[arr.id]
    	updatePrice();
    }
    quantity.appendChild(plus_btn);

    var cart = JSON.parse(localStorage.getItem(arr.id));
    var count_good = document.createElement("span");
    count_good.className = "count-good";
    count_good.innerText = cart[arr.id];
    quantity.appendChild(count_good);

    var minus_btn = document.createElement("button");
    minus_btn.className = "minus";
    minus_btn.innerText = "–";
    minus_btn.onclick = function (event) {
    	event = event || window.event;
		let target = event.target;
    	--cart[arr.id];	
		if(cart[arr.id] > 0) {
    	    localStorage.setItem(arr.id, JSON.stringify(cart));
    	} else {
    		removeGood(arr);
    	}

		target.previousSibling.innerText = cart[arr.id]
    	updatePrice();
    	console.log(cart[arr.select])
    }

    function removeGood(good) {
    	localStorage.removeItem(good.id);
		div.innerHTML = " ";
		price -= good.discountedPrice;
		updatePrice();
    }

    quantity.appendChild(minus_btn);

	var remove_item = document.createElement("button");
	remove_item.className = "cart-block-remove";
	remove_item.id = arr.id;
	remove_item.innerText = "Remove item";
	
	remove_item.onclick = function(event) {
		event = event || window.event;
		removeGood(arr);
	}

	desc.appendChild(remove_item);
    divImg.appendChild(overlay);
}


var total_cost = document.createElement("p");
document.getElementsByClassName("total-cost")[0].appendChild(total_cost);

let empty_bag = document.querySelector(".empty-button");
let buy_product = document.querySelector(".buy-button .btn");

function emptyBag() {
	console.log(localStorage.length)
	if(localStorage.length === 0){
		document.getElementsByClassName("cart-block")[0].innerHTML = "Your shopping bag is empty. Use Catalog to add new items";
	}
	else{
		document.getElementById("modal1").style = "display:block";
		userChoice();
	}
		
}

function buyProduct() {
	document.getElementsByClassName("cart-block")[0].innerHTML = "";
	document.getElementsByClassName("total-cost")[0].innerText =  "Total cost\n" + '\u00A3' + "0";
	document.getElementsByClassName("contacts")[0].children[2].innerText = 'Bag' + ' ' + '(' + 0 + ')';	
	document.getElementById("modal").style = "display:block";
	localStorage.clear();
}

function userChoice(){
	document.getElementById("okay").onclick = function (){
		localStorage.clear();
	}
	document.getElementById("cancel").onclick = function (){
		console.log("hh");
		document.getElementById("modal1").style = "display:none";
	}
}

document.getElementById("close1").onclick = function (){
	document.getElementById("modal").style = "display:none";
}
document.getElementById("close2").onclick = function (){
	document.getElementById("modal").style = "display:none";
}


empty_bag.addEventListener("click", emptyBag)
buy_product.addEventListener("click", buyProduct)
