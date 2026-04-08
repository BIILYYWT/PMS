//Home Page
import { Component } from '@angular/core';

@Component ({
	template: `
    <div class="list">
      <img style="width: 100%" src="/images/system.jpg"/>
      <h3> Privacy and Security </h3>
      <p>We value your privacy and are committed to protecting your data. Your information is securely stored and will never be shared, sold, or disclosed to third parties without your consent.</p>
      <ul>
        <li><strong>Strict Data Privacy</strong>: We do not share your personal or business data with any external parties.</li>
        <li><strong>No Third-Party Sharing</strong>: We do not sell or disclose your data for advertising or any other purposes.</li>
      </ul>
      <p>Your trust is our priority, and we continuously enhance our security measures to ensure your data remains private and protected.</p>
    </div>
  `
})
export class PrivacyComponent {

}
