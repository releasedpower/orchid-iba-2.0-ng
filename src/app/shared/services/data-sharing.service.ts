import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private formData:any;
  constructor() { }

  setFormData(data:any){
    this.formData = data;
  }
  getFormData(){
    return this.formData;
  }
}
