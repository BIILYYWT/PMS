//List Page
import { Component } from '@angular/core';
import { InventoryService, Item } from './inventory.service';
import { Router } from '@angular/router'
import {CommonModule} from '@angular/common';

@Component ({
  imports: [CommonModule],
	template: `
    <div class="list">
      <h3>Item List</h3>
      <ul id="paList">
        <li *ngFor="let item of inventoryData;let index=index;">
            <div>Item ID: {{item.ID}}</div>
            <div>Item Name: {{item.name}}</div>
            <div>Category: {{item.category}}</div>
            <div>Quantity: {{item.quantity}}</div>
            <div>Price: {{item.price}}</div>
            <div>Supplier Name: {{item.supplierName}}</div>
            <div>StockStatus: {{item.stockStatus}}</div>
            <div>Popular Item: {{item.isPopular?"Yes":"No"}}</div>
            <div>Comment: {{item.comment||""}}</div>
          <button (click)="setEditInputs(index)" style="margin-right: 4px">Edit</button>
          <button (click)="doDelete(index)">Delete</button>
        </li>
      </ul>
      <p id="message">
        {{message}}
      <p>
    </div>
			  `
})
export class ListComponent {
	inventoryData : Item[];
  message:string="";
	constructor (
    private inventoryService: InventoryService,
    private router: Router
  ){
		this.inventoryData = inventoryService.getInventoryData();
	}

  // confirm to delete
  doDelete(index:number):void {
    const item = this.inventoryData[index];
    if (confirm(`Do you really want to delete the item(${item.name})?`)){
      this.inventoryService.handleDelete(index);
      this.inventoryData = this.inventoryService.getInventoryData();
      this.message="Success deleted.";
    }
  }

  // set input content when edit item button clicked
  setEditInputs(index:number):void {
    this.router.navigateByUrl(`/edit/${this.inventoryData[index].ID}`);
  }
}
