$(document).ready(function(){
	$(".add_to_cart").on("click", function(){
		var id_text = $(this).attr("id")
		var that = $("#" + id_text + "_product");
		add_to_cart(that);
	})
	$(".clear_cart").on("click", function(e){
		//e.preventDefault()
		notify("warning", "Delete items in the cart")
		window.localStorage.removeItem("make_easy");
		total_cart_value();
		load_cart_items();
		
	})
	total_cart_value();
	load_cart_items();
})

function add_to_cart(item){
	var item_obj = {}
	var name = item.find(".title").text().trim()
	item_obj.price = item.find(".price").text().trim()
	item_obj.qty = 1
	if (localStorage.getItem('make_easy') == 'undefined'){
		localStorage.setItem("make_easy");
	}
	var cart = {}
	cart = JSON.parse(localStorage.getItem("make_easy")) || {};

	if (cart[name]){
		update_qty(cart, name)
	} else {
		cart[name] = item_obj
		localStorage.setItem("make_easy", JSON.stringify(cart))
		notify("success", "Item Added to Cart");
	}
	total_cart_value();

	//{product_name: {"price": 10, "qty": 1}}
}

function update_qty(cart, name){
	var item = cart[name]
	var new_hash = {}
	new_hash.price = item["price"]
	new_hash.qty = 1 + item["qty"]
	var cart = JSON.parse(localStorage.getItem("make_easy"))
	delete cart[name]

	cart[name] = new_hash
	localStorage.setItem("make_easy", JSON.stringify(cart))
	notify("success", "Quantity updated")

}

function total_cart_value(){
	$("#cart_value").empty();
	var total_qty = 0;
	var total_amount = 0;
	var items = JSON.parse(localStorage.getItem("make_easy"));
	jQuery.each(items, function(i, val){
		total_qty += val["qty"]
		total_amount += parseFloat((val["price"] * val["qty"]).toFixed(2))
	});
	$("#cart_value").append(total_qty + " - $ " + total_amount.toFixed(2));
	$(".total_amount").append("$" + total_amount.toFixed(2));
}

//<tr><td class="lalign">'+i+'</td><td>'+val["qty"]+'</td><td>'+val["price"]+'</td><td>'+(parseFloat(val["price"]) * val["qty"]).toFixed(2)+'</td></tr>

function load_cart_items(){
	jQuery.each(JSON.parse(localStorage.getItem("make_easy")), function(i, val){
		$("#keywords tbody").append('<tr><td class="lalign">'+i+'</td><td>'+val["qty"]+'</td><td>'+val["price"]+'</td><td>'+(parseFloat(val["price"]) * val["qty"]).toFixed(2)+'</td></tr>')
	})
}

$(function(){
	$("#keywords").tablesorter();
})

function notify(type, text){
	$(function(){
		new Noty({
			type: type,
			layout: 'topRight',
			text: text
		}).show()
	})
}


