import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  donors: any[] = [];             // list of donors
  loadedDonors: any[] = [] ;      // list of all donors available in the database
  filteredDonors: any[] = [];     // filtered list of donors
  currPage: number;  
  totalPages: number;
  searchControl: FormControl = new FormControl('');
  isTableEmpty: boolean = false ;  
  editForm :boolean = false;
  editDonor :any[] = []  ;       // details of the donor being edited
  searching :boolean = false;    //checking if user is searching

  constructor(private donorService: DonorService) {
    this.searchControl.valueChanges.subscribe(() => {
      this.search();            // calling search function when user types
    });
  }

  ngOnInit(): void {
    this.loadDonors();        // loading donor details at the time of initialisation
  }

  async loadDonors() {
    try {
      this.loadedDonors = await this.donorService.getAllDonors();
      this.filteredDonors = this.loadedDonors;

      const response = await this.donorService.getDonors(this.currPage);
      this.donors = response['donors'] ;  // storing the fetched donor details into the array

      this.totalPages = response.totalPages;   //fetching total number of pages
      this.currPage = response.currentPage;   //fetching current page

      this.isTableEmpty = this.donors.length === 0;
    } catch (error) {
      console.log(error);
    }
  }

  ngDoCheck() {
    this.editForm = this.donorService.getEditForm() ;    // checking if edit form is open
  }

  onPageChange(pages: number) {
    //updating the current page during pagination 
    this.currPage = pages ;   
    //calling next page
    this.donorService.getDonors(this.currPage) ;  
    // displaying the page on page change
    this.loadDonors();        
  }

  editDonors(donorDetails: any) {
    //storing donor details to pass on the edit form component
    this.editDonor = donorDetails;      
    this.donorService.editForm = true;
  }

  //Search for donors based on a search term.
  search() {
    const searchTerm = this.searchControl.value ? this.searchControl.value.trim().toLowerCase() : '';

    //adding filtered list of donors to the array filtered donors
    this.filteredDonors = this.loadedDonors.filter((donor: any) => {
      if (!searchTerm) {
        return true;
      }
      return Object.values(donor).some(val => {
        // Check if the value exists
        if (val !== null && val !== undefined) { 
          return val.toString().toLowerCase().includes(searchTerm);
        }
        return false;
      })
    });
  }

  //function to check if user is typing in the search bar 
  isSearching() {
    if (this.searchControl.value === "") {
      this.searching = false;
    }
    else {
      this.searching = true;
    }
  }

  //deleting donor data and displaying updated list
  async removeDonor(serial_no: any) {
    await this.donorService.deleteDonor(serial_no);
    this.loadDonors();
  }
}