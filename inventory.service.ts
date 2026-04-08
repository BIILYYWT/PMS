// Student database Injectable Component
import { Injectable } from '@angular/core';

// defined the interface for item
export interface Item {
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

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  // Mock some item data
  inventoryData : Item [] = [
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

  // get inventory data
  getInventoryData(): Item[] {
		return this.inventoryData;
	}

  // function to add item or edit item
  addOrEdit(item: Item, addFlag: boolean): void {
    // is add flag item
    if (addFlag) {
      // insert into inventoryData in first position
      this.inventoryData.unshift(item);
    } else {
      // find item and update properties
      const matchedItem = this.inventoryData.find(it => it.ID === item.ID);
      if (matchedItem) {
        matchedItem.name = item.name;
        matchedItem.category = item.category;
        matchedItem.quantity = item.quantity;
        matchedItem.price = item.price;
        matchedItem.supplierName = item.supplierName;
        matchedItem.stockStatus = item.stockStatus;
        matchedItem.isPopular = item.isPopular;
        matchedItem.comment = item.comment;
      }
    }
  }

  // confirm to delete
  handleDelete(index:number): void {
    // delete item in inventoryData
    this.inventoryData.splice(index, 1);
  }

  // get inventory popular data
  getInventoryPopularData(): Item[] {
    return this.inventoryData.filter(it => it.isPopular);
  }

  // search inventory data by name
  handleSearch(iName: string): Item[] {
    return this.inventoryData.filter(item => item.name.toLowerCase().lastIndexOf(iName.toLowerCase()) != -1);
  }

  // get inventory data single item
  getInventoryDataSingleItem(ID: number): Item|undefined {
    return this.inventoryData.find(it => it.ID === ID);
  }
}
