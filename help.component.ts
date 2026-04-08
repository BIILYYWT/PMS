//Home Page
import { Component } from '@angular/core';

@Component ({
	template: `
    <div class="list">
      <img style="width: 100%" src="/images/system.jpg"/>
      <h3> How to Use the App </h3>
      <ul>
        <li><strong>Adding Items</strong>: Go to the "Add Page" in menu to enter item details such as name, category, quantity, and price.</li>
        <li><strong>Viewing Items</strong>: Go to the "Items" or "Popular Items" can view item list.</li>
        <li><strong>Editing Items</strong>: Select an item and click "Edit" to update details like quantity, price, or supplier information.</li>
        <li><strong>Deleting Items</strong>: If an item is no longer needed, click "Delete" to remove it from the inventory.</li>
      </ul>
      <h3> Contact Us </h3>
      <p>If you have any questions or need assistance, feel free to reach out:</p>
      <p>Email: w.yin.12&#64;student.scu.edu.au</p>
    </div>
  `
})
export class HelpComponent {

}
