var price;
var count;
var commonCount;
function updatePrice() {
	commonCount = 0;
	price = 0;
	for(let i = 0; i < localStorage.length; i++) {

		let id = localStorage.key(i);	
		let jsonItem = JSON.parse(localStorage.getItem(id));
		count = jsonItem[id];
		let item = getItemById(id);

		price += item.price * count;
		commonCount += count;
	}

	document.getElementsByClassName("contacts")[0].children[2].innerText = 'Bag' + ' ' + '\u00A3' +
	price + ' ' + '(' + commonCount + ')';	

	document.querySelector(".total-cost").innerText = "Total cost\n" + '\u00A3' + price;
}

updatePrice();

function getItemById(id) {
	for(let i = 0; i < catalog.length; i++) {
		if(catalog[i].id == id) {
			return catalog[i];
		}
	}
}