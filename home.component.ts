//Home Page
import { Component } from '@angular/core';

@Component ({
	template: `
    <div class="list">
      <img style="width: 100%" src="/images/system.jpg"/>
      <h3> Purpose </h3>
      <p>This app is designed to streamline inventory management by providing essential CRUD (Create, Read, Update, Delete) functionalities. Users can easily:</p>
      <ul>
        <li><strong>Add</strong> new items with details such as name, category, quantity, price, supplier information, and stock status.</li>
        <li><strong>View</strong> and search for items in the inventory with real-time stock updates.</li>
        <li><strong>Edit</strong> item details, including price adjustments, stock quantity updates, and supplier changes.</li>
        <li><strong>Delete</strong> obsolete or discontinued items to keep the inventory database clean and accurate.</li>
      </ul>
      <p>With these features, businesses can efficiently manage their inventory, reduce errors, and ensure smooth operations.</p>
    </div>
  `
})
export class HomeComponent {

}
