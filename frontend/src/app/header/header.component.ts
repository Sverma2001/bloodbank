import { Component } from '@angular/core';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private donorService: DonorService) {}

// setting form status when button add New Donor is clicked
  showForm() {
    this.donorService.formStatus = true;
  }
}
