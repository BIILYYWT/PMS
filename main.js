// display inventory data when page initial
window.onload = function () {
    displayInventoryData();
};
;
// Mock some item data
var inventoryData = [
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
function displayInventoryData() {
    // clear inventoryList dom
    document.getElementById("inventoryList").innerHTML = "";
    // insert all item dom to inventoryList dom
    inventoryData.forEach(function (item, index) {
        document.getElementById("inventoryList").innerHTML += "\n\t\t<li>\n\t\t\t<div>Item ID: ".concat(item.ID, "</div>\n\t\t\t<div>Item Name: ").concat(item.name, "</div>\n\t\t\t<div>Category: ").concat(item.category, "</div>\n\t\t\t<div>Quantity: ").concat(item.quantity, "</div>\n\t\t\t<div>Price: ").concat(item.price, "</div>\n\t\t\t<div>Supplier Name: ").concat(item.supplierName, "</div>\n\t\t\t<div>StockStatus: ").concat(item.stockStatus, "</div>\n\t\t\t<div>Popular Item: ").concat(item.isPopular ? "Yes" : "No", "</div>\n\t\t\t<div>Comment: ").concat(item.comment || "", "</div>\n\t\t\t<div class=\"action-buttons\">\n\t\t\t\t<button onclick=\"setEditInputs(").concat(index, ")\">Edit</button>\n\t\t\t\t<button onclick=\"handleDelete(").concat(index, ")\">Delete</button>\n\t\t\t</div>\n\t\t\t</li>\n\t\t");
    });
}
// search inventory data
function handleSearch() {
    document.getElementById("result").innerHTML = "";
    // get search text content
    var iName = document.getElementById("iName").value;
    // search count
    var searchCount = 0;
    inventoryData.forEach(function (item, index) {
        if (item.name.toLowerCase().lastIndexOf(iName.toLowerCase()) != -1) {
            searchCount += 1;
            document.getElementById("result").innerHTML += "\n\t\t<li class=\"item\">\n\t\t\t<div>Item ID: ".concat(item.ID, "</div>\n\t\t\t<div>Item Name: ").concat(item.name, "</div>\n\t\t\t<div>Category: ").concat(item.category, "</div>\n\t\t\t<div>Quantity: ").concat(item.quantity, "</div>\n\t\t\t<div>Price: ").concat(item.price, "</div>\n\t\t\t<div>Supplier Name: ").concat(item.supplierName, "</div>\n\t\t\t<div>StockStatus: ").concat(item.stockStatus, "</div>\n\t\t\t<div>Popular Item: ").concat(item.isPopular ? "Yes" : "No", "</div>\n\t\t\t<div>Comment: ").concat(item.comment || "", "</div>\n\t\t</li>\n\t");
        }
    });
    // display no items if there is no item searched
    if (searchCount === 0) {
        document.getElementById("result").innerHTML = "No Items";
    }
}
// display inventory popular data
function displayInventoryPopularData() {
    document.getElementById("Popular").innerHTML = "";
    inventoryData.forEach(function (item, index) {
        if (item.isPopular) {
            document.getElementById("Popular").innerHTML += "\n\t\t<li class=\"item\">\n\t\t\t<div>Item ID: ".concat(item.ID, "</div>\n\t\t\t<div>Item Name: ").concat(item.name, "</div>\n\t\t\t<div>Category: ").concat(item.category, "</div>\n\t\t\t<div>Quantity: ").concat(item.quantity, "</div>\n\t\t\t<div>Price: ").concat(item.price, "</div>\n\t\t\t<div>Supplier Name: ").concat(item.supplierName, "</div>\n\t\t\t<div>StockStatus: ").concat(item.stockStatus, "</div>\n\t\t\t<div>Popular Item: ").concat(item.isPopular ? "Yes" : "No", "</div>\n\t\t\t<div>Comment: ").concat(item.comment || "", "</div>\n\t\t</li>\n\t");
        }
    });
}
// function to add item or edit item
function addOrEdit(addFlag) {
    // get form
    var addForm = document.getElementById('addForm');
    // clear message
    document.getElementById("message").innerHTML = "";
    // check id input
    var idString = document.getElementById("ID").value;
    if (isNaN(parseInt(idString))) {
        document.getElementById("message").innerHTML = "ID should be a numerical";
        return;
    }
    if (addFlag) {
        for (var i = 0; i < inventoryData.length; i++) {
            if (inventoryData[i].ID == parseInt(idString)) {
                document.getElementById("message").innerHTML = "ID should be unique";
                return;
            }
        }
    }
    // check name input
    var name = document.getElementById("name").value;
    if (name == "") {
        document.getElementById("message").innerHTML = "Name should be input.";
        return;
    }
    // check category input
    var category = document.getElementById("category").value;
    if (category == "") {
        document.getElementById("message").innerHTML = "Category must be input.";
        return;
    }
    // check quantity input
    var quantity = document.getElementById("quantity").value;
    if (quantity == "") {
        document.getElementById("message").innerHTML = "Quantity must be input.";
        return;
    }
    // check price input
    var price = document.getElementById("price").value;
    if (price == "") {
        document.getElementById("message").innerHTML = "Price must be input.";
        return;
    }
    // check supplier name input
    var supplierName = document.getElementById("supplierName").value;
    if (supplierName == "") {
        document.getElementById("message").innerHTML = "Supplier name must be input.";
        return;
    }
    // check stock status input
    var stockStatus = document.getElementById("stockStatus").value;
    if (stockStatus == "") {
        document.getElementById("message").innerHTML = "Stock Status must be input.";
        return;
    }
    var popularItem = document.getElementById("popularItem").checked;
    var comment = document.getElementById("comment").value;
    // is add flag item
    if (addFlag) {
        // insert into inventoryData in first position
        inventoryData.unshift({
            ID: parseInt(idString),
            name: name,
            category: category,
            quantity: +quantity,
            price: +price,
            supplierName: supplierName,
            stockStatus: stockStatus,
            isPopular: popularItem,
            comment: comment,
        });
        document.getElementById("message").innerHTML = "Success added!";
        // refresh display and reset form
        displayInventoryData();
        addForm.reset();
    }
    else {
        // find item and update properties
        var item = void 0;
        for (var _i = 0, inventoryData_1 = inventoryData; _i < inventoryData_1.length; _i++) {
            var it = inventoryData_1[_i];
            if (it.ID == parseInt(idString)) {
                item = it;
            }
        }
        if (item) {
            item.ID = parseInt(idString);
            item.name = name;
            item.category = category;
            item.quantity = +quantity;
            item.price = +price;
            item.supplierName = supplierName;
            item.stockStatus = stockStatus;
            item.isPopular = popularItem;
            item.comment = comment;
            document.getElementById("message").innerHTML = "success updated.";
            // remove disabled
            document.getElementById("ID").removeAttribute("disabled");
            // refresh display and reset form
            displayInventoryData();
            addForm.reset();
        }
        else {
            document.getElementById("message").innerHTML = "Item not found.";
        }
    }
}
// set input content when edit item button clicked
function setEditInputs(index) {
    var item = inventoryData[index];
    document.getElementById("ID").value = String(item.ID);
    document.getElementById("name").value = item.name;
    document.getElementById("category").value = item.category;
    document.getElementById("quantity").value = "" + item.quantity;
    document.getElementById("price").value = "" + item.price;
    document.getElementById("supplierName").value = item.supplierName;
    document.getElementById("stockStatus").value = item.stockStatus;
    document.getElementById("popularItem").checked = item.isPopular;
    document.getElementById("comment").value = item.comment || "";
    // set id input disabled when edit
    document.getElementById("ID").setAttribute("disabled", "true");
    // scroll into view when edit
    document.getElementById("ID").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}
// confirm to delete
function handleDelete(index) {
    var item = inventoryData[index];
    if (confirm("Do you really want to delete the item(".concat(item.name, ")?"))) {
        // delete item in inventoryData
        inventoryData.splice(index, 1);
        // refresh display
        displayInventoryData();
        document.getElementById("message").innerHTML = "Success deleted.";
    }
}
