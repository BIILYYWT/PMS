//Add Page
import { Component } from '@angular/core';
import { InventoryService, Item } from './inventory.service';
import { ActivatedRoute } from '@angular/router'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component ({
  imports: [FormsModule, CommonModule],
	template: `
    <div class="ft">
      <form id="addForm">
        <div>Item ID : <input id="ID" type="text" [(ngModel)]="ID" name="ID"/><br></div>
        <div>Item Name : <input id="name" type="text" [(ngModel)]="name" name="name"/><br></div>
        <div>Category : <select id="category" [(ngModel)]="category" name="category">
          <option>Electronics</option>
          <option>Furniture</option>
          <option>Clothing</option>
          <option>Tools</option>
          <option>Miscellaneous</option>
        </select></div>
        <div>Quantity : <input id="quantity" type="number" min="0" step="1" [(ngModel)]="quantity" name="quantity"/><br></div>
        <div>Price : <input id="price" type="number" min="0" step="0.01" [(ngModel)]="price" name="price"/><br></div>
        <div>Supplier Name : <input id="supplierName" type="text" [(ngModel)]="supplierName" name="supplierName"/><br></div>
        <div>Stock Status : <select id="stockStatus" [(ngModel)]="stockStatus" name="stockStatus">
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select></div>
        <div>Popular Item : <input id="popularItem" type="checkbox" [(ngModel)]="popularItem" name="popularItem"/></div>
        <div>Comment : <input id="comment" type="text" [(ngModel)]="comment" name="comment"/></div>
        <button type="button" (click)="addOrEdit(true)" style="margin-right: 4px">Add</button>
        <button type="button" (click)="addOrEdit(false)">Update</button>
        <br>
        <p id="message">
          {{message}}
        <p>
      </form>
      <img class="inventory" src="/images/system.jpg">
    </div>
  `
})
export class AddComponent {
  message:string="";
  ID:string=""
  name:string=""
  category:string=""
  quantity:string=""
  price:string=""
  supplierName:string=""
  stockStatus:string=""
  popularItem:boolean=false
  comment:string=""
  disabled=false

  // function to add item or edit item
  addOrEdit(addFlag: boolean): void {
    // clear message
    this.message = "";
    // check id input
    let idString = this.ID;
    if (isNaN(parseInt(idString))){
      this.message = "ID should be a numerical";
      return;
    }
    if (addFlag) {
      for (let i = 0; i < this.inventoryService.inventoryData.length; i++) {
        if (this.inventoryService.inventoryData[i].ID==parseInt(idString)) {
          this.message = "ID should be unique";
          return
        }
      }
    }
    // check name input
    if (this.name==""){
      this.message= "Name should be input.";
      return
    }
    // check category input
    if (this.category==""){
      this.message = "Category must be input.";
      return
    }
    // check quantity input
    if (this.quantity==""){
      this.message = "Quantity must be input.";
      return
    }
    // check price input
    if (this.price==""){
      this.message= "Price must be input.";
      return
    }
    // check supplier name input
    if (this.supplierName==""){
      this.message= "Supplier name must be input.";
      return
    }
    // check stock status input
    if (this.stockStatus==""){
      this.message = "Stock status must be input.";
      return
    }
    // is add flag item
    if (addFlag) {
      // insert into inventoryData in first position
      this.inventoryService.addOrEdit({
        ID:parseInt(idString) ,
        name: this.name,
        category: this.category,
        quantity: +this.quantity,
        price: +this.price,
        supplierName: this.supplierName,
        stockStatus: this.stockStatus,
        isPopular: this.popularItem,
        comment: this.comment,
      }, true)
      this.message = "Success added!";
    } else {
      let item: Item|null= null;
      for (let m of this.inventoryService.inventoryData){ if (m.ID==parseInt(idString) ){ item=m} }
      if (item) {
        item.ID=parseInt(idString);
        item.name= this.name;
        item.category= this.category;
        item.quantity= +this.quantity;
        item.price= +this.price;
        item.supplierName= this.supplierName;
        item.stockStatus= this.stockStatus;
        item.isPopular= this.popularItem;
        item.comment= this.comment;
        this.message="success updated.";
        this.disabled=false;
      } else {
        this.message= "Item not found.";
      }
    }
  }

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
  ) {
    // edit item and set input content by item
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      for (let item of this.inventoryService.inventoryData){ if (item.ID==parseInt(id) ){
        this.ID=String(item.ID);
        this.name=item.name
        this.category=item.category
        this.quantity=""+item.quantity
        this.price=""+item.price
        this.supplierName=item.supplierName
        this.stockStatus=item.stockStatus
        this.popularItem=item.isPopular
        this.comment=item.comment||""
        this.disabled=true
      } }
    }
  }
}
