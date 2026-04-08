//Browse Page
import { Component } from '@angular/core';
import { InventoryService, Item } from './inventory.service';
import {CommonModule} from '@angular/common';

@Component ({
  imports: [CommonModule],
	template: `
    <div class="list">
      <h3>Popular Items</h3>
      <button (click)="doDisplayPopular()">Display Popular Item List</button>
      <ul>
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
        </li>
      </ul>
    </div>
			  `
})
export class PopularComponent {
  inventoryData : Item[] = [];

  constructor (private inventoryService: InventoryService){
    this.doDisplayPopular();
  }

  doDisplayPopular():void {
    this.inventoryData = this.inventoryService.getInventoryPopularData()
  }
}
