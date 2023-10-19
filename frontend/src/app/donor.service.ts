import axios from 'axios';
import { ToastService } from 'angular-toastify';
import { Injectable } from '@angular/core';

@Injectable()
export class DonorService {
  private apiUrl = 'http://localhost:3000';

  constructor(private _toastService: ToastService) { }

  formStatus = false;
  editForm=false;

  donors : any[] = []   // list of donors of current page
  allDonors=[]  // list of all donors available in the database
  
  totalPages: number;
  currentPage: number;
  data={donors:[],totalPages:1,currentPage:1}
  
  addInfoToast(message:any) {
    this._toastService.info(message);
  }
  getFormStatus(){
    return this.formStatus
  }

  getEditForm(){
    return this.editForm
  }

  // Getting donors from the current page
  async getDonors(currPage:number){
    await axios.get(`${this.apiUrl}/Donor?page=${currPage}`)
    .then((response)=>{
      const responseData = response.data;
        this.data = responseData;
    })
    return this.data
  }

  // Getting all donors from the database
  async getAllDonors(){
    await axios.get(`${this.apiUrl}/AllDonors`)
    .then((response)=>{
      const allDonorsData = response.data;
        this.allDonors = allDonorsData;
        console.log("All donors",allDonorsData)
    })
    return this.allDonors
  }

// Deleting a donor from the data array
  async deleteDonor(serial_no: any){
    try {
      const deletedDonor = await axios.delete(`http://localhost:3000/deleteDonor/${serial_no}`);
      this.addInfoToast(`Donor ${deletedDonor.data.name} deleted`);
    } catch (error) {
      console.error(error);
    }
    return this.data
  }

// Adding a donor to the data array
  async addDonor(data:any){
    try{
      await this.data.donors.push(data)
      this.getDonors(this.currentPage)
    }
    catch(error){
      console.error(error)
    }
  }

  //Updates a donor in the data array.
  updateDonor(updatedDonor:any){
    const index= this.data.donors.findIndex((donor:any)=> donor.serial_no === donor.serial_no)
    this.data.donors.splice(index, 1, updatedDonor)
  }
}