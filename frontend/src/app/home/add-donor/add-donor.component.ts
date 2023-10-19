import { Component,EventEmitter, Output } from '@angular/core';
import { DonorService } from '../../donor.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent {
  showForms: boolean = false  // initially form is hidden
  RegistrationForm: FormGroup;

  @Output () AddDonor = new EventEmitter<any>();  

// adding form validation 
  constructor(private donorService: DonorService, private fb: FormBuilder) {
    this.RegistrationForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(150), Validators.pattern('^[0-9]+$'), Validators.minLength(2), Validators.maxLength(3)]],
      blood_group: ['', [Validators.required]],
      address: [''],
      contact: ['', [Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  apiUrl = 'http://localhost:3000'

  ngDoCheck() {
    this.showForms = this.donorService.getFormStatus()
  }

  async addDonor() {
    if (this.RegistrationForm.valid) {
      let id = 0
      try {
        await axios.get(`${this.apiUrl}/getDonorId`)   // getting the id of the last donor
          .then((response) => {
            id = response.data
          })

        const donorData = { serial_no: id, ...this.RegistrationForm.value }

          try {
            // adding donor to the database
            await axios.post(`${this.apiUrl}/addDonor`, donorData);
            this.AddDonor.emit();
            this.donorService.addInfoToast(`${donorData.name} added successfully`);
          } catch (error) {
            console.error(error);
          }
        }
      catch (error) {
        console.log(error)
      }
    }
    this.RegistrationForm.reset()   //clearing form after submit
    this.donorService.formStatus = false    //setting form status to false after submitting it
  }

  hideForm() {
    this.donorService.formStatus = false   //hiding form when closed button is clicked
  } 
}