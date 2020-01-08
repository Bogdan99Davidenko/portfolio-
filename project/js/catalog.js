 function createCatalog(arr,i) {
             if(i < 4) {
                container = document.getElementById("arrivals-images");
             } else  {
                container  = document.getElementById("catalog-block");
               }

        var a = document.createElement("a");
        a.id = arr[i].id;
        a.href = "item.html" + "#" + arr[i].id;
        a.className = arr[i].hasNew;
        container.appendChild(a);

        var div_img = document.createElement('div');
        div_img.className = "catalog-block__item";

        var img = document.createElement("img");
        img.src = arr[i].thumbnail;

        var price = document.createElement("div");
        price.className = "price";

        if(a.className == "true") {
            var newCatalog = document.createElement("div");
            newCatalog.className = "rectangle";
            newCatalog.innerText = "New";
            div_img.appendChild(newCatalog);
        }

        var overlay = document.createElement("div");
        overlay.className = "overlay";

        var view = document.createElement("p");
        view.innerText = "View item";
        overlay.appendChild(view);

        var title = document.createElement("p");
        title.innerText = arr[i].title;

        var title_price = document.createElement("p");
        if(arr[i].discountedPrice == arr[i].price) {
            title_price.innerText = '\u00A3' + arr[i].discountedPrice 
        } else {
            var sale  = document.createElement('span');
            sale.innerText =  '\u00A3' + arr[i].price +' '+'-' +  
            ((arr[i].price - arr[i].discountedPrice) * 100) / arr[i].price + '%';
            title_price.innerText = sale.innerText + ' '+ '\u00A3' +  arr[i].discountedPrice; 
        }

        if(arr[i].price == null) {
            title_price.innerText = arr[i].placeholder;
            title_price.className = "placeholder";
            title.appendChild(title_price);
        }

        price.appendChild(title);
        price.appendChild(title_price);

        div_img.appendChild(img);
        div_img.appendChild(price);
        div_img.appendChild(overlay)
        a.appendChild(div_img);
}

 for(let i = 0; i < catalog.length; i++) {
   
      createCatalog(catalog, i);
      catalog.sort(orderByDate);
 }

function filterByFashion(style) {
    var mas = []; 

    for(let i = 0; i < catalog.length; i++) {
        if(catalog[i].fashion == style) {
            mas.push(catalog[i]);
        }
    }

    for(var i = 0; i < mas.length; i++) {
        createCatalog(mas, i);
    }
}

function filterByCategory(category) {
    var mas = []; 

    for(let i = 0; i < catalog.length; i++) {
        if(catalog[i].category == category) {
            mas.push(catalog[i]);
        }
    }

    for(let i = 0; i < mas.length; i++) {
        createCatalog(mas, i);
    }
}

function filterByPrice(a,b) {
    var result = [];
       
    for (let i = 0; i < catalog.length; i++) {
        if (catalog[i].price >= a && catalog[i].price <= b) {
            result.push(catalog[i]);
        }
    }

    for(var i = 0; i < result.length; i++) {
        createCatalog(result, i);
    }
}

function filterByСolor(color) {
    var mas = []; 

    for(let i = 0; i < catalog.length; i++) {
       for(let j = 0; j < catalog[i].colors.length; j++) {
           if(catalog[i].colors[j] == color) {
               mas.push(catalog[i]);
           }
       }
    }

    for(let i = 0; i < mas.length; i++) {
        createCatalog(mas, i);
    }
}

function filterBySize(size) {
    var mas = []; 

    for(let i = 0; i < catalog.length; i++) {
       for(let j = 0; j < catalog[i].sizes.length; j++) {
           if(catalog[i].sizes[j] == size) {
               mas.push(catalog[i]);
           }
       }
    }

    for(let i = 0; i < mas.length; i++) {
        createCatalog(mas, i);
    }
}


function orderByDate(currentObject, nextObject) {

    var data1 = new Date(currentObject.dateAdded);
    var data2 = new Date(nextObject.dateAdded);

    return data2 - data1;
}

