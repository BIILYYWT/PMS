//Browse Page
import { Component } from '@angular/core';
import { InventoryService, Item } from './inventory.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component ({
  imports: [CommonModule, FormsModule],
	template: `
    <div class="list">
      <h3>Search Item</h3>
      <input placeholder="Item Name" [(ngModel)]="iName" name="iName"/>
      <button (click)="handleSearch()">Search</button>
      <ul id="result">
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
      <div *ngIf="inventoryData.length === 0">No Items</div>
    </div>
			  `
})
export class BrowseComponent {
  inventoryData : Item[] = [];
  iName: string = "";

  constructor (private inventoryService: InventoryService){

  }

  // search inventory data
  handleSearch(): void {
    this.inventoryData = this.inventoryService.handleSearch(this.iName)
  }
}
