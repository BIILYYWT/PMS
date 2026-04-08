// display inventory data when page initial
window.onload = function() {
	displayInventoryData();
}

// defined the interface for item
interface Item {
	ID : number ,
	name : string,
	category : string,
	quantity : number,
	price : number,
	supplierName : string,
	stockStatus : string,
	isPopular : boolean,
	comment? : string,
};

// Mock some item data
let inventoryData : Item [] = [
	{
		ID: 1,
		name: "Wireless Keyboard",
		category: "Electronics",
		quantity: 50,
		price: 29.99,
		supplierName: "Tech Supplies Ltd.",
		stockStatus: "In Stock",
		isPopular: true,
		comment: "Limited-time discount available"
	},
	{
		ID: 2,
		name: "Office Chair",
		category: "Furniture",
		quantity: 20,
		price: 119.99,
		supplierName: "Comfort Seating Co.",
		stockStatus: "Low Stock",
		isPopular: false
	}
];

// display inventory data
function displayInventoryData(): void {
	// clear inventoryList dom
	document.getElementById("inventoryList").innerHTML="";
	// insert all item dom to inventoryList dom
	inventoryData.forEach(function(item, index) {
	  document.getElementById("inventoryList").innerHTML += `
		<li>
			<div>Item ID: ${item.ID}</div>
			<div>Item Name: ${item.name}</div>
			<div>Category: ${item.category}</div>
			<div>Quantity: ${item.quantity}</div>
			<div>Price: ${item.price}</div>
			<div>Supplier Name: ${item.supplierName}</div>
			<div>StockStatus: ${item.stockStatus}</div>
			<div>Popular Item: ${item.isPopular?"Yes":"No"}</div>
			<div>Comment: ${item.comment||""}</div>
			<div class="action-buttons">
				<button onclick="setEditInputs(${index})">Edit</button>
				<button onclick="handleDelete(${index})">Delete</button>
			</div>
			</li>
		`
	});
}

// search inventory data
function handleSearch(): void {
	document.getElementById("result").innerHTML = "";
	// get search text content
	let iName=(<HTMLInputElement>document.getElementById("iName")).value;
	// search count
	let searchCount = 0;
	inventoryData.forEach(function(item, index)  {
		if (item.name.toLowerCase().lastIndexOf(iName.toLowerCase()) != -1) {
			searchCount+=1;
			document.getElementById("result").innerHTML+=`
		<li class="item">
			<div>Item ID: ${item.ID}</div>
			<div>Item Name: ${item.name}</div>
			<div>Category: ${item.category}</div>
			<div>Quantity: ${item.quantity}</div>
			<div>Price: ${item.price}</div>
			<div>Supplier Name: ${item.supplierName}</div>
			<div>StockStatus: ${item.stockStatus}</div>
			<div>Popular Item: ${item.isPopular?"Yes":"No"}</div>
			<div>Comment: ${item.comment||""}</div>
		</li>
	`
		}
	});
	// display no items if there is no item searched
	if (searchCount === 0) {
		document.getElementById("result").innerHTML = "No Items";
	}
}

// display inventory popular data
function displayInventoryPopularData(): void {
	document.getElementById("Popular").innerHTML = "";
	inventoryData.forEach(function(item, index)  {
		if (item.isPopular) {
			document.getElementById("Popular").innerHTML+=`
		<li class="item">
			<div>Item ID: ${item.ID}</div>
			<div>Item Name: ${item.name}</div>
			<div>Category: ${item.category}</div>
			<div>Quantity: ${item.quantity}</div>
			<div>Price: ${item.price}</div>
			<div>Supplier Name: ${item.supplierName}</div>
			<div>StockStatus: ${item.stockStatus}</div>
			<div>Popular Item: ${item.isPopular?"Yes":"No"}</div>
			<div>Comment: ${item.comment||""}</div>
		</li>
	`
		}
	});
}