for(let i = 0; i < document.querySelectorAll(".fashion li").length; i++) {
    document.querySelectorAll(".fashion li")[i].onclick = function (event) {
    event = event || window.event;
    let target = event.target;
    target.parentNode.parentNode.querySelector(".hide-block").innerText = target.innerText;
    document.querySelector(".hide-block").style = 'display: block; font-size: 16px; color: #f14a58';
    document.querySelector(".menu-filter-li").style = "font-size: 12px; background: #f7f7f7; line-height: 2.3";

    if(document.documentElement.clientWidth <= 768) {
         target.parentNode.parentNode.innerText = target.innerText;
         document.querySelector(".menu-filter-li").style  = "font-size: 12px; color:red, background: red; line-height: 2.3";
    } 

    document.getElementById("arrivals-images").innerHTML = '';
    document.getElementById("catalog-block").innerHTML = '';
    var filteredArray = [];
        switch(target.innerText)
        {
            case 'Not selected':
                filteredArray = catalog;
                break;
            case 'Nail the 90s':
                filteredArray = filterByFashion("Nail the 90s");
                break;
            case 'Casual style':
                filteredArray = filterByFashion("Casual style");
                break;
            case 'New Look':
                filteredArray = filterByFashion("New Look");
                break;
            case 'Sport':
                filteredArray = filterByFashion("Sport");
                break;
            case 'Vintage':
                filteredArray = filterByFashion("Vintage");
                break;
            case 'Classical style':
                filteredArray = filterByFashion("Classical style");
                break;
        }
        for(let i = 0; i < filteredArray.length; i++) {
            createCatalog(filteredArray, i);
        }
}}

for(let i = 0; i < document.querySelectorAll(".product-type li").length; i++) {
    document.querySelectorAll(".product-type li")[i].onclick = function (event) {
    event = event || window.event;
    let target = event.target;
    
    target.parentNode.parentNode.querySelector(".product-block").innerText = target.innerText
    document.querySelector(".product-block").style = 'display: block; font-size: 16px; color: #f14a58';
    document.querySelector(".product").style = "font-size: 12px; background: #f7f7f7; line-height: 2.3";
    if(document.documentElement.clientWidth <= 768) {
         target.parentNode.parentNode.innerText = target.innerText;
         document.querySelector(".product").style  = "font-size: 12px; color:red, background: red; line-height: 2.3";
    }
}}

for(let i = 0; i < document.querySelectorAll(".range-price li").length; i++) {
    document.querySelectorAll(".range-price li")[i].onclick = function (event) {
    event = event || window.event;
    let target = event.target;
    
    target.parentNode.parentNode.querySelector(".price-block").innerText = target.innerText
    document.querySelector(".price-block").style = 'display: block; font-size: 16px; color: #f14a58';
    document.querySelector(".price-li").style = "font-size: 12px; background: #f7f7f7; line-height: 2.3";

    if(document.documentElement.clientWidth <= 768) {
         target.parentNode.parentNode.innerText = target.innerText;
         document.querySelector(".price-li").style  = "font-size: 12px; color:red, background: red; line-height: 2.3";
    }

    document.getElementById("arrivals-images").innerHTML = '';
        document.getElementById("catalog-block").innerHTML = '';
        var filteredArray = [];

        switch(target.innerText)
        {
            case "Not selected":
                filteredArray = catalog;
                break;
            case "To £99":
                filteredArray = filterByPrice(0,99);
                break;
           case "£100-£299":
                filteredArray = filterByPrice(100,299);
                break;
            case "From £300":
                filteredArray = filterByPrice(300, 600);
                break;
        }

        for(let i = 0; i < filteredArray.length; i++) {
            createCatalog(filteredArray, i);
        }
}}


for(let i = 0; i < document.querySelectorAll(".brand li").length; i++) {
    document.querySelectorAll(".brand li")[i].onclick = function (event) {
    event = event || window.event;
    let target = event.target;
    
    target.parentNode.parentNode.querySelector(".brand-block").innerText = target.innerText
    document.querySelector(".brand-block").style = 'display: block; font-size: 16px; color: #f14a58';
    document.querySelector(".brand-li").style = "font-size: 12px; background: #f7f7f7; line-height: 2.3";
    if(document.documentElement.clientWidth <= 768) {
         target.parentNode.parentNode.innerText = target.innerText;
         document.querySelector(".brand-li").style = "font-size: 12px; color:red, background: red; line-height: 2.3";
    }
}}


