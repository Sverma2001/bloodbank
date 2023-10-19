import { Component, Input, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DonorService } from '../../donor.service';
import axios from 'axios';

@Component({
  selector: 'app-edit-donor',
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.css']
})
export class EditDonorComponent {
  UpdationForm: FormGroup;
  showForms: boolean = false;
  editForm :boolean = false;
  
  // taking donor details from parent component
  @Input('editDonorDetail') donor: any;   

  @Output() UpdateDonor = new EventEmitter<any>();   
  constructor(private donorService: DonorService, private fb: FormBuilder) {};

  //adding form validation
  ngOnInit() {
    this.UpdationForm = this.fb.group({
      name: new FormControl({ value: `${this.donor.name}`, disabled: true }),
      age: new FormControl({ value: `${this.donor.age}`, disabled: true }),
      blood_group: new FormControl({ value: `${this.donor.blood_group}`, disabled: true }),
      address: new FormControl({ value: `${this.donor.address}`, disabled: false}),
      contact: new FormControl({ value: `${this.donor.contact}`, disabled: false}, [Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  ngDoCheck() {
    this.editForm = this.donorService.editForm;
    this.showForms = this.donorService.getFormStatus();
  }

  async submitForm() {
    if (this.UpdationForm.valid) {
      const UpdatedDonorData = { ...this.donor, ...this.UpdationForm.value }; 
      console.log("updateddonor",UpdatedDonorData);  
      try {
        const response = await axios.patch('http://localhost:3000/updateDonor', UpdatedDonorData);
  
        if (response.status === 201) {
          this.donorService.addInfoToast(`${UpdatedDonorData.name} updated their data`);
          this.UpdateDonor.emit();
        } else {
          console.error('Update request failed:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred during the update request:', error);
      }
    }
    // setting edit form to false after submitting
    this.donorService.editForm = false;   
  }

  hideForm() {
    //hiding edit form when closed button is clicked
    this.donorService.editForm = false;    
  }
}