// function to add item or edit item
function addOrEdit(addFlag: boolean): void {
	// get form
	const addForm = (<HTMLFormElement>document.getElementById('addForm'))
	// clear message
	document.getElementById("message").innerHTML = "";
	// check id input
	let idString = (<HTMLInputElement> document.getElementById("ID")).value;
	if (isNaN(parseInt(idString))){
		document.getElementById("message").innerHTML = "ID should be a numerical";
		return;
	}
	if (addFlag) {
		for (let i = 0; i < inventoryData.length; i++) {
			if (inventoryData[i].ID==parseInt(idString)) {
				document.getElementById("message").innerHTML = "ID should be unique";
				return
			}
		}
	}
	// check name input
	let name= (<HTMLInputElement> document.getElementById("name")).value;
	if (name==""){
		document.getElementById("message").innerHTML = "Name should be input.";
		return
	}
	// check category input
	let category= (<HTMLInputElement> document.getElementById("category")).value;
	if (category==""){
		document.getElementById("message").innerHTML = "Category must be input.";
		return
	}
	// check quantity input
	let quantity = (<HTMLInputElement> document.getElementById("quantity")).value;
	if (quantity==""){
		document.getElementById("message").innerHTML = "Quantity must be input.";
		return
	}
	// check price input
	let price = (<HTMLInputElement> document.getElementById("price")).value;
	if (price==""){
		document.getElementById("message").innerHTML = "Price must be input.";
		return
	}
	// check supplier name input
	let supplierName= (<HTMLInputElement> document.getElementById("supplierName")).value;
	if (supplierName==""){
		document.getElementById("message").innerHTML = "Supplier name must be input.";
		return
	}
	// check stock status input
	let stockStatus = (<HTMLInputElement> document.getElementById("stockStatus")).value;
	if (stockStatus==""){
		document.getElementById("message").innerHTML = "Stock Status must be input.";
		return;
	}
	let popularItem = (<HTMLInputElement> document.getElementById("popularItem")).checked;
	let comment = (<HTMLInputElement> document.getElementById("comment")).value;

	// is add flag item
	if (addFlag) {
		// insert into inventoryData in first position
		inventoryData.unshift({
			ID:parseInt(idString) ,
			name,
			category,
			quantity: +quantity,
			price: +price,
			supplierName,
			stockStatus,
			isPopular: popularItem,
			comment,
		});
		document.getElementById("message").innerHTML = "Success added!";
		// refresh display and reset form
		displayInventoryData();
		addForm.reset();
	} else {
		// find item and update properties
		let item: Item;
		for (let it of inventoryData){
			if (it.ID==parseInt(idString) ){ item=it} }
		if (item) {
			item.ID=parseInt(idString);
			item.name= name;
			item.category= category;
			item.quantity= +quantity;
			item.price= +price;
			item.supplierName= supplierName;
			item.stockStatus= stockStatus;
			item.isPopular= popularItem;
			item.comment= comment;
			document.getElementById("message").innerHTML="success updated.";
			// remove disabled
			(<HTMLInputElement> document.getElementById("ID")).removeAttribute("disabled");
			// refresh display and reset form
			displayInventoryData();
			addForm.reset();
		} else {
			document.getElementById("message").innerHTML= "Item not found.";
		}
	}
}

// set input content when edit item button clicked
function setEditInputs(index: number): void {
	const item = inventoryData[index];
	(<HTMLInputElement>document.getElementById("ID")).value=String(item.ID);
	(<HTMLInputElement>document.getElementById("name")).value=item.name;
	(<HTMLInputElement>document.getElementById("category")).value=item.category;
	(<HTMLInputElement>document.getElementById("quantity")).value=""+item.quantity;
	(<HTMLInputElement>document.getElementById("price")).value=""+item.price;
	(<HTMLInputElement>document.getElementById("supplierName")).value=item.supplierName;
	(<HTMLInputElement>document.getElementById("stockStatus")).value=item.stockStatus;
	(<HTMLInputElement>document.getElementById("popularItem")).checked=item.isPopular;
	(<HTMLInputElement>document.getElementById("comment")).value=item.comment||"";
	// set id input disabled when edit
	(<HTMLInputElement>document.getElementById("ID")).setAttribute("disabled", "true");
	// scroll into view when edit
	(<HTMLInputElement>document.getElementById("ID")).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
}

// confirm to delete
function handleDelete(index:number):void {
	const item = inventoryData[index];
  if (confirm(`Do you really want to delete the item(${item.name})?`)){
		// delete item in inventoryData
	  inventoryData.splice(index, 1);
		// refresh display
	  displayInventoryData();
	  document.getElementById("message").innerHTML="Success deleted.";
	}
}