for(let i = 0; i < document.querySelectorAll(".color li").length; i++) {
    document.querySelectorAll(".color li")[i].onclick = function (event) {
    event = event || window.event;
    let target = event.target;
    
    target.parentNode.parentNode.querySelector(".color-block").innerText = target.innerText
    document.querySelector(".color-block").style = 'display: block; font-size: 16px; color: #f14a58';
    document.querySelector(".color-li").style = "font-size: 12px; background: #f7f7f7; line-height: 2.3";
    if(document.documentElement.clientWidth <= 768) {
         target.parentNode.parentNode.innerText = target.innerText;
         document.querySelector(".color-li").style = "font-size: 12px; color:red, background: red; line-height: 2.3";
    }

    document.getElementById("arrivals-images").innerHTML = '';
    document.getElementById("catalog-block").innerHTML = '';
    var filteredArray = [];
    switch(target.innerText)
        {
            case 'Not selected':
                filteredArray = catalog;
                break;
            case "Black":
                filteredArray = filterByСolor('Black');
                break;
           case "Blue":
                filteredArray = filterByСolor('Blue');
                break;
            case "Red":
                filteredArray = filterByСolor('Red');
                break;
            case "Green":
                filteredArray = filterByСolor('Green');
                break;
            case "Golden":
                filteredArray = filterByСolor('Golden');
                break;
        }
        for(let i = 0; i < filteredArray.length; i++) {
            createCatalog(filteredArray, i);
        }
}}


for(let i = 0; i < document.querySelectorAll(".sizes li").length; i++) {
    document.querySelectorAll(".sizes li")[i].onclick = function (event) {
    event = event || window.event;
    let target = event.target;
    
    target.parentNode.parentNode.querySelector(".sizes-block").innerText = target.innerText
    document.querySelector(".sizes-block").style = 'display: block; font-size: 16px; color: #f14a58';
    document.querySelector(".sizes-li").style = "font-size: 12px; background: #f7f7f7; line-height: 2.3";

    if(document.documentElement.clientWidth <= 768) {
         target.parentNode.parentNode.innerText = target.innerText;
         document.querySelector(".sizes-li").style = "font-size: 12px; color:red, background: red; line-height: 2.3";
    }

    document.getElementById("arrivals-images").innerHTML = '';
    document.getElementById("catalog-block").innerHTML = '';
    var filteredArray = [];
    switch(target.innerText)
        {
           
            case 'Not selected':
                filteredArray = catalog;
                break;
           case  'UK 2':
                filteredArray = filterBySize('UK 2');
                break;
            case "UK 18":
                filteredArray = filterBySize('UK 18');
                break;
            case 'UK 18L':
                filteredArray = filterBySize('UK 18L');
                break;
            case 'UK 20L':
                filteredArray = filterBySize('UK 20L');
                break;
            case 'UK 20S':
                filteredArray = filterBySize('UK 20S');
                break;
            case 'UK 22S':
                filteredArray = filterBySize('UK 22S');
                break;
            case 'UK 22':
                filteredArray = filterBySize('UK 22');
                break;
        }
        for(let i = 0; i < filteredArray.length; i++) {
            createCatalog(filteredArray, i);
        }
}}

document.getElementById("filter-women").onclick = function() {
    document.getElementById("filter-women").style.color = "#f14a58";
    document.getElementById("filter-men").style.color = "#000";
    document.getElementById("arrivals-images").innerHTML = '';
    document.getElementById("catalog-block").innerHTML = '';
    filterByCategory('women');
}

document.getElementById("filterWomen").onclick = function() {
    document.getElementById("filter-women").style.color = "#f14a58";
    document.getElementById("filter-men").style.color = "#000";
    document.getElementById("arrivals-images").innerHTML = '';
    document.getElementById("catalog-block").innerHTML = '';
    filterByCategory('women');
}

document.getElementById("filter-men").onclick = function() {
    document.getElementById("filter-women").style.color = "#000";
    document.getElementById("filter-men").style.color = "#f14a58";
    document.getElementById("arrivals-images").innerHTML = '';
    document.getElementById("catalog-block").innerHTML = '';
    filterByCategory('men');
}

document.getElementById("filterMen").onclick = function() {
    document.getElementById("filter-women").style.color = "#000";
    document.getElementById("filter-men").style.color = "#f14a58";
    document.getElementById("arrivals-images").innerHTML = '';
    document.getElementById("catalog-block").innerHTML = '';
    filterByCategory('men');
}




